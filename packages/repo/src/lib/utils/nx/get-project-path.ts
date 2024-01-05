import { join } from 'path';
import { ProjectConfiguration } from 'nx/src/config/workspace-json-project-json';
import { Tree } from '@nx/devkit';

export function getProjectPath(tree: Tree, project: ProjectConfiguration) {
  return join(tree.root, project.root);
}
