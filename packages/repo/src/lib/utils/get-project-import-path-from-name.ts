import { removeLeadingChar } from '@ag-oss/strings';

export function getProjectImportPathFromName(fullName: string, npmScope: string) {
  const scopeName = removeLeadingChar(npmScope, '@');
  let projectName = fullName;
  if (fullName.startsWith(`${scopeName}-`)) {
    projectName = projectName.replace(`${scopeName}-`, '');
  }
  return `${npmScope}/${projectName}`;
}
