import { FileNode } from './fs-util.types';

export function getNodeInFileTree(tree: FileNode, path: string) {
  let targetNode: FileNode | undefined;
  const traverse = (node: FileNode) => {
    if (node.path === path) {
      targetNode = node;
    } else if (node.children) {
      node.children.forEach((child) => {
        traverse(child);
      });
    }
  };
  traverse(tree);
  return targetNode;
}
