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
7. VueUse - for support function
8. Lodash-es - for data manipulation
9. VeeValidate with yup - data validation and scheme organizer
10. and more Vue / Nuxt modules - Vue Router, Pinia, I18n, etc..

---

### Special modifications

1. A `<ui-icon>` component has been created that covers the functionality of nuxt-icon. There is also a module written for it that scans the ~/assets/icon folder and generates a `types` based on the files. Adds hints to the icon name when using the component
2. A `<core-scope>` is a "god" component, it avoids duplication of initialization code and is a repository of the necessary components throughout the application.
3. Plugin `1.initialization.ts` - initialization you're app here - validate token, request the site configuration, etc.
4. Plugin `2.eventBus.ts` - wrapper over the `mitt` package for convenient use

---

### Docs

1. [Arhitecute](docs/arhitecute.md) - For a quick start, the project philosophy is described, which you can change
2. [Stylesheets](assets/stylesheets/README.md) - For a quick start, the philosophy of styles is described. SCSS is included

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
