import { ExecSyncOptionsWithStringEncoding, execSync } from 'child_process';

export function getOutputLines(
  command: string,
  options?: ExecSyncOptionsWithStringEncoding,
): string[] {
  const output = execSync(command, {
    stdio: ['pipe', 'pipe', 'ignore'], // defaults
    ...(options || {}), // custom
    encoding: 'utf-8', // required
  });
  return output.trim().split(/\r?\n/g);
}
