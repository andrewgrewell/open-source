import { existsAsync } from './exists-async';
import { mkdirAsync } from './mkdir-async';
import { readDirAsync } from './read-dir-async';
import { join } from 'path';
import { renameAsync } from './rename-async';
import { verboseLogger } from '@ag-oss/logging';

export async function moveDirectory(fromPath: string, toPath: string) {
  if (!toPath.includes(fromPath)) {
    verboseLogger.verbose(
      'Move destination is not a subdirectory of the source directory, moving...',
    );
    if (!(await existsAsync(toPath))) {
      verboseLogger.verbose(`Creating directory: ${toPath}`);
      await mkdirAsync(toPath, { recursive: true });
    }
    // if the toPath is not a subdirectory of the fromPath, we can just move the entire directory
    await renameAsync(fromPath, toPath);
  }

  const files = await readDirAsync(fromPath);

  if (!(await existsAsync(toPath))) {
    verboseLogger.verbose(`Creating directory: ${toPath}`);
    await mkdirAsync(toPath, { recursive: true });
  }

  verboseLogger.verbose('Moving each file into new directory');
  for (const file of files) {
    const sourcePath = join(fromPath, file);
    const targetPath = join(toPath, file);
    await renameAsync(sourcePath, targetPath);
  }
}
