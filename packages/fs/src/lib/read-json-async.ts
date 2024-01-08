/* istanbul ignore file */
import { readFileAsync } from './read-file-async';

export async function readJsonAsync(path: string) {
  if (!path) {
    throw new Error('Missing file path');
  }
  let contents = '';
  try {
    contents = await readFileAsync(path, { encoding: 'utf-8' });
  } catch (e: any) {
    console.error(`Failed to read file at path "${path}". ${e?.message || ''}`);
    throw new Error('Failed to read file');
  }
  try {
    return JSON.parse(contents);
  } catch {
    console.error(`Failed to parse json file ${path}`);
    throw new Error('Failed to parse file');
  }
}
