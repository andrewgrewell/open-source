import { ProjectFileBuilder } from '../../../types';

export const eslintrcBuilder: ProjectFileBuilder = (config) => {
  const { relativePathToRepoRoot } = config;
  const contents = {
    extends: [`${relativePathToRepoRoot}/.eslintrc.json`],
    ignorePatterns: ['!**/*'],
    overrides: [
      {
        files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
        rules: {},
      },
      {
        files: ['*.ts', '*.tsx'],
        rules: {},
      },
      {
        files: ['*.js', '*.jsx'],
        rules: {},
      },
    ],
  };
  return JSON.stringify(contents, null, 2);
};
