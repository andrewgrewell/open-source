import { createTask } from '@ag-oss/workflows-js';
import { getFileTree } from '@ag-oss/fs';
import { readFileAsync } from '@ag-oss/fs';
import { writeFileAsync } from '@ag-oss/fs';
import { updateProjectPath } from './utils/update-project-path';
import { updatePathToRepoRoot } from './utils/update-path-to-repo-root';
import { ProjectConfig } from '../../types';
import { verboseLogger } from '@ag-oss/logging';

export function updateProjectFiles(options: ProjectConfig) {
  return createTask({
    name: 'Update project files',
    runner: async () => {
      await getFileTree(options.fullProjectPath, {
        fileVisitor: async (file) => {
          verboseLogger.verbose(`Reading file: ${file.path}`);
          let fileContents = await readFileAsync(file.path, { encoding: 'utf-8' });
          if (!fileContents) {
            return;
          }
          verboseLogger.verbose(`Updating project paths`);
          fileContents = updateProjectPath(fileContents, options);

          verboseLogger.verbose(`Updating relative paths`);
          fileContents = updatePathToRepoRoot(fileContents, options);

          verboseLogger.verbose(`Writing updates to file`);
          await writeFileAsync(file.path, fileContents);
        },
        maxDepth: 0,
      });
      return 'Paths updated';
    },
  });
}
