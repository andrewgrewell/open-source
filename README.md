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
- [Monorepo](docs/monorepo.md)
  - [File Structure](docs/monorepo.md#file-structure)
    - [Key Principles](docs/monorepo.md#key-principles) 
    - [Apps](docs/monorepo.md#apps)
    - [Packages](docs/monorepo.md#packages)
    - [Module boundaries](docs/monorepo.md#module-boundaries)
      - [Enforcing module boundaries](docs/monorepo.md#enforcing-module-boundaries)
    - [Generators](docs/monorepo.md#generators)
      - [Creating Custom Nx Generators](docs/monorepo.md#creating-custom-nx-generators)]
- [Development](docs/development.md)
  - [Core Principles](docs/development.md#core-principles)
  - [Product Development Lifecycle](docs/development.md#product-development-lifecycle)
    - [High Level flow](docs/development.md#high-level-flow)
    - [Completion](docs/development.md#completion)
    - [Estimation](docs/development.md#estimation)
    - [Roles](docs/development.md#roles)
      - [Product Owner(s)](docs/development.md#product-owners)
      - [Technical Lead(s)](docs/development.md#technical-leads)
      - [Developer(s)](docs/development.md#developers)
  - [NPM Audit Log](docs/npm-audit-log.md)
  - [Tech Debt](docs/tech-debt.md)
  - [Testing](docs/testing.md)
  - [TS Reference](docs/ts-reference.md)

## Usage

**1. Clone or fork the repo**

**2. Install global dependencies**
- `npm install --g git-conventional-commits`
- `npm install --g nx`
