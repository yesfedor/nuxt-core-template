# Nuxt Core Template

This project is a template, for quickly getting started on your new project.
When creating the template, many requests from businesses were taken into account, and the convenience of development.

---

### About

Thus, the following plugins are now configured and supported:

1. DotEnv files in [environments](./environments) folder supported stage with balanced setting: local, dev, stage, prod
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

1. A `<ui-icon>` component has been created that covers the functionality of `nuxt-icon`. There is also a module written for it that scans the `~~/assets/icon` folder and generates a `types` based on the files. Adds hints to the icon name when using the component
2. A `<core-scope>` is a "god" component, it avoids duplication of initialization code and is a repository of the necessary components throughout the application.
3. Plugin `1.initialization.ts` - initialization you're app here - validate token, request the site configuration, etc.
4. Plugin `2.eventBus.ts` - wrapper over the `mitt` package for convenient use
5. A `app/api` api folder support auto-imports a.k.a composable, for details see [homepage](./app/pages/index.vue)

---

### Docs

1. [Architecture](./docs/architecture.md) - For a quick start, the project philosophy is described, which you can change
2. [Stylesheets](./app/assets/stylesheets/README.md) - For a quick start, the philosophy of styles is described. SCSS is included

### Installation

> You can view the Node.js version in [.nvmrc](./.nvmrc)

```bash
nvm i && nvm use
cp ./environments/local.env .env
```

---

### Dev Mode

```bash
npm run dev
```

---

### Build and start server

```bash
npm run build && node .output/server/index.mjs
```

### SSG mode and start server

```bash
nuxi generate && npx serve .output/public
```
