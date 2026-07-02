# Использование шаблона

Как поднять проект на этом шаблоне на **своём** GitLab и **своих** VM — с нуля,
когда ещё нет ни группы, ни настроенных серверов. И как потом добавлять новые
проекты минимальными правками.

## Как всё устроено (модель)

- **by-image-tag.** CI собирает Docker-образ один раз, тегает его по commit SHA,
  пушит в GitLab Container Registry. Деплой = *скачать этот тег* на сервере и
  поднять `docker compose`. На сервере ничего не собирается.
- **Образ environment-agnostic.** Один и тот же образ годится для любого контура;
  конфиг контура (`NUXT_PUBLIC_*`, порт) подставляется в рантайме. Build-time
  константы (SSR, тайтлы) лежат в `environments/build.env`.
- **Контуры:** `dev`, `test`, `stage`, `prod`, `vm1`, `vm2`. Каждый — свой
  `Docker/docker-compose.<contour>.yml` + `environments/<contour>.env`.
- **Деплой по SSH** на VM под отдельным пользователем `deploy`, там
  `docker compose up`. Контейнер всегда слушает `3000`, наружу отдаётся свой
  host-порт (можно селить несколько контуров на одну VM).
- **Пайплайн:** push `dev`/`test`/`stage` → собрать+задеплоить в контур; push
  `main` → собрать + авто-деплой на `stage` + кнопка `deploy:prod` + кнопки
  `release:patch/minor/major` (бамп версии, git-тег `vX.Y.Z`, ретег образа).

---

# Часть 1. Настройка с нуля

## 1.0 Что нужно иметь

- **GitLab** (self-hosted CE подходит) с включённым **Container Registry**.
- **GitLab Runner**, зарегистрированный с тегом `docker`, у которого примонтирован
  docker-сокет (нужен, чтобы `build`-джоб собирал образ). Раннер должен уметь
  достучаться по SSH до VM, куда деплоим (проще всего — раннер стоит на той же
  VM).
- **VM с Docker**, где будут жить контейнеры.

## 1.1 Подготовить VM (один раз на каждую машину)

Зайти на VM под root и выполнить:

```bash
# отдельный пользователь для деплоя (без пароля, без sudo)
adduser --disabled-password --gecos "" deploy

# право запускать docker (даёт полный доступ к докеру на хосте — это ожидаемо)
usermod -aG docker deploy

# плагин compose v2 и rsync (принимающая сторона)
apt-get update && apt-get install -y docker-compose-plugin rsync

# общая сеть для reverse-proxy
docker network create nginx-proxy

# каталог для приёма ssh-ключа
mkdir -p /home/deploy/.ssh && chmod 700 /home/deploy/.ssh
touch /home/deploy/.ssh/authorized_keys && chmod 600 /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
```

Проверить: `su - deploy -c "docker compose version && docker ps >/dev/null && echo OK"`
должно вывести версию и `OK`.

## 1.2 Ключ доступа CI → VM

На своей машине (не в репозитории):

```bash
ssh-keygen -t ed25519 -C "ci deploy" -f ./ci_deploy_key
# passphrase оставить пустым (просто Enter дважды)
```

- **Публичную часть** `ci_deploy_key.pub` дописать в `~/.ssh/authorized_keys`
  пользователя `deploy` на VM.
- **Приватную часть** `ci_deploy_key` — в CI/CD-переменную `SSH_PRIVATE_KEY`
  (см. 1.4).

Проверка (из сети, где виден IP VM):
`ssh -i ./ci_deploy_key deploy@<IP-VM> "docker ps"` — без запроса пароля.

## 1.3 Токен CI → репозиторий (для push версии/тега)

`release`-джоб пушит бамп версии и git-тег обратно. Без группы это **Project
Access Token**:

*Проект → Settings → Access tokens → Add new token*
- Role: **Maintainer** (нужно, чтобы пройти правило защищённой ветки `main`)
- Scope: **`write_repository`**
- Скопировать значение (показывается один раз) → в переменную `CI_RELEASE_TOKEN`.

## 1.4 CI/CD-переменные (проект → Settings → CI/CD → Variables)

| Key | Value | Protected | Masked |
|---|---|---|---|
| `SSH_USER` | `deploy` | ❌ | ❌ |
| `SSH_HOST` | IP/домен VM | ❌ | ❌ |
| `SSH_PRIVATE_KEY` | содержимое `ci_deploy_key` (весь файл) | ❌ | ❌ |
| `CI_RELEASE_TOKEN` | токен из 1.3 | ✅ | ✅ |

> **Protected выключен** у `SSH_*`, потому что деплой идёт и с незащищённых
> `dev`/`test`/`stage` — protected-переменные им не выдаются. У `CI_RELEASE_TOKEN`
> Protected включён: релиз только на защищённой `main`.
> **Masked** для многострочных SSH-ключей GitLab обычно не разрешает — это норма.

`SSH_HOST` можно задать **per-environment** (scope `dev`/`stage`/`production`/…),
если контуры на разных машинах. Если всё на одной VM — одна переменная со
scope `All`.

## 1.5 Правки кода под конкретный проект

Имена контейнеров и путь деплоя выводятся из `$CI_PROJECT_NAME` автоматически —
их править не нужно. Меняешь только:

1. **Порты** — `Docker/docker-compose.*.yml`, значение `${HOST_PORT:-XXXX}`.
   Если на VM уже что-то занимает эти порты — выбери свободные.
2. **Домены** — `NUXT_PUBLIC_BASE_URL` в `environments/{dev,test,stage,prod,vm1,vm2}.env`.
3. **Идентичность приложения** (косметика) — `package.json` (`name`),
   `configs/pwa.config.ts` (`id`/`name`/`short_name`), `environments/build.env`
   (`NUXT_BASE_TITLE`, `NUXT_PUBLIC_APP_DESCRIPTION`, `NUXT_PUBLIC_APP_AUTHOR`).

## 1.6 Запуск и проксирование

- Запушить `dev` (или `Run pipeline` → ветка `dev`, `CONTOUR=dev`). Посмотреть
  джобы `build` → `deploy:dev`.
- Направить домены на контейнеры в своём reverse-proxy: домен →
  `<IP-VM>:<HOST_PORT>` для каждого контура.

---

# Часть 2. Когда проектов больше одного — вынести общее в группу

Чтобы не заводить одно и то же в каждом репозитории, перенеси общие вещи на
уровень **группы** (Group → Settings). Тогда новые проекты в группе наследуют их
автоматически:

- **Group Access Token** (Group → Settings → Access tokens, Maintainer +
  `write_repository`) → group-переменная `CI_RELEASE_TOKEN`.
- Group-переменные `SSH_USER`, `SSH_HOST`, `SSH_PRIVATE_KEY`.

> **`DEPLOY_ROOT` на уровень группы класть НЕЛЬЗЯ.** Он обязан быть разным у
> каждого проекта (иначе `rsync --delete` затрёт чужую папку). Он и так
> вычисляется как `/home/projects/$CI_PROJECT_NAME` — уникален автоматически.

Инфраструктура из Части 1 (пользователь `deploy`, docker/compose/rsync, сеть,
публичный ключ на VM) — **общая**, повторно её настраивать для новых проектов не
нужно.

---

# Часть 3. Добавить второй / N-й проект

После того как Часть 1 (и по возможности Часть 2) выполнены, новый проект из
шаблона требует минимума — потому что имена контейнеров и `DEPLOY_ROOT` берутся
из `$CI_PROJECT_NAME`:

1. Создать репозиторий **в той же группе**, залить код шаблона.
2. **Порты** — `Docker/docker-compose.*.yml` (`${HOST_PORT:-XXXX}`): выбрать
   диапазон, свободный на VM (иначе конфликт при старте контейнера).
3. **Домены** — `NUXT_PUBLIC_BASE_URL` в `environments/*.env` + маршруты в
   reverse-proxy.
4. **Косметика** — `package.json`, `configs/pwa.config.ts`, `environments/build.env`.
5. В GitLab — **ничего** (если переменные на уровне группы). Push → пайплайн.

Всё. Ключи не перевыпускаются, пользователь `deploy` не пересоздаётся, токен —
один на группу.

---

# Приложение

## Автоматически vs вручную

| Автоматически | Вручную (один раз) |
|---|---|
| Registry-путь (`$CI_REGISTRY_IMAGE`) | Часть 1: VM, ключ, токен, переменные |
| Имена контейнеров (`$CI_PROJECT_NAME`) | Порты и домены нового проекта |
| `DEPLOY_ROOT` (`/home/projects/$CI_PROJECT_NAME`) | Маршруты в reverse-proxy |
| Логин в registry на VM (job-токеном) | — |

## Как идёт деплой (что реально выполняется)

`deploy:*` по SSH под `deploy`:
1. `rsync` папок `Docker/` и `environments/` в `$DEPLOY_ROOT` (репозиторий на VM
   не клонируется — копируются только эти две папки).
2. `docker login` в registry встроенным job-токеном.
3. `docker compose -p <project>-<contour> -f Docker/docker-compose.<contour>.yml
   pull && up -d`. Отдельный project name на контур — поэтому деплой одного
   контура не трогает контейнеры другого.

## Как идёт релиз (только на `main`, после ▶ `deploy:prod`)

Кнопка `release:patch|minor|major`:
1. `npm version <level>` — бампит `package.json`, коммит + git-тег `vX.Y.Z`.
2. Push коммита и тега обратно по HTTPS с `CI_RELEASE_TOKEN` (с `[skip ci]`).
3. Ретег уже собранного образа (тот же digest) в `:vX.Y.Z` и `:latest`.
