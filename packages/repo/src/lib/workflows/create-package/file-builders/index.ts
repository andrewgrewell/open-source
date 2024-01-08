import { readmeBuilder } from './readme.builder';
import { eslintrcBuilder } from './eslintrc.builder';
import { jestConfigBuilder } from './jest-config.builder';
import { packageJsonBuilder } from './package-json.builder';
import { tsconfigBuilder } from './tsconfig.builder';
import { tsconfigLibBuilder } from './tsconfig-lib.builder';
import { tsconfigSpecBuilder } from './tsconfig-spec.builder';
import { projectJsonBuilder } from './project-json.builder';
import { ExecutionContext, ProjectFileBuilderMap } from '../../../types';
import { CreatePackageOptions } from '../create-package';

export const commonFileBuilders: ProjectFileBuilderMap = {
  '.eslintrc.json': eslintrcBuilder,
  'README.md': readmeBuilder,
  'jest.config.ts': jestConfigBuilder,
  'package.json': packageJsonBuilder,
  'project.json': projectJsonBuilder,
  'src/index.ts': () => `export * from './lib/constants';`,
  'src/lib/constants.ts': ({ tags }) => {
    return `export const packageTags = [${tags?.map((t) => `'${t}'`).join(', ') || ''}];`;
  },
  'tsconfig.json': tsconfigBuilder,
  'tsconfig.lib.json': tsconfigLibBuilder,
  'tsconfig.spec.json': tsconfigSpecBuilder,
};

export const executionContextFileBuilders = {
  [ExecutionContext.JS]: commonFileBuilders,
  [ExecutionContext.NODE]: commonFileBuilders,
  [ExecutionContext.REACT_NATIVE]: commonFileBuilders,
  [ExecutionContext.BROWSER]: commonFileBuilders,
  [ExecutionContext.ELECTRON]: commonFileBuilders,
};

export function getFileBuilderMap(options: CreatePackageOptions): ProjectFileBuilderMap {
  const { executionContext } = options;
  const builders = executionContextFileBuilders[executionContext];

  if (!builders) {
    throw new Error(`No file builders found for execution context ${executionContext}`);
  }

  return builders;
}
