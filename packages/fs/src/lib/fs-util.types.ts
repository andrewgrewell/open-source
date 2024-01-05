import { Observable } from 'rxjs';

export interface GetFileTreeOptions {
  /**
   * List of regex patterns to exclude. matches name of file.
   */
  exclude?: RegExp[];
  /**
   * List of regex patterns to include. matches name of file.
   */
  include?: RegExp[];
  /**
   * If true, hidden files and directories will be included
   */
  includeHidden?: boolean;
  /**
   * If true, will explicitly exclude directories, unless directory is in include list.
   */
  excludeDirectories?: boolean;
  /**
   * If true, will explicitly exclude files, unless in include list.
   */
  excludeFiles?: boolean;
  /**
   * The max depth to recurse. 0 is the root directory, 1 is the root directory's children, etc.
   */
  maxDepth?: number;
  /**
   * A function that will be called for each file node.
   */
  fileVisitor?: FileVisitor;
}

export type FileVisitor = (
  node: FileNode,
  details: { depth: number },
) => Promise<void | boolean> | void | boolean;

export interface FileNode {
  name: string;
  path: string;
  children: FileNode[];
  parentPath?: string;
  type: 'directory' | 'file';
}

export interface CreateFileBrowserServiceOptions {
  treeOptions?: GetFileTreeOptions;
  rootPath: string;
  initialPath?: string;
}

export interface FileBrowserService {
  activeFileNode: Observable<FileNode | undefined>;
  goTo: (path: string) => void;
}
