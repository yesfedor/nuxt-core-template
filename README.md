# Nuxt Core Template 🚀

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/yesfedor/nuxt-core-template/deploy.yml)
![Nuxt Version](https://img.shields.io/badge/Nuxt-3.16.2-blue?logo=nuxt)
![Vue Version](https://img.shields.io/badge/Vue-3-lightygreen?logo=vue.js)
![License](https://img.shields.io/badge/License-MIT-green)

### **Enterprise-grade Nuxt 3 Starter Template**  
*Accelerate your Next Web Project with Production-Ready Foundation*

[![Nuxt 3 Poster](https://nuxt.com/assets/design-kit/logo-green-white.svg)](https://nuxt-core-template.iny.su/)

## 🌟 Key Features

### Core Technologies
| Technology | Description | 
|------------|-------------|
| ![Nuxt](https://img.shields.io/badge/-Nuxt_3-00DC82?logo=nuxt.js&logoColor=white) | SSR/SSG/Hybrid Rendering |
| ![Vue 3](https://img.shields.io/badge/-Vue_3-4FC08D?logo=vue.js&logoColor=white) | Composition API Ecosystem |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) | Strict Type Checking |

---

### Main Modules

#### Core Nuxt Modules
| Module | Purpose | Docs |
|--------|---------|------|
| `@nuxt/devtools` | Development Experience Toolkit | [Docs](https://devtools.nuxtjs.org/) |
| `@nuxt/icon` | Icon Management System | [Docs](https://nuxt.com/modules/icon) |
| `@nuxtjs/device` | Device Detection | [Docs](https://github.com/nuxt-community/device-module) |
| `@nuxtjs/stylelint-module` | CSS/SCSS Quality Control | [Docs](https://github.com/nuxt-modules/stylelint) |
| `@nuxt/eslint` | Code Standardization | [Docs](https://eslint.nuxt.com/) |

#### Development Essentials
| Module | Purpose | Docs |
|--------|---------|------|
| `es-toolkit` | Modern Lodash Alternative | [Docs](https://github.com/evrimagaci/es-toolkit) |
| `mitt` | Event Bus Implementation | [Docs](https://github.com/developit/mitt) |
| `@vueuse/nuxt` | Reactive Utilities | [Docs](https://vueuse.org/) |

#### Validation & Type Safety
| Module | Purpose | Docs |
|--------|---------|------|
| `ajv` + `ajv-keywords` | JSON Schema Validation | [Docs](https://ajv.js.org/) |
| `yup` | Form Schema Definition | [Docs](https://github.com/jquense/yup) |

#### Quality Assurance
| Module | Purpose | Docs |
|--------|---------|------|
| `@chromatic-com/storybook` | Visual Testing | [Docs](https://www.chromatic.com/) |
| `@storybook/*` | Component Isolation | [Docs](https://storybook.js.org/) |

## 🛠 Project Architecture

```bash
├── app/
│   ├── assets/stylesheets # SCSS Foundation
│   ├── components/core # Global Components
│   ├── pages # Route System
│   └── api # Auto-imported API Composables
├── environments/ # Multi-stage Configs
└── shared/ # Business Logic Helpers
   ```

## ✨ Special Features

### Custom Innovations
1. **Dynamic Icon System**  
   Auto-generated types from `~/assets/icon` with IDE support

2. **Core Scope Component**
   ```vue
   <core-scope>
     <!-- Global context initialization -->
   </core-scope>


3. **Validation Ecosystem**
   ```ts
   // Unified validation with YUP + AJV
   const schema = yup.object({ email: yup.string().required() });
   ```

## 📦 Installation

```bash
# Using Node Version Manager
nvm install && nvm use

# Environment Setup
cp ./environments/local.env .env
```

## 🚀 Development

```bash
# Start Dev Server
npm run dev

# Storybook
npm run storybook

# Production Build
npm run build && node .output/server/index.mjs
```

## 📚 Documentation

| Section | Description |
|---------|-------------|
| [Architecture Guide](docs/architecture.md) | Project Structure Philosophy |
| [Style Guide](app/assets/stylesheets/README.md) | SCSS Methodology |
| [Validation System](shared/ajv) | JSON Schema Validation |

## 🤝 Contributing

We welcome contributions! Please follow our [Contribution Guidelines](CONTRIBUTING.md) and read our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

MIT © [Garanin Fedor](https://yesfedor.com)

---

[![Explore on GitHub](https://img.shields.io/badge/View%20on-GitHub-181717?logo=github)](https://github.com/yesfedor/nuxt-core-template)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-success)](https://nuxt-core-template.iny.su/)
