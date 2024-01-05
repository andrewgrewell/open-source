import { ProjectConfig, ProjectFileBuilder } from '../../../../types';

export const projectJsonBuilder: ProjectFileBuilder = (config) => {
  const {
    tags: configTags,
    projectName,
    relativePathToRepoRoot,
    pathInRepo,
    executionContext,
  } = config;
  const tags = [...configTags];
  if (!tags.includes(executionContext)) {
    tags.push(executionContext);
  }
  return {
    $schema: `${relativePathToRepoRoot}/node_modules/nx/schemas/project-schema.json`,
    name: projectName,
    projectType: 'library',
    sourceRoot: `${pathInRepo}/src`,
    tags: tags,
    targets: getExecutorTargets(config),
  };
};

function getExecutorTargets(config: ProjectConfig) {
  const { distPath, pathInRepo } = config;
  // TODO derive executor targets from package tags and execution context
  return {
    build: {
      executor: '@nx/js:tsc',
      options: {
        assets: [`${pathInRepo}/*.md`],
        main: `${pathInRepo}/src/index.ts`,
        outputPath: `${distPath}/${pathInRepo}`,
        tsConfig: `${pathInRepo}/tsconfig.lib.json`,
      },
      outputs: ['{options.outputPath}'],
    },
    lint: {
      executor: '@nx/linter:eslint',
      options: {
        lintFilePatterns: [`${pathInRepo}/**/*.ts`],
      },
      outputs: ['{options.outputFile}'],
    },
    test: {
      configurations: {
        ci: {
          ci: true,
          codeCoverage: true,
        },
      },
      executor: '@nx/jest:jest',
      options: {
        jestConfig: `${pathInRepo}/jest.config.ts`,
        passWithNoTests: true,
      },
      outputs: ['{workspaceRoot}/coverage/{projectRoot}'],
    },
  };
}
