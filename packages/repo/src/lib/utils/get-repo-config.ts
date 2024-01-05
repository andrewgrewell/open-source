import { RepoConfig } from '../types';
import {
  DIST_PATH,
  NPM_SCOPE,
  PACKAGES_PATH,
  PRODUCTS_PATH,
  REPO_ROOT,
} from '../constants';

export function getRepoConfig(): RepoConfig {
  return {
    appsPath: PRODUCTS_PATH,
    distPath: DIST_PATH,
    npmScope: NPM_SCOPE,
    packagesPath: PACKAGES_PATH,
    repoPath: REPO_ROOT,
  };
}
