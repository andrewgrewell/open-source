# Tech Debt

Below is a list of running tech debt. Add anything you think needs to be tackled. 
This list will be reviewed periodically and items will be culled.

<details>
  <summary><b>Update package generator to include jest prettier patch in jest.config</b></summary>
  <p>See the <code>logging</code> project as an example, where <code>prettierPath: require.resolve('prettier-2')</code> was added to jest.config.ts</p>
  <p>Adding to the root jest config doesn't take effect when running the tests from my IDE, and remembering to add to each package
  is going to be tedious. see: https://jestjs.io/docs/configuration/#prettierpath-string</p>
</details>

<details>
  <summary><b>Update package generator to not include json files in eslint or fix jsonc</b></summary>
  <p>A quick search didn't turn anything up, which is suspect, but the error is <code>Parsing error: Expected to be an expression, but got empty</code>
  and it happens on any json project file, I'm not sure why Nx updated the generator to include this in the eslint, I assume it must have worked at some point.</p>
</details>
