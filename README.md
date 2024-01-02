# Andrew's Open Source Monorepo

# Setup

**1. Clone the repo to your local machine**
```bash
git clone git@github.com:andrewgrewell/devsigner-monorepo.git
```

**2. Install global dependencies**
- `npm install --g git-conventional-commits`
- `npm install --g nx`

# Development

## Modules / Projects
All modules in the repo are interchangeably referred to as projects.

## Module boundaries
Module boundaries are defined in the `project.json` under `tags`, and enforced by the
`@nx/enforce-module-boundaries` eslint rule. see [Enforce Module Boundaries](https://nx.dev/latest/react/plugins/enforce-module-boundaries) for more info.

## Creating Applications

### Browser
```bash
nx g @nx/next:app <app-name> --directory=apps/{app-name}/clients/browser
```

### Mobile
```bash
nx g @nx/react-native:app <app-name> --directory=apps/{app-name}/clients/mobile
```

### Desktop
*Note: A Desktop app UI is assumed to be driven by a browser app*
```bash
nx g nx-electron:app <app-name> --frontendProject=<browser-app-name> --directory=apps/{app-name}/clients/desktop
```

