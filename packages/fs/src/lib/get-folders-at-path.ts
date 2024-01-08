import { readDirAsync } from './read-dir-async';

export async function getFoldersAtPath(path: string): Promise<string[]> {
  const files = (await readDirAsync(path, { withFileTypes: true })) || [];
  return files.filter((file) => file.isDirectory()).map((file) => file.name);
}
