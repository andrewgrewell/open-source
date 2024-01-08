import { createTask } from '@ag-oss/workflows-js';
import { readFileAsync, writeFileAsync } from '@ag-oss/fs';

export interface JestPrettierFixOptions {
  jestConfigPath: string;
}

export function jestPrettierFix(options: JestPrettierFixOptions) {
  const { jestConfigPath } = options;
  return createTask({
    name: 'Add prettier-2 to jest.config.ts',
    runner: async () => {
      const file = await readFileAsync(jestConfigPath, 'utf-8');
      if (file.includes('prettierPath')) {
        return;
      }
      const updatedFile = insertPrettierPathDisplayName(file);
      await writeFileAsync(jestConfigPath, updatedFile);
      return 'Prettier-2 added to jest.config.ts';
    },
  });
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
