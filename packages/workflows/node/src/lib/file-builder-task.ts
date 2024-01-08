import { createTask, FileBuilderMap } from '@ag-oss/workflows-js';
import { existsAsync, mkdirAsync, writeFileAsync } from '@ag-oss/fs';
import { join, sep as pathSeparator } from 'path';

export interface FileBuilderTaskOptions<TBuilderConfig = Record<PropertyKey, unknown>> {
  taskName: string;
  basePath: string;
  builderMap: FileBuilderMap<TBuilderConfig>;
  builderData: TBuilderConfig;
}

export function fileBuilderTask<TBuilderConfig = Record<any, unknown>>(
  options: FileBuilderTaskOptions<TBuilderConfig>,
) {
  return createTask({
    name: options.taskName,
    runner: async ({ sendUpdate }) => {
      const { basePath, builderMap, builderData } = options;

      // ensure the base path exists
      const exists = await existsAsync(basePath);
      if (!exists) {
        await mkdirAsync(basePath, { recursive: true });
      }

      // build the files
      const builderTuples = Object.entries(builderMap);
      const totalFiles = builderTuples.length;
      for (let i = 0; i < totalFiles; i++) {
        const [filePath, builder] = builderTuples[i];
        const progress = (i + 1) / totalFiles;
        const fullFilePath = join(basePath, filePath);
        if (fullFilePath.includes(pathSeparator)) {
          const dirPath = fullFilePath.slice(0, fullFilePath.lastIndexOf(pathSeparator));
          await mkdirAsync(dirPath, { recursive: true });
        }
        const fileContent = builder(builderData);
        if (!fileContent) {
          continue;
        }
        await writeFileAsync(
          fullFilePath,
          typeof fileContent === 'string'
            ? fileContent.trim()
            : JSON.stringify(fileContent, null, 2),
          {
            encoding: 'utf-8',
          },
        );
        sendUpdate({ completePercent: progress, message: `Created ${filePath}` });
      }
      return `Files created at '${options.basePath}'`;
    },
  });
}
