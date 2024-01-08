import { readDirAsync } from './read-dir-async';
import { reduceAsync } from '@ag-oss/loops';
import * as path from 'path';
import { join } from 'path';
import { FileNode, GetFileTreeOptions } from './fs-util.types';

export async function getFileTree(rootPath: string, options: GetFileTreeOptions = {}) {
  return parseDirectory(rootPath, options, 0);
}

async function parseDirectory(
  currentPath: string,
  options: GetFileTreeOptions,
  depthCount: number,
): Promise<FileNode | undefined> {
  const {
    include: includeList,
    excludeDirectories,
    excludeFiles,
    fileVisitor,
    maxDepth,
  } = options;

  if (maxDepth != null && depthCount > Math.max(maxDepth, 0)) {
    return;
  }

  const parseSubDirectory = (itemPath: string) =>
    parseDirectory(itemPath, options, depthCount + 1);

  const contents = await readDirAsync(currentPath, { withFileTypes: true });

  return {
    children: await reduceAsync(
      contents,
      async (acc, item) => {
        const itemPath = join(currentPath, item.name);
        // region helper functions
        const addFile = async (children: FileNode[] = []) => {
          const node = {
            children,
            name: item.name,
            parentPath: currentPath,
            path: itemPath,
            type: item.isDirectory() ? 'directory' : 'file',
          } as const;
          const include = await fileVisitor?.(node, {
            depth: depthCount,
          });
          if (include === false) {
            return;
          }
          acc.push(node);
        };
        const addDirectory = async () => {
          const dirContents = await parseSubDirectory(itemPath);
          if (dirContents) {
            return addFile(dirContents.children);
          }
        };
        const addItem = async () => {
          if (item.isDirectory()) {
            return addDirectory();
          } else {
            return addFile();
          }
        };
        /* endregion helper functions */

        if (shouldExcludeHidden(item.name, options)) {
          return acc;
        }
        if (isExplicitlyExcluded(item.name, options)) {
          return acc;
        }
        const explicitlyIncluded = isExplicitlyIncluded(item.name, options);
        if (explicitlyIncluded) {
          await addItem();
        }
        if (item.isDirectory() && excludeDirectories) {
          return acc;
        }
        if (!item.isDirectory() && excludeFiles) {
          return acc;
        }
        if (!includeList?.length) {
          await addItem();
        }
        return acc;
      },
      [] as FileNode[],
    ),
    name: path.basename(currentPath),
    parentPath: path.dirname(currentPath),
    path: currentPath,
    type: 'directory',
  };
}

function shouldExcludeHidden(name: string, options: GetFileTreeOptions) {
  const isHidden = name.startsWith('.');
  return !options.includeHidden && isHidden;
}

function isExplicitlyExcluded(name: string, options: GetFileTreeOptions) {
  // TODO update this to take a glob pattern
  return !!options.exclude?.some((pattern) => pattern.test(name));
}

function isExplicitlyIncluded(name: string, options: GetFileTreeOptions) {
  // TODO update this to take a glob pattern
  return !!options.include?.some((pattern) => pattern.test(name));
}
