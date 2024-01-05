import { resolve, join } from 'path';

function getRepoRoot() {
  if (__dirname.includes('snapshot')) {
    return process.cwd();
  }
  return resolve(__dirname, '../../../../');
}

export const REPO_ROOT = getRepoRoot();

// TODO: This might need to be read from the root `package.json` but for now allowing the repo to be named differently
export const NPM_SCOPE = '@ag-oss';
// Note: the location of "packages" and "apps" is also defined in `nx.json`
// TODO: read this from `nx.json` until repo has no dependency on Nx
export const PACKAGES_PATH = 'packages';
export const PRODUCTS_PATH = 'apps'; // TODO change this to products
export const DIST_PATH = 'dist';
export const PACKAGE_ROOT = join(REPO_ROOT, PACKAGES_PATH);
export const PRODUCTS_ROOT = join(REPO_ROOT, PRODUCTS_PATH);
export const DIST_ROOT = join(REPO_ROOT, DIST_PATH);
export const TSCONFIG_BASE_NAME = 'tsconfig.base.json';
export const BASE_TS_CONFIG_PATH = join(REPO_ROOT, TSCONFIG_BASE_NAME);
