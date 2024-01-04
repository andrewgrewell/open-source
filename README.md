# Andrew's Open Source Monorepo

[![codecov](https://codecov.io/github/andrewgrewell/open-source/graph/badge.svg?token=SXU7TEYVNX)](https://codecov.io/github/andrewgrewell/open-source)
[![Test Status](https://github.com/andrewgrewell/open-source/actions/workflows/test-main.yml/badge.svg)](https://github.com/andrewgrewell/open-source/actions/workflows/test-main.yml)
[![Nx Cloud](https://img.shields.io/badge/Nx%20Cloud-FFFFFF)](https://cloud.nx.app/orgs/6593acbc4ae95b7b5c4ad5af/workspaces/6593acd9d49e660082c656ff/overview)
[![Notion](https://img.shields.io/badge/Notion-FFFFFF)](https://sly-cafe-100.notion.site/AG-Open-Source-151a005fc3844585bebece333a9d385c)

This project will serve as a place where I can share the code, patterns, and philosophy of software development that I have refined over the years.
If you are reading this you have discovered this pretty early so please keep in mind I'm in the process of transferring over my projects to this repo, and refining the structure.

<a href="https://sly-cafe-100.notion.site/AG-Open-Source-151a005fc3844585bebece333a9d385c">
    <img src="https://github.com/andrewgrewell/open-source/assets/8173965/aa147b6e-5125-4b7d-a82a-aa4b508c7de2" alt="AG Open Source" title="AG Open Source" height="300" />
</a>

## Table of Contents
- [Usage](#usage)
- [Development](#development)
  - [Core Principles](docs/product-development/core-principles.md)
  - [Product Development Lifecycle](docs/product-development/product-development-lifecycle.md)
  - [Modules / Projects](#modules--projects)
  - [File Structure](docs/monorepo/file-structure.md)
  - [Module boundaries](#module-boundaries)
  - [File Generators](docs/monorepo/generators.md)
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

