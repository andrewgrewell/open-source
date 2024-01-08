/* istanbul ignore file */
import { verboseLogger } from '@ag-oss/logging';
import { execFile, ExecFileOptions } from 'child_process';
import { promisify } from 'util';

const exec = promisify(execFile);

export async function execFileAsync(
  cmd: string,
  args: string[],
  options: ExecFileOptions = {},
) {
  const _options = { ...options };
  _options.env = { ...process.env, ...(options.env || {}) };
  _options.maxBuffer = 1024 * 1000;
  verboseLogger.verbose(
    `Running bash command: ${`${cmd} ${args.join(' ')}`}#options: ${JSON.stringify(
      options || {},
    )}`,
  );
  const result = await exec(cmd, args, _options);

  return {
    ...result,
    stdout: typeof result.stdout !== 'string' ? result.stdout : result.stdout.trimRight(),
  };
}
