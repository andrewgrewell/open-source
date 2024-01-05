import { BehaviorSubject, from, map, merge, withLatestFrom } from 'rxjs';
import {
  CreateFileBrowserServiceOptions,
  FileBrowserService,
  FileNode,
} from './fs-util.types';
import { createFileTreeMap } from './create-file-tree-map';
import { getFileTree } from './get-file-tree';
import { createRxAction } from '@ag-oss/rxjs';

export function createFileBrowserService(
  options: CreateFileBrowserServiceOptions,
): FileBrowserService {
  const { rootPath, initialPath, treeOptions } = options;
  const treeSubject = new BehaviorSubject<FileNode | null>(null);
  const treeMapStream = merge(from(getFileTree(rootPath, treeOptions)), treeSubject).pipe(
    map((tree) => {
      if (!tree) {
        return {};
      }
      return createFileTreeMap(tree);
    }),
  );
  const goToAction = createRxAction<string, FileNode | undefined>({
    outputModifier: (input) => {
      return input.pipe(
        withLatestFrom(treeMapStream),
        map(([path, treeMap]) => {
          return treeMap[path];
        }),
      );
    },
  });
  return {
    activeFileNode: merge(
      treeMapStream.pipe(
        map((treeMap) => {
          return treeMap[initialPath || rootPath];
        }),
      ),
      goToAction.output,
    ),
    goTo: (path: string) => goToAction.trigger.next(path),
  };
}
