import { createTask } from '@ag-oss/workflows-js';
import { moveDirectory } from '@ag-oss/fs';

export interface FileMoverTaskOptions {
  taskName: string;
  fromPath: string;
  toPath: string;
}

export function fileMoverTask(options: FileMoverTaskOptions) {
  return createTask({
    name: options.taskName,
    runner: async () => {
      const { fromPath, toPath } = options;
      try {
        await moveDirectory(fromPath, toPath);
      } catch (e) {
        console.error(`Error moving files from '${fromPath}' to '${toPath}'`);
        throw e;
      }
      return `Files moved from '${options.fromPath}' to '${options.toPath}'`;
    },
  });
}
