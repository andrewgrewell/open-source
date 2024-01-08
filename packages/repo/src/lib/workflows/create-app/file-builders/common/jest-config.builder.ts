import { ProjectFileBuilder } from '../../../../types';

export const jestConfigBuilder: ProjectFileBuilder = (config) => {
  const { projectName, relativePathToRepoRoot, pathInRepo } = config;
  return `
/* eslint-disable */
export default {
  displayName: '${projectName}',
  preset: '${relativePathToRepoRoot}/jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '${relativePathToRepoRoot}/coverage/${pathInRepo}',
};
`;
};
