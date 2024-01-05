import { getProjects, Tree } from '@nx/devkit';
import { RemoveJsoncGeneratorSchema } from './schema';
import { removeJsonc } from '../../lib/tasks';
import { nxGetProjectConfig } from '../../lib/utils/nx/nx-get-project-config';
import { createWorkflow } from '@ag-oss/workflows-js';
import { promisifyObservable } from '@ag-oss/rxjs';
import { verboseLogger } from '@ag-oss/logging';

export async function removeJsoncGenerator(
  tree: Tree,
  options: RemoveJsoncGeneratorSchema,
) {
  process.env['VERBOSE'] = options.verbose ? 'true' : 'false';

  const { projectName } = options || {};
  const projects = getProjects(tree);
  const eslintRcPath = '.eslintrc.json';

  const getProjectConfig = (projectName: string) =>
    nxGetProjectConfig(tree, projects.get(projectName));

  if (options.projectName) {
    const project = projects[projectName];

    if (!project) {
      throw new Error(`Project not found: ${projectName}`);
    }
    verboseLogger.verbose(
      `Removing jsonc parser from "${projectName}" .eslintrc.json file`,
    );
    await promisifyObservable(
      removeJsonc({ ...getProjectConfig(projectName), eslintRcPath }).run(),
    );
  } else {
    verboseLogger.verbose('Removing jsonc parser from all project .eslintrc.json files');
    const workflow = createWorkflow({
      name: 'Remove jsonc parser from all project .eslintrc.json files',
      tasks: [...projects.keys()]
        // Skip the root project
        .filter((k) => k !== '@ag-oss/source')
        .map((projectName) => {
          verboseLogger.verbose(
            `Removing jsonc parser from "${projectName}" .eslintrc.json file`,
          );
          const projectConfig = getProjectConfig(projectName);
          verboseLogger.verbose('projectConfig', projectConfig);
          return removeJsonc({
            ...projectConfig,
            eslintRcPath,
          });
        }),
    });
    const results = await promisifyObservable(workflow.run());
    verboseLogger.verbose('Results', results);
  }
}

export default removeJsoncGenerator;
