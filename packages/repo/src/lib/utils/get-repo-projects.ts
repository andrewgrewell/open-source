import { getFileTree } from '@ag-oss/fs';
import { readJsonAsync } from '@ag-oss/fs';
import { ExecutionContext, ProjectConfig } from '../types';
import { getProjectConfig } from './get-project-config';

export interface GetRepoProjectsOptions {
  excludeApps?: boolean;
  excludePackages?: boolean;
}
export async function getRepoProjects(
  repoPath: string,
  options: GetRepoProjectsOptions = {},
) {
  const projectConfigs: ProjectConfig[] = [];
  await getFileTree(repoPath, {
    exclude: [/node_modules|dist|coverage|reports|tmp|docs|__mocks__/],
    fileVisitor: async (file, { depth }) => {
      if (depth === 0) {
        // No use case for the root project at this time
        return;
      }
      if (file.name === 'project.json') {
        const projectJson = await readJsonAsync(file.path);
        const executionContext = projectJson.tags?.find((t) =>
          Object.values(ExecutionContext).includes(t),
        );
        const fullProjectPath = file.path.replace(`/${file.name}`, '');
        const projectConfig = getProjectConfig({
          executionContext,
          fullProjectPath,
          projectJson,
        });
        if (
          (projectConfig.projectType === 'application' && options.excludeApps) ||
          (projectConfig.projectType === 'library' && options.excludePackages)
        ) {
          return;
        }
        projectConfigs.push(projectConfig);
      }
    },
  });
  return projectConfigs;
}
