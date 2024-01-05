import { getProjectParentPath } from '../get-project-parent-path';
import { ProjectType } from '../../types';

describe('getProjectParentPath', () => {
  it.each([
    ['application', 'products'],
    ['library', 'packages'],
  ])('should return the correct path for project type %s', (projectType, expected) => {
    const repoConfig = {
      appsPath: 'products',
      packagesPath: 'packages',
    } as never;
    const result = getProjectParentPath(repoConfig, projectType as ProjectType);
    expect(result).toEqual(expected);
  });
});
