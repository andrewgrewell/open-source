import { createMockReaddirResult } from './create-mock-readdir-result';
import { getValueAtPath } from '@ag-oss/objects';

export interface CreateMockFileTreeOptions {
  fileTree?: {
    [path: string]: string | Record<string, unknown>;
  };
}

export const DEFAULT_ROOT_NAME = 'root-path';
export const DEFAULT_ROOT_PATH = `test/${DEFAULT_ROOT_NAME}`;

export const DEFAULT_FILE_TREE = {
  outsideScope: {
    'outside-scope.txt': '',
  },
  test: {
    [DEFAULT_ROOT_NAME]: {
      '.hidden-file': '',
      dir1: {
        dir2: {
          'file5.md': '',
        },
        'file3.md': '',
        'file4.md': '',
      },
      'file1.md': '',
      'file2.md': '',
    },
    'some/other/path': {
      'file1.md': '',
      'file2.md': '',
    },
  },
};

export function createMockReaddirImpl(options: CreateMockFileTreeOptions = {}) {
  const { fileTree = DEFAULT_FILE_TREE } = options;

  return (path: string) => {
    const treeValue = getValueAtPath(fileTree, path, '/');
    if (!treeValue || typeof treeValue === 'string') {
      return [];
    }
    return createMockReaddirResult({
      files: Object.entries(treeValue).map(([name, value]) => [
        name,
        typeof value === 'object',
      ]),
    });
  };
}
