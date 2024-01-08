export interface UpdateProjectNameOptions {
  previousProjectName: string;
  projectName: string;
}

export function updateProjectName(
  fileContents: string,
  options: UpdateProjectNameOptions,
) {
  const { projectName, previousProjectName } = options;
  return fileContents?.replace(previousProjectName, projectName);
}
