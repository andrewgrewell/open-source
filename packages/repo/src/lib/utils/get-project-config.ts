import { getRepoConfig } from './get-repo-config';
import { ExecutionContext, ProjectConfig, ProjectJson } from '../types';
import { basename, relative } from 'path';
import { getProjectParentPath } from './get-project-parent-path';

export interface GetProjectConfigOptions {
  fullProjectPath: string;
  executionContext?: ExecutionContext;
  projectJson?: ProjectJson;
}

export function getProjectConfig(options: GetProjectConfigOptions): ProjectConfig {
  const { executionContext, fullProjectPath, projectJson } = options;
  const { projectType, tags = [], name } = projectJson || {};
  const repoConfig = getRepoConfig();
  const { repoPath } = repoConfig;
  const projectParentPath = getProjectParentPath(repoConfig, projectType);

  return {
    executionContext,
    fullProjectPath,
    pathInRepo: relative(repoPath, fullProjectPath),
    projectName: name || basename(fullProjectPath),
    projectPath: fullProjectPath
      .replace(`${repoPath}/`, '')
      .replace(`${projectParentPath}/`, ''),
    projectType,
    relativePathToRepoRoot: relative(fullProjectPath, repoPath),
    tags,
    ...repoConfig,
  };
}
