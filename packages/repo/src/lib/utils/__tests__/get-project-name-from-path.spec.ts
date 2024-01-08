import { getProjectNameFromPath } from '../get-project-name-from-path';

describe('getProjectNameFromPath', () => {
  it.each([
    ['path/to/repo/packages/test-package', 'test-package'],
    ['path/to/repo/packages/domain1/test-package', 'test-package'],
    ['path/to/repo/packages/domain1/domain2/test-package', 'test-package'],
  ])('should return the project name from path %s', (path, expected) => {
    const projectName = getProjectNameFromPath(path);
    expect(projectName).toEqual(expected);
  });
});
