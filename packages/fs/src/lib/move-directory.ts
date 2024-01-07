import { existsAsync } from './exists-async';
import { mkdirAsync } from './mkdir-async';
import { readDirAsync } from './read-dir-async';
import { join } from 'path';
import { renameAsync } from './rename-async';
import { verboseLogger } from '@ag-oss/logging';

export async function moveDirectory(fromPath: string, toPath: string) {
  const isSubDirectory = toPath.includes(fromPath);

  if (!(await existsAsync(toPath))) {
    verboseLogger.verbose(`Creating directory: ${toPath}`);
    await mkdirAsync(toPath, { recursive: true });
  }

  if (!isSubDirectory) {
    verboseLogger.verbose(
      'Move destination is not a subdirectory of the source directory, moving...',
    );
    // if the toPath is not a subdirectory of the fromPath, we can just move the entire directory
    await renameAsync(fromPath, toPath);
    return;
  }

  verboseLogger.verbose('Moving each file into new directory');
  const files = await readDirAsync(fromPath);
  for (const file of files) {
    const sourcePath = join(fromPath, file);
    const targetPath = join(toPath, file);
    await renameAsync(sourcePath, targetPath);
  }
}
