import { FileNode } from './fs-util.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { createFileTreeMap } from './create-file-tree-map';
import { addLeadingChar, removeTrailingChar } from '@ag-oss/strings';

export interface CreateFileTreeBrowserOptions {
  fileTree: FileNode;
  initialPath?: string;
}

export interface FileTreeBrowser {
  cwd: Observable<FileNode>;
  goTo: (path: string) => FileNode | false;
  goUp: () => FileNode | false;
}

export function createFileTreeBrowser(
  options: CreateFileTreeBrowserOptions,
): FileTreeBrowser {
  const { fileTree } = options;
  const treeMap = createFileTreeMap(fileTree);
  const cwdSubject = new BehaviorSubject<FileNode>(
    treeMap[formatPath(options.initialPath || fileTree.path)],
  );
  const goUp = () => {
    const node = cwdSubject.value;
    if (node.parentPath) {
      cwdSubject.next(treeMap[node.parentPath]);
      return node;
    }
    return false;
  };
  const goTo = (path: string) => {
    let node = treeMap[formatPath(path)];
    if (node?.type === 'file') {
      node = treeMap[node.parentPath!]; // a file will always have a parent
    }
    if (node) {
      cwdSubject.next(node);
      return node;
    }
    return false;
  };
  return {
    cwd: cwdSubject.asObservable(),
    goTo,
    goUp,
  };
}

function formatPath(path: string) {
  return removeTrailingChar(addLeadingChar(path, '/'), '/');
}
