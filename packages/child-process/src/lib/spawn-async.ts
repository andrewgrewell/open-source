import { verboseLogger } from '@ag-oss/logging';
import { SpawnOptions } from 'child_process';
import * as child_process from 'child_process';

interface SpawnResult {
  code: number | null;
  signal: string | null;
}

export type SpawnPromise = Promise<SpawnResult> & {
  process: child_process.ChildProcess;
};

export function spawnAsync(
  cmd: string,
  args: string[],
  options?: SpawnOptions & { streamOutput?: boolean },
): SpawnPromise {
  if (options?.env) {
    options.env = { ...process.env, ...options.env };
  }
  // we are being opinionated here, the commands output will be passed through to the parent
  // this gives us better output in the parent process
  let stdio: SpawnOptions['stdio'] = 'inherit';
  if (options && options.streamOutput) {
    stdio = ['ignore', 'pipe', 'inherit'];
  }
  const child = child_process.spawn(cmd, args, {
    stdio,
    ...options,
  });

  const promise = new Promise<SpawnResult>((resolve, reject) => {
    child.on('exit', (code, signal) => {
      verboseLogger.verbose(`[${cmd}] child process exited`, { code, signal });
      if (code !== 0 || signal) {
        reject({ code, signal });
      }
      resolve({ code, signal });
    });

    child.on('error', (error) => {
      reject({ error });
    });
  }) as SpawnPromise;
  promise.process = child;
  return promise;
}
