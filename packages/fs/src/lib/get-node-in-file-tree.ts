import { FileNode } from './fs-util.types';

function findNode(node: FileNode, path: string): FileNode | undefined {
  if (node.path === path) {
    return node;
  }
  if (node.children) {
    for (const child of node.children) {
      const found = findNode(child, path);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
}

export function getNodeInFileTree(tree: FileNode, path: string): FileNode | undefined {
  return findNode(tree, path);
}
