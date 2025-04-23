# Contribution Guide 🌟

Thank you for considering contributing to Nuxt Core Template!  
This document outlines processes for effective collaboration.

![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen)

## 🚦 Before You Start

1. Read our [Code of Conduct](CODE_OF_CONDUCT.md)
2. Check existing [Issues](https://github.com/yesfedor/nuxt-core-template/issues) 
   and [PRs](https://github.com/yesfedor/nuxt-core-template/pulls) to avoid duplicates

## 🛠 Setup Environment

### Prerequisites
- Node.js v22+ ([.nvmrc](.nvmrc) supported)

```bash
nvm install && nvm use
npm ci
cp ./environments/local.env .env
```

## 🔧 Development Workflow

### Branch Strategy
```bash
git checkout -b feat/your-feature-name   # For new features
git checkout -b fix/your-fix-name        # For bug fixes
```

### Commit Convention
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```bash
git commit -m "feat(icons): add new alert icon"
git commit -m "fix(validation): resolve schema merge conflict"
```

## 🧪 Testing Protocol

### Component Stories
1. Create stories in `*.stories.ts` files
2. Verify interactions:
```bash
npm run storybook
```

### Visual Regression
We use [Chromatic](https://www.chromatic.com/) for visual testing:
```bash
npx chromatic --project-token=<your-token>
```

## 🧑💻 Code Standards

### Validation Layers
| Tool | Scope | Auto-fix |
|------|-------|----------|
| ESLint | JS/TS | `npm run lint:js -- --fix` |
| Stylelint | SCSS | `npm run lint:style -- --fix` |
| TypeScript | Types | Built-in |

### Key Principles
1. Keep core components in `app/components/core`
2. All API interactions via `app/api` composables
3. JSON Schemas in `shared/ajv/schemas`
4. Icon assets in `assets/icon` with type generation

## ➕ Creating Pull Requests

### PR Requirements
1. Reference related issue (#123)
2. Update documentation if needed

### Review Process
1. Maintainers will respond within 48 hours
2. Required approvals: 2
3. Squash merge strategy

## 📜 Documentation Updates
- Modify architecture docs in `/docs`
- Add component examples in Storybook
- Update inline JSDoc comments

## 🆘 Need Help?
Join our [Discussion Board](https://github.com/yesfedor/nuxt-core-template/discussions)
for technical questions.

---

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue)](https://githubbox.com/yesfedor/nuxt-core-template)
