import { createTask } from '@ag-oss/workflows-js';
import { readJsonAsync, writeFileAsync } from '@ag-oss/fs';
import { verboseLogger } from '@ag-oss/logging';

export interface ModifyJsonFileTaskOptions<TJson = Record<any, unknown>> {
  taskName: string;
  modifyJson: (json: TJson) => TJson | false;
  filePath: string;
}
export function modifyJsonFileTask<TJson = Record<any, unknown>>(
  options: ModifyJsonFileTaskOptions<TJson>,
) {
  const { taskName, filePath, modifyJson } = options;
  return createTask<void>({
    name: taskName,
    runner: async () => {
      verboseLogger.verbose('Reading JSON file at path: ', filePath);
      const json = await readJsonAsync(filePath);
      const modifiedJson = modifyJson(json);
      if (!modifiedJson) {
        verboseLogger.verbose(`No changes to ${filePath}`);
        return `No changes to ${filePath}`;
      }
      verboseLogger.verbose('Writing JSON file to path: ', filePath);
      await writeFileAsync(filePath, JSON.stringify(modifiedJson, null, 2));
      return `Updated ${filePath}`;
    },
  });
}
