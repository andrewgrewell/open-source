import { sep as pathSeparator } from 'path';
import { ProjectConfig } from '../../../types';

function buildRootPathMatcher(options: ProjectConfig) {
  const { packagesPath, appsPath, distPath, projectName } = options;
  const pattern = `"(${distPath}/)?(${packagesPath}|${appsPath})/(?:(.+)${pathSeparator})?${projectName}(?:${pathSeparator}(.+))?"`;
  return new RegExp(pattern, 'gm');
}

export function updateProjectPath(fileContents: string, options: ProjectConfig) {
  const { projectPath } = options;
  const matcher = buildRootPathMatcher(options);
  return fileContents?.replace(matcher, (_, dist, root, oldProjectPath, remainder) => {
    const newPath = [root, projectPath].join(pathSeparator);
    return `"${dist ? dist : ''}${newPath}${
      remainder ? `${pathSeparator}${remainder}` : ''
    }"`;
  });
}
