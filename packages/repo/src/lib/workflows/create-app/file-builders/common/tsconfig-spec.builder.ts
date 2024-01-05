import { ProjectFileBuilder } from '../../../../types';

export const tsconfigSpecBuilder: ProjectFileBuilder = (config) => {
  const { relativePathToRepoRoot } = config;
  return {
    compilerOptions: {
      module: 'commonjs',
      outDir: `${relativePathToRepoRoot}/dist/out-tsc`,
      types: ['jest', 'node'], // TODO: jest is required, but other types should be based off package type
    },
    extends: './tsconfig.json',
    include: ['jest.config.ts', 'src/**/*.test.ts', 'src/**/*.spec.ts', 'src/**/*.d.ts'],
  };
};
