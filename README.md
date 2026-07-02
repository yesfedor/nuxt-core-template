# Nuxt Core Template 🚀

[![Pipeline](https://git.fivgpn.com/template/nuxt-core-template/badges/main/pipeline.svg)](https://git.fivgpn.com/template/nuxt-core-template/-/pipelines)
![Nuxt Version](https://img.shields.io/badge/Nuxt-4.4-00DC82?logo=nuxt)
![Vue Version](https://img.shields.io/badge/Vue-3-42b883?logo=vue.js)
![Node](https://img.shields.io/badge/Node-24_LTS-339933?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

### **Enterprise-grade Nuxt 4 Starter Template**
*Accelerate your next web project with a production-ready, self-hosted-ready foundation*

[![Nuxt Poster](https://nuxt.com/assets/design-kit/logo-green-white.svg)](https://nuxt-core-template.fivgpn.com/)

## 🔗 Links

| | |
|---|---|
| **Primary repo** (self-hosted GitLab) | https://git.fivgpn.com/template/nuxt-core-template |
| **Mirror** (GitHub — *Use this template*) | https://github.com/yesfedor/nuxt-core-template |
| **Prod demo** | https://nuxt-core-template.fivgpn.com |
| **Stage demo** | https://stage-nuxt-core-template.fivgpn.com |

[![Use this template](https://img.shields.io/badge/Use%20this-template-2ea44f?logo=github)](https://github.com/yesfedor/nuxt-core-template/generate)

## 🌟 Key Features

### Core Technologies
| Technology | Description |
|------------|-------------|
| ![Nuxt](https://img.shields.io/badge/-Nuxt_4-00DC82?logo=nuxt.js&logoColor=white) | SSR/SSG/Hybrid Rendering |
| ![Vue 3](https://img.shields.io/badge/-Vue_3-4FC08D?logo=vue.js&logoColor=white) | Composition API Ecosystem |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) | Strict Type Checking |
| ![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white) | Multi-stage, non-root, healthcheck |

---

### Main Modules

#### Core Nuxt Modules
| Module | Purpose | Docs |
|--------|---------|------|
| `@nuxt/devtools` | Development Experience Toolkit | [Docs](https://devtools.nuxt.com/) |
| `@nuxt/icon` | Icon Management System | [Docs](https://nuxt.com/modules/icon) |
| `@nuxt/eslint` | Code Standardization | [Docs](https://eslint.nuxt.com/) |
| `@nuxtjs/stylelint-module` | CSS/SCSS Quality Control | [Docs](https://github.com/nuxt-modules/stylelint) |
| `@nuxtjs/i18n` | Internationalization | [Docs](https://i18n.nuxtjs.org/) |
| `@nuxtjs/device` | Device Detection | [Docs](https://github.com/nuxt-modules/device) |
| `@pinia/nuxt` | State Management | [Docs](https://pinia.vuejs.org/) |
| `@vite-pwa/nuxt` | PWA / Service Worker | [Docs](https://vite-pwa-org.netlify.app/frameworks/nuxt.html) |

#### Development Essentials
| Module | Purpose | Docs |
|--------|---------|------|
| `es-toolkit` | Modern Lodash Alternative | [Docs](https://es-toolkit.dev/) |
| `mitt` | Event Bus Implementation | [Docs](https://github.com/developit/mitt) |
| `@vueuse/nuxt` | Reactive Utilities | [Docs](https://vueuse.org/) |

#### Validation & Type Safety
| Module | Purpose | Docs |
|--------|---------|------|
| `@vee-validate/nuxt` + `yup` | Form Validation | [Docs](https://vee-validate.logaretm.com/v4/) |
| `ajv` + `ajv-keywords` | JSON Schema Validation | [Docs](https://ajv.js.org/) |

## 🏗 Self-Hosted Ready

Ships with a complete **GitLab CI/CD** pipeline designed for your **own GitLab
instance and your own VMs** — no SaaS required.

- **by-image-tag delivery** — build once into a Docker image (Node 24 Alpine,
  non-root, healthcheck), push to the GitLab Container Registry, deploy by
  pulling that tag. Nothing is built on the server.
- **Environment-agnostic image** — one image runs any contour; per-contour
  config is injected at runtime via `NUXT_PUBLIC_*`.
- **Contours** — `dev` · `test` · `stage` · `prod` · `vm1` · `vm2`, each an
  isolated compose project (co-locate several on one VM, distinct host ports).
- **Promotion & release** — `main` auto-deploys to `stage`; a manual button
  promotes the *same* tag to `prod`; `release:patch|minor|major` bumps
  `package.json`, tags `vX.Y.Z` and re-tags the image — no rebuild.
- **Zero-touch new projects** — container names and deploy paths derive from
  `$CI_PROJECT_NAME`; a new project only changes ports, domains and app identity.

📖 Full runbooks: **[Deployment](environment.md)** ·
**[Using this template](docs/USING-THIS-TEMPLATE.md)**

## 🛠 Project Architecture

```bash
├── app/
│   ├── assets/stylesheets # SCSS Foundation
│   ├── components/core # Global Components
│   ├── pages # Route System
│   └── api # Auto-imported API Composables
├── Docker/ # Per-contour docker-compose files
├── environments/ # Per-contour + build env
└── shared/ # Business Logic Helpers
```

## ✨ Special Features

### Custom Innovations
1. **Dynamic Icon System**
   Auto-generated types from `~/assets/icons` with IDE support

2. **Core Scope Component**
   ```vue
   <core-scope>
     <!-- Global context initialization -->
   </core-scope>
   ```

## 🔐 Validation Ecosystem

### Unified Data Validation Flow

#### 1. Frontend Validation (YUP + VeeValidate)
```html
<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

// Unified validation schema
const schema = yup.object({
  email: yup.string().required().email(),
  age: yup.number().min(18).max(99),
  metadata: yup.object({
    preferences: yup.array().of(yup.string())
  })
});

const { handleSubmit } = useForm({
  validationSchema: schema
});

const onSubmit = handleSubmit((values) => {
  // Submit to API
});
</script>

<template>
  <form @submit="onSubmit">
    <Field name="email" type="email" />
    <ErrorMessage name="email" />

    <button type="submit">Submit</button>
  </form>
</template>
```

#### 2. Backend Schema Validation (AJV)

```typescript
// shared/ajv/schemas/user.ts
import { defineSchema } from 'ajv'

export const userSchema = defineSchema({
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    age: { type: 'number', minimum: 18, maximum: 99 },
    metadata: {
      type: 'object',
      properties: {
        preferences: {
          type: 'array',
          items: { type: 'string' }
        }
      },
      required: ['preferences']
    }
  },
  required: ['email', 'age'],
  additionalProperties: false
});
```

## 📦 Installation

Requires **Node 24 LTS** (pinned in `.nvmrc`).

```bash
# Use the pinned Node version
nvm install && nvm use

# Environment setup
cp ./environments/local.env .env

# Install dependencies
npm install
```

## 🚀 Development

```bash
# Start dev server
npm run dev

# Production build (local)
npm run build && node .output/server/index.mjs

# Full production container (local)
docker compose -f Docker/docker-compose.local.yml up --build
```

## 📚 Documentation

| Section | Description |
|---------|-------------|
| [Deployment](environment.md) | Self-hosted CI/CD, contours, secrets, versioning |
| [Using this template](docs/USING-THIS-TEMPLATE.md) | Bootstrap from zero + adding new projects |
| [Architecture Guide](docs/architecture.md) | Project Structure Philosophy |
| [Style Guide](app/assets/stylesheets/README.md) | SCSS Methodology |

## 🤝 Contributing

We welcome contributions! Please follow our [Contribution Guidelines](CONTRIBUTING.md) and read our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

MIT © [Garanin Fedor](https://yesfedor.com)

---

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-success)](https://nuxt-core-template.fivgpn.com/)
[![Use this template](https://img.shields.io/badge/Use%20this-template-2ea44f?logo=github)](https://github.com/yesfedor/nuxt-core-template/generate)
