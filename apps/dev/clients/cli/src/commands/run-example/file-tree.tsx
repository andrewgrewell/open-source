import { getFileTree } from '@ag-oss/fs';
import { resolve } from 'path';
import { REPO_ROOT } from '../../constants';

export const command = 'file-tree';
export const desc = 'Interactive file tree example';
export const builder = {};

export const handler = async () => {
  const examplesPath = 'apps/dev/clients/cli/src/commands';
  const root = resolve(REPO_ROOT, examplesPath);
  const fileTree = await getFileTree(root, { maxDepth: 1 });
  if (!fileTree) throw new Error('Invalid file tree');
  console.log(`File tree for dir "${examplesPath}" with maxDepth of 1:`);
  console.log(JSON.stringify(fileTree, null, 2));
};
