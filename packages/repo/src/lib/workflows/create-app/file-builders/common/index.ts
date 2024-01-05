import { ProjectFileBuilderMap } from '../../../../types';
import { eslintrcBuilder } from './eslintrc.builder';
import { readmeBuilder } from './readme.builder';
import { jestConfigBuilder } from './jest-config.builder';
import { projectJsonBuilder } from './project-json.builder';
import { tsconfigBuilder } from './tsconfig.builder';
import { tsconfigSpecBuilder } from './tsconfig-spec.builder';

export const commonFileBuilders: ProjectFileBuilderMap = {
  '.eslintrc.json': eslintrcBuilder,
  'README.md': readmeBuilder,
  'jest.config.ts': jestConfigBuilder,
  'project.json': projectJsonBuilder,
  'tsconfig.json': tsconfigBuilder,
  'tsconfig.spec.json': tsconfigSpecBuilder,
};
