import { PackageGeneratorSchema } from './schema';
import { libraryGenerator as jsLibraryGenerator } from '@nx/js';
import { Tree } from '@nx/devkit';
import { LibraryGeneratorSchema } from '@nx/js/src/utils/schema';
import {
  ExecutionContext,
  getExecutionContextFromList,
  NPM_SCOPE,
  PACKAGES_PATH,
  promptForExecutionContext,
  getPackageDomainName,
  getPackageScope,
} from '@ag-oss/repo';
import { join } from 'path';
import { verboseLogger as log } from '@ag-oss/logging';

// Add any package scopes you wish to be publishable by default;
const defaultPublishablePackages = [NPM_SCOPE];

export async function packageGenerator(tree: Tree, options: PackageGeneratorSchema) {
  const { name, tags, importPath, directory, testEnvironment, publishable } =
    await parseOptions(tree, options);

  const jsOptions: LibraryGeneratorSchema = {
    buildable: true,
    bundler: 'tsc',
    compiler: 'tsc',
    directory,
    importPath,
    name,
    projectNameAndRootFormat: 'as-provided',
    publishable,
    simpleName: true,
    skipTsConfig: false,
    tags,
    testEnvironment,
    unitTestRunner: 'jest',
  };
  await jsLibraryGenerator(tree, jsOptions);
}

async function parseOptions(tree: Tree, options: PackageGeneratorSchema) {
  process.env['VERBOSE'] = options.verbose ? 'true' : 'false';

  const { name: argsName, context: argsContext, domain: argsDomain } = options;
  const domainsFromArgs = Array.isArray(argsDomain) ? argsDomain : [argsDomain];

  let executionContext = argsContext;
  if (executionContext && !isValidContext(executionContext)) {
    throw new Error(`Invalid context provided: ${argsContext}!`);
  }
  const scopeInName = getPackageScope(argsName);
  const fullProjectName = getPackageDomainName(argsName, domainsFromArgs);
  log.verbose(`Full package domain name: ${fullProjectName}`);
  const nameParts = fullProjectName.split('-');

  // if the name includes context, it will be the last part of the name, e.g. "workflows-js"
  const contextInName = getExecutionContextFromList(argsName);
  if (contextInName) {
    if (executionContext && contextInName !== executionContext) {
      throw new Error(
        'The context provided in the name does not match the context provided in the options!',
      );
    }
    log.verbose(`Found context "${contextInName}" in name.`);
    executionContext = contextInName as ExecutionContext;
  }

  // check if any of the name parts might be an existing domain in `packages/`
  // If a domain is found, the package will be created in that domain
  let finalParentPath = PACKAGES_PATH;
  for (const part of nameParts) {
    const pathToCheck = join(finalParentPath, part);
    if (part === scopeInName) {
      log.verbose(`Found package scope "${part}" in name.`);
    } else {
      log.verbose(`Checking for existing domain at ${pathToCheck}.`);
      if (tree.exists(pathToCheck)) {
        log.verbose(`Found existing domain at ${pathToCheck}.`);
      } else if (domainsFromArgs.includes(part)) {
        log.verbose(`Creating new domain at ${pathToCheck}.`);
      } else {
        log.verbose(`No existing domain found at ${pathToCheck}.`);
        break;
      }
    }

    finalParentPath = pathToCheck;
    nameParts.shift();
  }

  const packageBaseName = nameParts.join('-');
  const npmScope = `@${scopeInName}` || NPM_SCOPE;
  const importPath = `${npmScope}/${fullProjectName.replace(`${scopeInName}-`, '')}`;
  const publishable = defaultPublishablePackages.includes(scopeInName);
  if (!publishable) {
    log.verbose(
      `Defaulting to publish=false because the package scope "${npmScope}" is not in the list of publishable packages ([${defaultPublishablePackages.join(
        ', ',
      )}]).`,
    );
  }
  const directory = contextInName
    ? join(
        finalParentPath.replace(scopeInName, npmScope),
        packageBaseName.replace(`-${contextInName}`, ''),
        contextInName,
      )
    : join(finalParentPath, packageBaseName);

  const parsedOptions = {
    directory,
    importPath,
    name: fullProjectName,
    publishable,
    tags: executionContext || (await promptForExecutionContext()),
    testEnvironment: executionContext === ExecutionContext.BROWSER ? 'jsdom' : 'node',
  } as const;
  log.verbose('Creating package with options: ', parsedOptions);
  return parsedOptions;
}

function isValidContext(context: string) {
  return !!getExecutionContextFromList([context]);
}

export default packageGenerator;
