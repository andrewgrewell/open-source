import type { FileNode } from './fs-util.types';

export function createFileTreeMap(fileTree: FileNode) {
  const map: Record<string, FileNode> = {};
  const traverse = (node: FileNode) => {
    map[node.path] = node;
    if (node.children) {
      node.children.forEach((child) => {
        traverse(child);
      });
    }
  };
  traverse(fileTree);
  return map;
}
