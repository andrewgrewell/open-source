import { getProjects, Tree } from '@nx/devkit';
import { JestPrettierFixGeneratorSchema } from './schema';
import { verboseLogger } from '@ag-oss/logging';
import { promisifyObservable } from '@ag-oss/rxjs';
import { createWorkflow } from '@ag-oss/workflows-js';
import { join } from 'path';
import { jestPrettierFix, nxGetProjectConfig } from '../../lib';

export async function jestPrettierFixGenerator(
  tree: Tree,
  options: JestPrettierFixGeneratorSchema,
) {
  process.env['VERBOSE'] = options.verbose ? 'true' : 'false';

  const { projectName } = options || {};
  const projects = getProjects(tree);
  const jestConfigPath = 'jest.config.json';

  const getProjectConfig = (projectName: string) =>
    nxGetProjectConfig(tree, projects.get(projectName));

  if (options.projectName) {
    const project = projects[projectName];

    if (!project) {
      throw new Error(`Project not found: ${projectName}`);
    }
    verboseLogger.verbose(`Adding prettier-2 to "${projectName}" jest.config.json file`);
    const projectConfig = getProjectConfig(projectName);
    await promisifyObservable(
      jestPrettierFix({
        jestConfigPath: join(projectConfig.fullProjectPath, jestConfigPath),
      }).run(),
    );
  } else {
    verboseLogger.verbose(`Adding prettier-2 to all projects jest.config.json file`);
    const workflow = createWorkflow({
      name: 'Add prettier-2 to all projects jest.config.json file',
      tasks: [...projects.keys()]
        // Skip the root project
        .filter((k) => k !== '@ag-oss/source')
        .map((projectName) => {
          verboseLogger.verbose(
            `Adding prettier-2 to "${projectName}" jest.config.json file`,
          );
          const projectConfig = getProjectConfig(projectName);
          verboseLogger.verbose('projectConfig', projectConfig);
          return jestPrettierFix({
            jestConfigPath: join(projectConfig.fullProjectPath, jestConfigPath),
          });
        }),
    });
    const results = await promisifyObservable(workflow.run());
    verboseLogger.verbose('Results', results);
  }
}

export default jestPrettierFixGenerator;
