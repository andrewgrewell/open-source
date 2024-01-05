import { ProjectConfig } from '../../types';
import { TsConfigJson } from '../../file.types';
import { modifyJsonFileTask } from '@ag-oss/workflows-node';

export interface UpdateTsPathsOptions extends ProjectConfig {
  /**
   * The path to the tsconfig.json file
   */
  tsConfigPath: string;
}

export function updateTsPaths(options: UpdateTsPathsOptions) {
  const { tsConfigPath, pathInRepo, npmScope, projectName } = options;
  const packageImportPath = `${npmScope}/${projectName}`;
  const packageSrcRoot = `${pathInRepo}/src/index.ts`;
  return modifyJsonFileTask<TsConfigJson>({
    filePath: tsConfigPath,
    modifyJson: (json) => {
      json.compilerOptions.paths[packageImportPath] = [packageSrcRoot];
      return json;
    },
    taskName: `Update tsconfig compilerOptions.paths`,
  });
}
