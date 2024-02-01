import { PackageGeneratorSchema } from './schema';
import { libraryGenerator as jsLibraryGenerator } from '@nx/js';
import type { Schema as ReactLibOptions } from '@nx/react/src/generators/library/schema';
import { libraryGenerator as reactLibraryGenerator } from '@nx/react';
import { Tree } from '@nx/devkit';
import { LibraryGeneratorSchema as JsLibOptions } from '@nx/js/src/utils/schema';
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
  const parsedOptions = await parseOptions(tree, options);

  const { tags } = parsedOptions;

  // TODO support other package types
  if (tags.includes(ExecutionContext.REACT)) {
    log.verbose('Generating React package.');
    await generateReactPackage(tree, parsedOptions);
  } else {
    log.verbose('Generating JS package.');
    await generateJsPackage(tree, parsedOptions);
  }
}

function generateJsPackage(tree: Tree, options: Partial<JsLibOptions>) {
  const { directory, importPath, name, publishable, tags, testEnvironment } = options;
  const jsOptions: JsLibOptions = {
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
  return jsLibraryGenerator(tree, jsOptions);
}

function generateReactPackage(tree: Tree, options: Partial<ReactLibOptions>) {
  const reactOptions = {
    buildable: true,
    bundler: 'rollup',
    linter: 'eslint',
    projectNameAndRootFormat: 'as-provided',
    simpleName: true,
    skipTsConfig: false,
    style: '@emotion/styled',
    unitTestRunner: 'jest',
    ...options,
  };
  return reactLibraryGenerator(tree, reactOptions as ReactLibOptions);
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
  const isNpmScoped = scopeInName?.includes('@');
  if (isNpmScoped) {
    log.verbose(`Found NPM scoped package scope "${scopeInName}" in name.`);
  }
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
  const npmScope = isNpmScoped ? `${scopeInName}` : NPM_SCOPE;
  const importPath = `${npmScope}/${fullProjectName.replace(`${npmScope}-`, '')}`;
  const publishable = defaultPublishablePackages.includes(npmScope);
  if (!publishable) {
    log.verbose(
      `Defaulting to publish=false because the package scope "${npmScope}" is not in the list of publishable packages ([${defaultPublishablePackages.join(
        ', ',
      )}]).`,
    );
  }
  const directory = contextInName
    ? join(
        finalParentPath,
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
    testEnvironment: getTestEnvironment(executionContext),
  } as const;
  log.verbose('Creating package with options: ', parsedOptions);
  return parsedOptions;
}

function isValidContext(context: string) {
  return !!getExecutionContextFromList([context]);
}

function getTestEnvironment(context: ExecutionContext) {
  switch (context) {
    case ExecutionContext.BROWSER:
    case ExecutionContext.REACT:
      return 'jsdom';
    default:
      return 'node';
  }
}

export default packageGenerator;
