import { Tree } from '@nx/devkit';
import { verboseLogger as log } from '@ag-oss/logging';

export interface JestPrettierFixOptions {
  /**
   * The path to the jest.config.json file
   */
  jestConfigPath: string;
}

export function jestPrettierFix(tree: Tree, options: JestPrettierFixOptions) {
  const { jestConfigPath } = options;
  log.verbose(`Running jest-prettier-fix on file ${jestConfigPath}`);
  const file = tree.read(jestConfigPath, 'utf-8');
  if (file.includes('prettierPath')) {
    return;
  }
  const updatedFile = insertPrettierPathDisplayName(file);
  tree.write(jestConfigPath, updatedFile);
  log.info('Prettier-2 added to jest.config.ts');
}

function insertPrettierPathDisplayName(jestConfigContents: string): string {
  const displayNameIndex = jestConfigContents.indexOf('displayName');

  if (displayNameIndex === -1) {
    throw new Error('displayName not found in the the jest.config.json file');
  }

  const firstPart = jestConfigContents.substring(0, displayNameIndex);
  const secondPart = jestConfigContents.substring(displayNameIndex);
  const lineToAdd = "prettierPath: require.resolve('prettier-2'),\n  ";

  return firstPart + lineToAdd + secondPart;
}
