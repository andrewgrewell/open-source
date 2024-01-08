import { ExecutionContext, ProjectFileBuilder } from '../../../types';

export const tsconfigLibBuilder: ProjectFileBuilder = (config) => {
  const { relativePathToRepoRoot, executionContext } = config;
  return {
    compilerOptions: {
      declaration: true,
      outDir: `${relativePathToRepoRoot}/dist/out-tsc`,
      types: getTypesForExecutionContext(executionContext),
    },
    exclude: ['jest.config.ts', 'src/**/*.spec.ts', 'src/**/*.test.ts'],
    extends: './tsconfig.json',
    include: ['src/**/*.ts'],
  };
};

function getTypesForExecutionContext(ec: ExecutionContext) {
  switch (ec) {
    case ExecutionContext.JS:
      return [];
    case ExecutionContext.NODE:
      return ['node'];
    case ExecutionContext.BROWSER:
      return ['dom'];
    default:
      return [];
  }
}
