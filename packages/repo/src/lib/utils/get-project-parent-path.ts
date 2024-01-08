import { ProjectType, RepoConfig } from '../types';

export function getProjectParentPath(repoConfig: RepoConfig, projectType: ProjectType) {
  const { packagesPath, appsPath } = repoConfig;
  return projectType === 'library' ? packagesPath : appsPath;
}
