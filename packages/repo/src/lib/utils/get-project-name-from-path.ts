import { basename } from 'path';

export function getProjectNameFromPath(projectPath: string) {
  // Decided against using full path to determine project name for the time being.
  // const { packagesPath, appsPath } = repoConfig;
  // const regex = new RegExp(`(?:${packagesPath}|${appsPath})/(.+)`);
  // const matches = regex.exec(projectPath);
  // if (!matches || matches.length < 2) {
  //   throw new Error(`Could not find project name in path: ${projectPath}`);
  // }
  // return matches[1].split(sep).join('-');
  return basename(projectPath);
}
