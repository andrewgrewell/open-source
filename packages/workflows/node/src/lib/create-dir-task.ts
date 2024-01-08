import { createTask } from '@ag-oss/workflows-js';
import { existsAsync, mkdirAsync } from '@ag-oss/fs';
import { join } from 'path';

export interface CreateDirTaskOptions {
  taskName: string;
  dirName: string;
  path: string;
  dryRun?: boolean;
}

export function createDirTask(options: CreateDirTaskOptions) {
  const { taskName, dirName, path } = options;
  return createTask({
    name: taskName,
    runner: async () => {
      // TODO use FileTree to support dry run
      const fullPath = join(path, dirName);
      const exists = await existsAsync(fullPath);
      if (exists) {
        // TODO we might want to support failing if the directory already exists
        return `Directory already exists at '${fullPath}'`;
      }
      await mkdirAsync(fullPath, { recursive: true });
      return `Directory created at '${fullPath}'`;
    },
  });
}
