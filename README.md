# Nuxt Core Template

This project is a template, for quickly getting started on your new project.
When creating the template, many requests from businesses were taken into account, and the convenience of development.

---
### About

Thus, the following plugins are now configured and supported:
1. DotEnv files in [./environments]() folder supported stage with balanced setting: local, dev, stage, prod
2. Typescript 5 + Vue 3 + Nuxt 3
3. Eslint, Stylelint (without lint-staged)
4. SCSS
5. Consola - To wrap the logs
6. Mitt - Global emitter
7. Vueuse - for support function
8. Lodash-es - for data manipulation
9. VeeValidate with yup - data validation and scheme organizer
10. and more Vue / Nuxt modules - Vue Router, Pinia, I18n, etc..

---

### Installation

```shell
nvm install && nvm use
npm i && cp ./environments/local.env .env
```

---

### Dev Mode

```shell
npm run dev
```

---

### Build and start server

```shell
npm run build && node .output/server/index.mjs 
```
### SSG mode and start server

```shell
nuxi generate && npx serve .output/public
```
