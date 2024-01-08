import { getProjectConfig } from '../get-project-config';
import { readProjectConfiguration, Tree } from '@nx/devkit';
import { ProjectConfiguration } from 'nx/src/config/workspace-json-project-json';
import { getProjectPath } from './get-project-path';
import { getExecutionContextFromList } from '../get-execution-context-from-list';
import { verboseLogger } from '@ag-oss/logging';

export function nxGetProjectConfig(tree: Tree, project: ProjectConfiguration) {
  verboseLogger.verbose('Generating project config from nx: ', project);
  return getProjectConfig({
    executionContext: getExecutionContextFromList(project.tags),
    fullProjectPath: getProjectPath(tree, project),
    projectJson: readProjectConfiguration(tree, project.name),
  });
}
