# Andrew's Open Source Monorepo
![ag-open-source-image](https://github.com/andrewgrewell/open-source/assets/8173965/aa147b6e-5125-4b7d-a82a-aa4b508c7de2)

## Table of Contents
- [Setup](#setup)
- Concepts
  - [File Structure](docs/monorepo/file-structure.md)
  - [File Generators](docs/monorepo/generators.md)
  - Product Development
    - [Core Principles](docs/product-development/core-principles.md)
    - [Product Development Lifecycle](docs/product-development/product-development-lifecycle.md)
- [Development](#development)
  - [Project Planning Page](https://sly-cafe-100.notion.site/AG-Open-Source-151a005fc3844585bebece333a9d385c)
  - [Modules / Projects](#modules--projects)
  - [Module boundaries](#module-boundaries)
  - [Creating Applications](#creating-applications)
    - [Browser](#browser)
    - [Mobile](#mobile)
    - [Desktop](#desktop)

## Setup

**1. Clone or fork the repo**

**2. Install global dependencies**
- `npm install --g git-conventional-commits`
- `npm install --g nx`


## Development
[Project planning page](https://sly-cafe-100.notion.site/AG-Open-Source-151a005fc3844585bebece333a9d385c)

### Module boundaries
Module boundaries are defined in the `project.json` under `tags`, and enforced by the
`@nx/enforce-module-boundaries` eslint rule. see [Enforce Module Boundaries](https://nx.dev/latest/react/plugins/enforce-module-boundaries) for more info.

### Creating Applications

#### Browser
```bash
nx g @nx/next:app <app-name> --directory=apps/{app-name}/clients/browser
```

#### Mobile
```bash
nx g @nx/react-native:app <app-name> --directory=apps/{app-name}/clients/mobile
```

#### Desktop
*Note: A Desktop app UI is assumed to be driven by a browser app*
```bash
nx g nx-electron:app <app-name> --frontendProject=<browser-app-name> --directory=apps/{app-name}/clients/desktop
```

---

