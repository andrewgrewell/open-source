import { ProjectConfig } from '../../types';
import { EslintRcJson } from '../../file.types';
import { modifyJsonFileTask } from '@ag-oss/workflows-node';
import { verboseLogger } from '@ag-oss/logging';
import { join } from 'path';

export interface RemoveJsoncOptions extends ProjectConfig {
  /**
   * The path to the .eslintrc.json file
   */
  eslintRcPath: string;
}

/**
 * Nx is including some jsonc parsing in projects .eslintrc.json file, and it always fails to parse json files
 * The temporary solution is to remove the json rules from the file.
 * @param options
 */
export function removeJsonc(options: RemoveJsoncOptions) {
  const { fullProjectPath, eslintRcPath } = options;

  return modifyJsonFileTask<EslintRcJson>({
    filePath: join(fullProjectPath, eslintRcPath),
    modifyJson: (json) => {
      const overrides = json.overrides;
      if (!overrides) {
        return;
      }
      json.overrides = overrides.filter((override) => {
        const remove = override.parser === ('jsonc-eslint-parser' as string);
        if (remove) {
          verboseLogger.verbose(
            `Removing jsonc-eslint-parser from "${options.projectName}" .eslintrc.json`,
          );
        }
        return !remove;
      });
      return json;
    },
    taskName: `Remove jsonc-eslint-parser from "${options.projectName}" .eslintrc.json`,
  });
}
