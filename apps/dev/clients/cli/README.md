# Dev CLI

*CLI tool for automating dev workflows*

- The Dev CLI is intended for a single place to contain common automations that make development easier.
- Any time you find yourself doing a repetitive task, consider codifying it and adding it to the Dev CLI.
- Rather than writing bash scripts it is better to write the script as a CLI command to take advantage of code sharing, and better dev ergonomics.
- It is a good practice to write the logic for the command in a separate package, 
  this is no extra work, and prevents the useful logic from being coupled to the cli.

---

## Usage as a packaged CLI
Note that the name of the CLI is driven by the "name" field in the projects `package.json` file.

1. **Package the cli**
    ```bash
    nx run dev-cli:package
    ```
2. **Add the cli to your path**
    ```bash
    echo "export PATH=$PATH:$(pwd)/dist/apps/dev/clients/cli" >> ~/.bashrc && source ~/.bashrc
    ```
3. **Run the cli**
    ```bash
    dev-cli
    ```
4. **Run a command**
    ```bash
    dev-cli run-example progress
    ```
   
## Local development with Hot Reload
1. **In a new terminal, start watching for changes in the project source code**
    ```bash
    nx run dev-cli:watch
    ```
2. **In another terminal, run the dev REPL**<br />
   *Note: The dev REPL must run from npm because if ran as an Nx command stdout is hidden*
    ```bash
    npm run dev-cli:dev
    ```
3. **Enter commands into the prompt** `{command} {args}`
    ```bash
    ? Enter command > run-example progress
    ```

