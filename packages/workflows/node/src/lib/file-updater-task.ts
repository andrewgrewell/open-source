import { createTask } from '@ag-oss/workflows-js';
import { readFileAsync, writeFileAsync } from '@ag-oss/fs';
import { join } from 'path';

export type FileUpdater = (fileContents: string) => string;

export type FileUpdaterMap = Record<string, FileUpdater>;

export interface FileUpdaterTaskOptions {
  taskName: string;
  basePath: string;
  updaterMap: FileUpdaterMap;
}

export function fileUpdaterTask(options: FileUpdaterTaskOptions) {
  return createTask({
    name: options.taskName,
    runner: async (_, sendUpdate) => {
      const { basePath, updaterMap } = options;
      const updateTuple = Object.entries(updaterMap);
      const totalFiles = updateTuple.length;
      for (let i = 0; i < totalFiles; i++) {
        const [filePath, updater] = updateTuple[i];
        const progress = (i + 1) / totalFiles;
        const fullFilePath = join(basePath, filePath);
        const fileContents = await readFileAsync(fullFilePath, { encoding: 'utf-8' });
        try {
          const update = updater(fileContents);
          await writeFileAsync(fullFilePath, update, { encoding: 'utf-8' });
        } catch (e) {
          console.error(`Error updating file '${filePath}'`);
          throw e;
        }
        sendUpdate({ completePercent: progress, message: `Updated ${filePath}` });
      }

      return `Updated ${totalFiles} files`;
    },
  });
}
