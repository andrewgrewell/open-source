# Andrew's Open Source Monorepo

![ag-open-source-image](https://github.com/andrewgrewell/open-source/assets/8173965/aa147b6e-5125-4b7d-a82a-aa4b508c7de2)

[![Nx Cloud](https://img.shields.io/badge/Nx%20Cloud-FFFFFF)](https://cloud.nx.app/orgs/6593acbc4ae95b7b5c4ad5af/workspaces/6593acd9d49e660082c656ff/overview)
[![Notion](https://img.shields.io/badge/Notion-FFFFFF)](https://sly-cafe-100.notion.site/AG-Open-Source-151a005fc3844585bebece333a9d385c)

## Table of Contents
- [Usage](#usage)
- Concepts
  - [File Structure](docs/monorepo/file-structure.md)
  - [File Generators](docs/monorepo/generators.md)
  - Product Development
    - [Core Principles](docs/product-development/core-principles.md)
    - [Product Development Lifecycle](docs/product-development/product-development-lifecycle.md)
- [Development](#development)
  - [Modules / Projects](#modules--projects)
  - [Module boundaries](#module-boundaries)
  - [Creating Applications](#creating-applications)
    - [Browser](#browser)
    - [Mobile](#mobile)
    - [Desktop](#desktop)

## Usage

**1. Clone or fork the repo**

**2. Install global dependencies**
- `npm install --g git-conventional-commits`
- `npm install --g nx`


## Development

### Module boundaries
Module boundaries are defined in the `project.json` under `tags`, and enforced by the
`@nx/enforce-module-boundaries` eslint rule. see [Enforce Module Boundaries](https://nx.dev/core-features/enforce-module-boundaries) for more info.

All open source projects have the `as-oss` tag, if the tag is not present in the project.json it is assumed to not be published.
`ag-oss` can only depend on other `ag-oss` projects as well as the module boundaries defined in the eslint.json. Internal packages follow the module boundaries defined in the `eslint.json`.

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

