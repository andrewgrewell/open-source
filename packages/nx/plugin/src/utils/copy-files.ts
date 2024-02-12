import { Tree } from '@nx/devkit';
import { promises as fs } from 'fs';
import { join } from 'path';

export async function copyFiles(tree: Tree, src: string, dest: string) {
  try {
    const files = await fs.readdir(src);

    for (const file of files) {
      const srcFile = join(src, file);
      const destFile = join(dest, file);

      const fileStat = await fs.stat(join(srcFile));
      if (fileStat.isDirectory()) {
        await copyFiles(tree, srcFile, destFile);
      } else {
        tree.write(destFile, await fs.readFile(srcFile));
      }
    }
  } catch (err) {
    console.error('Error copying files:', err);
  }
}
