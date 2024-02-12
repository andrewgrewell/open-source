import { promises as fs } from 'fs';
import { join } from 'path';

export async function copyFiles(srcDir: string, destDir: string) {
  try {
    await fs.mkdir(destDir, { recursive: true });

    const files = await fs.readdir(srcDir);

    for (const file of files) {
      const srcFile = join(srcDir, file);
      const destFile = join(destDir, file);

      await fs.copyFile(srcFile, destFile);
    }
  } catch (err) {
    console.error('Error copying files:', err);
    throw err;
  }
}
