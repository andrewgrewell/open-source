import { createWorkflow, Workflow } from '@ag-oss/workflows-js';
import { fileBuilderTask } from '@ag-oss/workflows-node';
import { join } from 'path';
import { getFileBuilderMap } from './file-builders';
import { TSCONFIG_BASE_NAME } from '../../constants';
import { ProjectConfig } from '../../types';
import { updateTsPaths } from '../../tasks';
import { verboseLogger } from '@ag-oss/logging';

export type CreatePackageOptions = ProjectConfig;

export function createPackage(
  options: CreatePackageOptions,
): Workflow<CreatePackageOptions> {
  const { projectPath, fullProjectPath } = options;

  const fileBuilderMap = getFileBuilderMap(options);
  verboseLogger.verbose('Using file builder map:', fileBuilderMap);

  return createWorkflow({
    name: `Create package '${projectPath}' at path '${fullProjectPath}'`,
    runOptions: options,
    tasks: [
      fileBuilderTask({
        basePath: fullProjectPath,
        builderData: options,
        builderMap: fileBuilderMap,
        taskName: 'Create boilerplate files',
      }),
      updateTsPaths({
        ...options,
        tsConfigPath: join(options.repoPath, TSCONFIG_BASE_NAME),
      }),
    ],
  }) as unknown as Workflow<CreatePackageOptions>;
}
