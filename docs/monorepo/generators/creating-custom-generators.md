# Creating Custom Nx Generators

## Links
- https://nx.dev/plugins/recipes/local-generators
- https://nx.dev/packages/devkit/documents/nx_devkit


## Steps

### 1. Install plugin package and generate plugin project
```bash
# replace `latest` with the version that matches your Nx version
npm install @nx/plugin@latest
nx g @nx/plugin:plugin my-plugin
```

### 2. Create generator in plugin project
```bash
nx generate @nx/plugin:generator my-generator --project=my-plugin
```

### 3. Write custom generator logic using Nx devkit and other Nx packages
Generators use [Nx Devkit](https://nx.dev/packages/devkit/documents/nx_devkit) to handle the common tasks required to
create files for a workspace project.

#### Scenarios

##### Composing existing generators
It's possible to import the generator function from another library or generator, and run it within your generator.
This makes it possible to perform custom handling before or after generating the files. One example is moving the
files creating a file structure that matches your teams standards, or adding additional boilerplate required for the project.

##### Interactive generators using prompts
For the best devX, generators should use prompts to get user input when it is not explicitly provided via args.

