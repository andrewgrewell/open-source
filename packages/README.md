# Packages

## Creating a new package
New packages are created using the Nx generators and then the name of the plugin package

### Flags
- `--simpleName` - Don't include the directory in the generated file name.
- `--directory` - The directory to create the package in.
- `--tags` - Tags to add to the package. should include `ag-oss` if open source.
- `--publishable` - Make the package publishable.
- `--importPath` - The import path to use for the package. This is used for local imports and publishing.
- `--projectNameAndRootFormat` - Whether to generate the project name and root directory as provided (`as-provided`) or generate them composing their values and taking the configured layout into account (`derived`).

#### JS (TSC)
```bash
nx g @nx/js:lib {package-name} --simpleName --directory=packages/{domain/subdomain/package-name} --tags={execution-context, ag-oss if open source}
```


## Publishing
