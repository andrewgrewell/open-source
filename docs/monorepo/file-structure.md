# File Structure

## Key Principles
```text
The file structure should...
• read like a table of contents for the repo
• reflect the products / domains of the repo
• aid linting and enforce module boundaries
• minimize the number of modules affected by changes to a single module
```

---

### A file structure should read like a table of contents for the repo
Its primary function is to provide an organized and hierarchical overview of the content within the repo.

#### The key functions of a ~~table of contents~~ repo structure are:

- **Overview**: The repo structure provides developers with a high-level view of the domains, allowing them to grasp the overall organization and flow of the code base.
- **Navigation**: One of the primary functions of a project browser is to enable easy navigation within the repo. By structuring modules by domain, subdomains, and execution context, developers can quickly jump to specific sections of interest without having to jump around the code base too much.
- **Reference**: The project browser acts as a reference tool, helping developers find relevant information based on their specific needs. By scanning the project browser, developers can identify which areas are most relevant to their current focus.
- **Orientation**: For larger repos, a well-designed and consistent file structure provides developers with a sense of orientation. It helps them understand where they are within the repo and how different areas relate (or don't relate) to each other.
- **Planning and Preview**: Before diving into the full content, developers often use the project browser as a means of planning and previewing. They can quickly assess the depth and breadth of the code, get a sense of what is involved, and decide which areas to explore in detail.

---

### A file structure should reflect the products and domains of the repo
Similar to thinking of the structure as a TOC, packages should be organized by top level domain, execution scope and
any additional subdomains.

---

### A file structure should support the context the module is intended to be used in
All modules have a specific context(s) they are intended to be used in. At the least there are the contexts js,node,browser,react,etc.
You can also scope the packages by additional context if it makes sense. You may have a set of utilities that
are designed for a specific application, for example `ecom/utils/js` or `ecom/utils/react` might be packages
that provide utilities for the use by the 'ecom' product in the js and react contexts respectively.

---

## Packages
Packages should be scoped by domain(s) and then execution context, if multiple execution contexts (e.g. js, node, etc.).
The top level folder of a package should be the product/app/domain that it is associated with.

### A file structure for packages should minimize the number of projects affected by changes to a single package
Nx is aware of the dependencies between projects, this makes it possible to only run tasks for projects
with changes. In order to make tasks execute as quick as possible, ideally tasks would only run when something
the project depended on changed, However the reality is that a project will rarely consume all modules of a package.
The goal is to find the balance between a module being too granular and too large.
- If you know the library will be large and consist of many modules, it is better to create packages for each module under a domain/subdomain
  An example would be the `js/utils`
  ```text
  packages/
  └── js/
      └── utils/
          ├── strings
          ├── math
          ├── objects
          └── ...etc
  ```
- If you are unsure, there is no harm in creating a single package and if/when the package becomes too large or triggers changes for un-related modules, split the modules out
