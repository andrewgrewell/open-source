import { promises } from 'fs';

const { stat } = promises;

export async function existsAsync(path: string) {
  try {
    await stat(path);
    return true;
  } catch (_) {
    return false;
  }
}
