import { getRepoConfig } from '../get-repo-config';

jest.mock('../../constants.ts', () => {
  return {
    ...jest.requireActual('../../constants.ts'),
    REPO_ROOT: '/test/path/to/repo-name',
  };
});

describe('getRepoConfig', () => {
  it('should return the repo config', async () => {
    const repoConfig = getRepoConfig();
    expect(repoConfig).toMatchInlineSnapshot(`
      {
        "distPath": "dist",
        "npmScope": "@ag-oss",
        "packagesPath": "packages",
        "appsPath": "apps",
        "repoPath": "/test/path/to/repo-name",
      }
    `);
  });
});
