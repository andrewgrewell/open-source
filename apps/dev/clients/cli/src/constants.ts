import { join, basename } from 'path';

function getRepoRoot() {
  if (__dirname.includes('snapshot')) {
    return process.cwd();
  }
  return join(__dirname, '../../../../../../');
}

export const REPO_ROOT = getRepoRoot();
export const REPO_NAME = basename(REPO_ROOT);
