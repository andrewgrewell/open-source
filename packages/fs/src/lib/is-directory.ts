import { statAsync } from './stat-async';

export async function isDirectory(path: string): Promise<boolean> {
  const stat = await statAsync(path);
  return stat.isDirectory();
}
