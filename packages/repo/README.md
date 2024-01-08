# @ag-oss/repo

Utilities for use managing an Nx monorepo.

**Links**
- [Nx Plugin Docs](https://nx.dev/extending-nx/tutorials/create-plugin)

**Create a new generator**
```bash
nx generate @nx/plugin:generator {name} --directory=packages/repo/src/generators/{name}
```

**Crate a new executor**
```bash
nx generate @nx/plugin:executor {name} --directory=packages/repo/src/executors/{name}
```
