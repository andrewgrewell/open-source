# Monorepo

A monorepo is a single repository containing multiple distinct projects, with well-defined relationships.

This monorepo uses [Nx](https://nx.dev/) to provide the tooling to structure and manage workflows in the repo.

## Table of Contents
- [File Structure](#file-structure)
  - [Key Principles](#key-principles) 
  - [Apps](#apps)
    - [Creating Applications](#creating-applications)
      - [Browser](#browser)
      - [Mobile](#mobile)
      - [Desktop](#desktop)
  - [Packages](#packages)
    - [Creating a new package](#creating-a-new-package)
      - [JS (TSC)](#js-tsc)
    - [Publishing](#publishing)
  - [Module boundaries](#module-boundaries)
    - [Enforcing module boundaries](#enforcing-module-boundaries)
  - [Generators](#generators)
    - [Creating Custom Nx Generators](#creating-custom-nx-generators)] 

## File Structure

### Key Principles
```text
The file structure should...
• read like a table of contents for the repo
• reflect the products / domains of the repo
• aid linting and enforce module boundaries
• minimize the number of modules affected by changes to a single module
```

#### A file structure should read like a table of contents for the repo
Its primary function is to provide an organized and hierarchical overview of the content within the repo.

#### The key functions of a ~~table of contents~~ repo structure are:

- **Overview**: The repo structure provides developers with a high-level view of the domains, allowing them to grasp the overall organization and flow of the code base.
- **Navigation**: One of the primary functions of a project browser is to enable easy navigation within the repo. By structuring modules by domain, subdomains, and execution context, developers can quickly jump to specific sections of interest without having to jump around the code base too much.
- **Reference**: The project browser acts as a reference tool, helping developers find relevant information based on their specific needs. By scanning the project browser, developers can identify which areas are most relevant to their current focus.
- **Orientation**: For larger repos, a well-designed and consistent file structure provides developers with a sense of orientation. It helps them understand where they are within the repo and how different areas relate (or don't relate) to each other.
- **Planning and Preview**: Before diving into the full content, developers often use the project browser as a means of planning and previewing. They can quickly assess the depth and breadth of the code, get a sense of what is involved, and decide which areas to explore in detail.

#### A file structure should reflect the products and domains of the repo
Similar to thinking of the structure as a TOC, packages should be organized by top level domain, execution scope and
any additional subdomains.

#### A file structure should support the context the module is intended to be used in
All modules have a specific context(s) they are intended to be used in. At the least there are the contexts js,node,browser,react,etc.
You can also scope the packages by additional context if it makes sense. You may have a set of utilities that
are designed for a specific application, for example `ecom/utils/js` or `ecom/utils/react` might be packages
that provide utilities for the use by the 'ecom' product in the js and react contexts respectively.

### Packages

#### Creating a new package
New packages are created using the Nx generators and then the name of the plugin package

**Flags**
- `--simpleName` - Don't include the directory in the generated file name.
- `--directory` - The directory to create the package in.
- `--tags` - Tags to add to the package. should include `ag-oss` if open source.
- `--publishable` - Make the package publishable.
- `--importPath` - The import path to use for the package. This is used for local imports and publishing.
- `--projectNameAndRootFormat` - Whether to generate the project name and root directory as provided (`as-provided`) or generate them composing their values and taking the configured layout into account (`derived`).

##### JS (TSC)
```bash
nx g @nx/js:lib {package-name} --simpleName --directory=packages/{domain/subdomain/package-name} --tags={execution-context, ag-oss if open source}
```

#### Publishing
Packages are published using the `publish` script in the root package.json, however a process is still being defined, stay tuned.

## Apps

The term `app` is used to refer to anything which is deployed. This can include client applications,
such as an app which runs in the browser or on a mobile device. It can also include services which are deployed
to support the clients.

For this reason, applications are organized in the `apps/` directory under their product domain, and then under either
`clients/` or `services/` depending on their type.

Core logic should ideally be kept out of the application directory, and instead be kept in a package scoped under the
product domain. For example a `todo` product would have both a `apps/todo` directory and a `packages/todo` directory.

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

## Module boundaries

In a monorepo it's imperative to have a clear understanding of what packages can depend on what other packages.
This is to ensure that we don't create circular dependencies, and that we don't create a dependency graph that is too complex to understand.

Currently, the only boundary being enforced is that of "execution context". All packages are tagged with the execution context
that they are intended to be used in. For example a package which depends on Node APIs would be tagged with `node`,
and a package which had no specific dependencies would be tagged with `js`.

The current module boundaries / execution contexts are:
- js
- node
- browser
- react
- electron
- react-native

Additional boundaries can always be added as needed to ensure that a package is only imported in specific contexts.

### Enforcing module boundaries
Module boundaries are defined in the `project.json` under `tags`, and enforced by the
`@nx/enforce-module-boundaries` eslint rule. see [Enforce Module Boundaries](https://nx.dev/core-features/enforce-module-boundaries) for more info.

---

## Generators
Generators are scripts which will auto generate boilerplate.
Any time you find yourself doing repetitive boilerplate files, you should consider creating a generator.

The two key benefits of generators are:
- **Consistency:** all project files will follow the same patterns, and if/when those patterns change, it is simple to update the generator and create a codemod script to update all existing files.
- **Speed:** less time manually creating boilerplate, less time spent fixing mistakes, less context switching

### Creating Custom Nx Generators
**Links**
- https://nx.dev/plugins/recipes/local-generators
- https://nx.dev/packages/devkit/documents/nx_devkit

### Steps

#### 1. Install plugin package and generate plugin project
```bash
# replace `latest` with the version that matches your Nx version
npm install @nx/plugin@latest
nx g @nx/plugin:plugin my-plugin
```

#### 2. Create generator in plugin project
```bash
nx generate @nx/plugin:generator my-generator --project=my-plugin
```

#### 3. Write custom generator logic using Nx devkit and other Nx packages
Generators use [Nx Devkit](https://nx.dev/packages/devkit/documents/nx_devkit) to handle the common tasks required to
create files for a workspace project.

#### Scenarios

##### Composing existing generators
It's possible to import the generator function from another library or generator, and run it within your generator.
This makes it possible to perform custom handling before or after generating the files. One example is moving the
files creating a file structure that matches your teams standards, or adding additional boilerplate required for the project.

##### Interactive generators using prompts
For the best devX, generators should use prompts to get user input when it is not explicitly provided via args.

---
