import { FileNode } from '../lib/fs-util.types';

export type FilesDefinition = string | FilesDefinition[];

export interface CreateMockFileTreeOptions {
  /**
   * If provided takes priority over other creation parameters,
   * and will create a file for strings, and directories for arrays.
   */
  files?: FilesDefinition[];
}

export const defaultFiles = ['file1', ['file2', ['file3']]];

/**
 * Creates a mock file tree for testing purposes.
 * @param options
 */
export function createMockFileTree(options?: CreateMockFileTreeOptions): FileNode {
  return {
    children: populateChildrenFromFiles(options?.files || defaultFiles, '/root'),
    name: 'root',
    path: '/root',
    type: 'directory' as const,
  };
}

function populateChildrenFromFiles(
  files: FilesDefinition[],
  parentPath = '',
  dirCount = 0,
): FileNode[] {
  return files.map((file) => {
    if (typeof file === 'string') {
      return {
        children: [],
        name: file,
        parentPath,
        path: `${parentPath}/${file}`,
        type: 'file' as const,
      } as FileNode;
    } else {
      dirCount += 1;
      const name = `dir-${dirCount}`;
      const path = `${parentPath}/${name}`;
      return {
        children: populateChildrenFromFiles(file, path, dirCount),
        name,
        parentPath,
        path,
        type: 'directory' as const,
      };
    }
  });
}
