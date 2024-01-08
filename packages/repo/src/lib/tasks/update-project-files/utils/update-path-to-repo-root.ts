import { sep as pathSeparator } from 'path';
import { ProjectConfig } from '../../../types';

function buildRelativePathMatcher() {
  const pattern = `(?:\\.\\.${pathSeparator})+`;
  return new RegExp(pattern, 'gm');
}

export function updatePathToRepoRoot(fileContents: string, options: ProjectConfig) {
  const { relativePathToRepoRoot } = options;
  const matcher = buildRelativePathMatcher();
  const separator =
    relativePathToRepoRoot[relativePathToRepoRoot.length] === pathSeparator
      ? ''
      : pathSeparator;
  return fileContents?.replace(matcher, `${relativePathToRepoRoot}${separator}`);
}
