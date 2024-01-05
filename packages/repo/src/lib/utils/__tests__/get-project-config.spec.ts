import { getProjectConfig } from '../get-project-config';
import { getRepoConfig } from '../get-repo-config';
import { join } from 'path';
import { ExecutionContext } from '../../types';

jest.mock('../get-repo-config.ts', () => {
  return {
    getRepoConfig: jest.fn(() => ({
      appsPath: 'products',
      distPath: 'dist',
      npmScope: '@npm-scope',
      packagesPath: 'packages',
      repoPath: '/test/path/to/repo-name',
    })),
  };
});

const mockGetRepoConfig = getRepoConfig as jest.Mock;

describe('getProjectWorkflowOptions', () => {
  it('should return the correct options', async () => {
    const mockRepoConfig = {
      appsPath: 'products',
      distPath: 'dist',
      npmScope: '@npm-scope',
      packagesPath: 'packages',
      repoPath: '/test/path/to/repo-name',
    };
    mockGetRepoConfig.mockImplementationOnce(() => mockRepoConfig);
    const fullProjectPath = join(
      mockRepoConfig.repoPath,
      mockRepoConfig.packagesPath,
      'test',
      'test-project',
    );
    const options = getProjectConfig({
      executionContext: ExecutionContext.JS,
      fullProjectPath,
      projectJson: {
        name: 'test-project',
        projectType: 'library',
      },
    });
    expect(options).toMatchInlineSnapshot(`
      {
        "distPath": "dist",
        "executionContext": "js",
        "fullProjectPath": "/test/path/to/repo-name/packages/test/test-project",
        "name": "test-project",
        "npmScope": "@npm-scope",
        "packagesPath": "packages",
        "pathInRepo": "packages/test/test-project",
        "appsPath": "products",
        "projectName": "test-project",
        "projectPath": "test/test-project",
        "projectType": "library",
        "relativePathToRepoRoot": "../../..",
        "repoPath": "/test/path/to/repo-name",
        "tags": [],
      }
    `);
  });
});
