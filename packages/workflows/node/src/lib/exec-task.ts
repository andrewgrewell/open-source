import { execAsync, ExecAsyncOptions } from '@ag-oss/child-process';
import { createTask } from '@ag-oss/workflows-js';

export interface ExecTaskOptions {
  taskName: string;
  command: string;
  execOptions?: ExecAsyncOptions;
}

export function execTask(options: ExecTaskOptions) {
  const { taskName, command, execOptions } = options;
  return createTask({
    name: taskName,
    runner: async () => {
      const { stdout } = await execAsync(command, execOptions);
      return stdout;
    },
  });
}
