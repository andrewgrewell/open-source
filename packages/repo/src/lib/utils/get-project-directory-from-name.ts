import { join } from 'path';
import { removeLeadingChar } from '@ag-oss/strings';

export function getProjectDirectoryFromName(fullName: string, scope = '', context = '') {
  const scopeName = removeLeadingChar(scope, '@');
  let projectName = fullName;
  let contextDirectory = ''; // only create a directory for context if it is in the project name
  if (fullName.startsWith(`${scopeName}-`)) {
    projectName = projectName.replace(`${scopeName}-`, '');
  }
  if (fullName.endsWith(`-${context}`)) {
    projectName = projectName.replace(`-${context}`, '');
    contextDirectory = context;
  }
  const pathParts = [scope, projectName, contextDirectory].filter((part) => !!part);
  return join(...pathParts);
}
