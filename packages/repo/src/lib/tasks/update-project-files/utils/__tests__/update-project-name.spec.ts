import { updateProjectName } from '../update-project-name';

describe('updateProjectName', () => {
  it('should replace the project name in the file contents', () => {
    const previousProjectName = 'previous-project-name';
    const projectName = 'test-project';
    const getFileContents = (name: string) => `"name": "${name}",\n`;
    const updatedContents = updateProjectName(getFileContents(previousProjectName), {
      previousProjectName,
      projectName,
    });
    expect(updatedContents).toEqual(getFileContents(projectName));
  });
});
