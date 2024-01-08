import { CreateFileBrowserServiceOptions, FileBrowserService } from './fs-util.types';
import { getFileTree } from './get-file-tree';
import { createFileTreeBrowser } from './create-file-tree-browser';
import { catchError, from, of, switchMap } from 'rxjs';
import { nextValueCallback } from '@ag-oss/rxjs';

async function observeTreeBrowser(options: CreateFileBrowserServiceOptions) {
  const { rootPath, initialPath, treeOptions } = options;
  const tree = await getFileTree(rootPath, treeOptions);
  if (!tree) {
    throw new Error(`Could not find root path: ${rootPath}`);
  }
  return createFileTreeBrowser({ fileTree: tree, initialPath });
}

/**
 * Returns a Service which can be used to navigate a file tree starting at options.rootPath
 * @param options
 */
export function createFileBrowserService(
  options: CreateFileBrowserServiceOptions,
): FileBrowserService {
  const browser = from(observeTreeBrowser(options));
  return {
    cwd: browser.pipe(switchMap((browser) => browser.cwd)),
    error: browser.pipe(catchError((error) => of(error))),
    goTo: (path: string) => {
      nextValueCallback(browser, (browser) => browser.goTo(path));
    },
    goUp: () => {
      nextValueCallback(browser, (browser) => browser.goUp());
    },
  };
}
