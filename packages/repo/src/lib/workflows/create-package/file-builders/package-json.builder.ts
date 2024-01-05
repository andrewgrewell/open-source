import { ProjectFileBuilder } from '../../../types';

export const packageJsonBuilder: ProjectFileBuilder = (config) => {
  const { npmScope, projectName } = config;
  return {
    name: `${npmScope}/${projectName}`,
    sideEffects: false,
    type: 'commonjs',
    version: '0.0.1',
  };
};
