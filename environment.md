# Deployment

CI/CD is **by-image-tag**: the app is built once into a Docker image (tagged by
commit SHA), pushed to the **GitLab Container Registry**, and deployed over SSH by
pulling that tag on the target VM. Nothing is built on the server, and the exact
tag validated on `stage` is the one promoted to `prod`.

```
build  ->  push $CI_REGISTRY_IMAGE:<slug>-<sha>  ->  ssh VM: docker compose up
```

## Layout on a VM

Deploy jobs `rsync` two folders into a single, stable path (`DEPLOY_ROOT`,
default `/home/projects/nuxt-core-template`) and run compose from there:

```
$DEPLOY_ROOT/
├── Docker/
│   ├── docker-compose.dev.yml
│   ├── docker-compose.test.yml
│   ├── docker-compose.stage.yml
│   ├── docker-compose.prod.yml
│   ├── docker-compose.vm1.yml
│   └── docker-compose.vm2.yml
└── environments/
    └── <contour>.env
```

So an operator can manage a contour by hand:

```bash
cd $DEPLOY_ROOT
IMAGE=<tag> docker compose -f Docker/docker-compose.prod.yml ps
```

The container always listens on `3000`; the host port is set per file (and
overridable via `HOST_PORT`), so several contours can share one VM.

| Contour | compose file                     | env file                | host port |
|---------|----------------------------------|-------------------------|-----------|
| `dev`   | `Docker/docker-compose.dev.yml`  | `environments/dev.env`  | `3100`    |
| `test`  | `Docker/docker-compose.test.yml` | `environments/test.env` | `3103`    |
| `stage` | `Docker/docker-compose.stage.yml`| `environments/stage.env`| `3101`    |
| `prod`  | `Docker/docker-compose.prod.yml` | `environments/prod.env` | `3102`    |
| `vm1`   | `Docker/docker-compose.vm1.yml`  | `environments/vm1.env`  | `3110`    |
| `vm2`   | `Docker/docker-compose.vm2.yml`  | `environments/vm2.env`  | `3120`    |

`local` (`Docker/docker-compose.local.yml`) builds the image from source for local
runs — not used by CI.

**`environments/build.env`** is the only env file used while building the image
(`cp environments/build.env .env && npm run build`): build-time constants that
are identical for all contours (`NUXT_SSR`, `app.head` values). Contour files
contain runtime values only (`NUXT_PUBLIC_*`, ports).

---

## Pipeline

Stages: `build → deploy → release`.

| Trigger                       | Result                                                    |
|-------------------------------|-----------------------------------------------------------|
| push `dev` / `test` / `stage` | build + deploy to that contour                            |
| push / merge `main`           | build + **auto deploy to stage** (pipeline goes green); an **optional `deploy:prod`** button appears |
| **Run pipeline** (manual)     | pick a **branch** + the **`CONTOUR`** dropdown → build + deploy there |

`deploy:prod` is a manual, non-blocking button (`allow_failure: true`): the
pipeline is green after stage; pressing ▶ promotes the *same* image tag to prod.
After a successful prod deploy three manual buttons appear —
**`release:patch` / `release:minor` / `release:major`** — press the one matching
the semver level of the release (see *Versioning*).

---

## One-time setup

### 1. Container registry

Nothing to configure — jobs authenticate with the built-in `$CI_REGISTRY_USER` /
`$CI_REGISTRY_PASSWORD`. Enable it under *Settings → General → Visibility →
Container registry*.

### 2. Each VM

- Docker + the Compose plugin installed; the SSH user is in the `docker` group.
- `docker network create nginx-proxy`
- Authorize the deploy key (next step) in `~/.ssh/authorized_keys`.

### 3. SSH deploy key (CI → VMs)

```bash
ssh-keygen -t ed25519 -C "nuxt-core-template ci deploy" -f ./ci_deploy_key -N ""
```

- **Public** `ci_deploy_key.pub` → append to `~/.ssh/authorized_keys` of the
  deploy user on **every** contour VM.
- **Private** `ci_deploy_key` → *Settings → CI/CD → Variables* → `SSH_PRIVATE_KEY`
  (type **Variable**; **do NOT tick Protected** — deploys also run from the
  unprotected `dev`/`test`/`stage` branches; Masked usually rejects multiline
  keys — leave it off).

### 4. Release token (CI → repo, group-wide)

The `release:*` jobs push the version bump + tag back over HTTPS using a
**Group Access Token** — set up once per group, works for every project in it
(current and future), no per-repo deploy key.

*Group → Settings → Access tokens → Add new token*
- Name: `ci-release-bot`
- Role: **Maintainer** (required to push to the protected `main`; `write_repository`
  scope alone isn't enough — the branch rule checks the role)
- Scope: **`write_repository`** only (registry pushes use the built-in job token)

Then *Group → Settings → CI/CD → Variables* → add `CI_RELEASE_TOKEN` = the token
value (type **Variable**, **Masked ✓**, **Protected ✓** — releases run only on
the protected `main`).

Delete the local key files afterwards.

### 5. CI/CD variables

| Variable              | Scope                | Notes                                        |
|-----------------------|----------------------|----------------------------------------------|
| `SSH_USER`            | global               | deploy user on the VMs                        |
| `SSH_PRIVATE_KEY`     | global, unprotected  | CI → VM deploy key                            |
| `SSH_HOST`            | **per environment**  | host/IP of each contour (dev/test/stage/production/vm1/vm2). Same value for several = co-located VM; single VM for everything = one variable with scope `All` |
| `CI_RELEASE_TOKEN`    | **group**, masked, protected | Group Access Token (Maintainer + `write_repository`) for the version push-back |
| `DEPLOY_ROOT`         | optional             | override the on-VM path (default `/home/projects/nuxt-core-template`) |
| `HOST_PORT`           | optional             | override a contour's host port                |

> `SSH_HOST` is set as an **environment-scoped** variable so each `deploy:*` job
> (which declares `environment: name: …`) automatically gets the right host.

---

## Versioning (vX.Y.Z + auto-bump)

The **`release:*`** jobs exist **only on `main` and only after a successful
`deploy:prod`** — so pushing to `dev`/`test`/`stage` never changes the version.
Even if a release contains many changes, semver is bumped **once, by the highest
level** (e.g. several breaking changes still mean one `major`).

Pressing a release button:

1. `npm version <patch|minor|major>` — bumps `package.json` +
   `package-lock.json`, commits, and tags `vX.Y.Z`.
2. Pushes the commit and tag back to `main` (commit carries `[skip ci]`, both
   pushes use `-o ci.skip`, so no pipeline loop).
3. **Retags the already-built image** (the exact digest deployed to prod) as
   `:vX.Y.Z` and `:latest` and pushes them — no rebuild.

**Why the image gets the right tag even though the bump is after the build:** the
build output is immutable and identified by commit SHA. The semver is applied
*afterwards* as an extra tag on the *same digest*, so the released `:vX.Y.Z`
image is bit-for-bit what was tested on stage.

**Why no merge conflicts:** only the release-bot edits the `version` line, and
only on `main`. Feature branches never touch it, so a 3-way merge (`main ↔ dev`)
auto-takes the bumped value — no conflict (as long as you don't hand-edit the
version elsewhere).

**Alternatives:** *tag-driven* (push a `vX.Y.Z` tag yourself → a `$CI_COMMIT_TAG`
job builds/deploys it) or *semantic-release* (version derived from Conventional
Commits + changelog).

---

## Local run

```bash
docker compose -f Docker/docker-compose.local.yml up --build
```
