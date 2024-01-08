import { AppClientType, AppServiceType, AppType, ProjectConfig } from '../../types';
import { createWorkflow, Workflow } from '@ag-oss/workflows-js';
import { fileBuilderTask } from '@ag-oss/workflows-node';
import { getFileBuilderMap } from './file-builders';

export interface CreateAppOptions extends ProjectConfig {
  appType: AppType;
  appClientType?: AppClientType;
  appServiceType?: AppServiceType;
}

export function createApp(options: CreateAppOptions): Workflow<CreateAppOptions> {
  const { fullProjectPath } = options;

  const fileBuilderMap = getFileBuilderMap(options);

  // If the app type is a desktop client
  return createWorkflow({
    name: `Create app`,
    runOptions: options,
    tasks: [
      fileBuilderTask<CreateAppOptions>({
        basePath: fullProjectPath,
        builderData: options,
        builderMap: fileBuilderMap,
        taskName: 'Create boilerplate files',
      }),
    ],
  });
}
