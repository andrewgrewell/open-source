import { createWorkflow, Workflow } from '@ag-oss/workflows-js';
import { fileMoverTask } from '@ag-oss/workflows-node';
import { join } from 'path';
import { ProjectConfig } from '../../types';
import {
  getProjectConfig,
  getProjectNameFromPath,
  getProjectParentPath,
} from '../../utils';
import { updateProjectFiles, updateTsPaths } from '../../tasks';
import { TSCONFIG_BASE_NAME } from '../../constants';

export interface MoveProjectOptions extends ProjectConfig {
  toPath: string;
}

export function moveProject(options: MoveProjectOptions): Workflow {
  const projectParentPath = getProjectParentPath(options, options.projectType);
  const fromPath = join(options.repoPath, projectParentPath, options.projectPath);
  return createWorkflow({
    name: `Move '${options.projectPath}' to '${options.toPath}'`,
    runOptions: options,
    tasks: [
      fileMoverTask({
        fromPath,
        taskName: `Move files`,
        toPath: options.toPath,
      }),
      updateProjectFiles(
        getProjectConfig({
          executionContext: options.executionContext,
          fullProjectPath: options.toPath,
          projectJson: {
            name: getProjectNameFromPath(options.toPath),
            projectType: options.projectType,
            tags: options.tags,
          },
        }),
      ),
      updateTsPaths({
        ...options,
        tsConfigPath: join(options.repoPath, TSCONFIG_BASE_NAME),
      }),
    ],
  });
}
