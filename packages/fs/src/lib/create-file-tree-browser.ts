import { FileNode } from './fs-util.types';
import { BehaviorSubject } from 'rxjs';

export interface CreateFileTreeBrowserOptions {
  fileTree: FileNode;
}
export function createFileTreeBrowser(options: CreateFileTreeBrowserOptions) {
  const { fileTree } = options;
  const cwdSubject = new BehaviorSubject<FileNode>(fileTree);
  return {
    cwd: cwdSubject.asObservable(),
  };
}
