import { Tree } from '@nx/devkit';
import { verboseLogger as log } from '@ag-oss/logging';

export interface RemoveEslintJsoncOptions {
  eslintPath: string;
}

export function removeEslintJsonc(tree: Tree, options: RemoveEslintJsoncOptions) {
  const { eslintPath } = options;
  log.verbose(`Running removeEslintJsonc from file ${eslintPath}`);
  const file = tree.read(eslintPath, 'utf-8');
  const json = JSON.parse(file);
  const overrides = json.overrides;
  if (!overrides) {
    return;
  }
  json.overrides = overrides.filter((override) => {
    const remove = override.parser === ('jsonc-eslint-parser' as string);
    if (remove) {
      log.verbose(`Removing jsonc-eslint-parser from "${eslintPath}"`);
    }
    return !remove;
  });
  tree.write(eslintPath, JSON.stringify(json, null, 2));
}
