import { execFileAsync } from './exec-file-async';

export async function killProcessOnPort(port: number) {
  const { stdout } = await execFileAsync('lsof', ['-ti', `TCP:${port}`], {});
  const pids = stdout.split(/[\r\n]/);
  for (const pid of pids) {
    if (pid) {
      await execFileAsync('kill', ['-9', pid]);
    }
  }
}
