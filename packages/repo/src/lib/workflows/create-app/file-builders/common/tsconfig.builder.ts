import { ProjectFileBuilder } from '../../../../types';

export const tsconfigBuilder: ProjectFileBuilder = (config) => {
  const { relativePathToRepoRoot } = config;
  // TODO create getRootTscCompilerOptions() which is aware of package types and execution context
  return {
    compilerOptions: {
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      jsx: 'react-jsx',
      module: 'commonjs',
      moduleResolution: 'node',
      noFallthroughCasesInSwitch: true,
      noImplicitOverride: true,
      noImplicitReturns: true,
      noPropertyAccessFromIndexSignature: true,
      strict: true,
      target: 'ES2015',
    },
    extends: `${relativePathToRepoRoot}/tsconfig.base.json`,
    files: [],
    include: [],
    references: [
      {
        path: './tsconfig.lib.json',
      },
      {
        path: './tsconfig.spec.json',
      },
    ],
  };
};
