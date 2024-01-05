import { updateProjectPath } from '../update-project-path';

const repoPath = `path/to/repo-root`;
const distPath = `dist`;
const packagesPath = `path/to/libs`;
const appsPath = 'products';
const projectName = 'project1';

describe('updateRootPaths', () => {
  it.each([
    [
      `"someKey": "${packagesPath}/old/path/${projectName}/src/file.ts"`,
      { projectPath: projectName },
      `"someKey": "${packagesPath}/${projectName}/src/file.ts"`,
    ],
    [
      `key: "${distPath}/${packagesPath}/${projectName}/**/*.ts"`,
      { projectPath: `new/path/to/${projectName}` },
      `key: "${distPath}/${packagesPath}/new/path/to/${projectName}/**/*.ts"`,
    ],
    [
      `outputPath: "${distPath}/${packagesPath}/scope/${projectName}"`,
      { projectPath: `${projectName}` },
      `outputPath: "${distPath}/${packagesPath}/${projectName}"`,
    ],
  ])(`should replace %s`, async (content, options, expected) => {
    const updatedContent = updateProjectPath(content, {
      appsPath,
      distPath,
      packagesPath,
      projectName,
      repoPath,
      ...options,
    } as never);
    expect(updatedContent).toBe(expected);
  });
});
