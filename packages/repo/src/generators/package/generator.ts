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
} from '../../lib';
import { getPackageDomainName } from '../../lib/utils/get-package-domain-name';
import { join } from 'path';
import { verboseLogger as log } from '@ag-oss/logging';

export async function packageGenerator(tree: Tree, options: PackageGeneratorSchema) {
  const { name, tags, directory, testEnvironment } = await parseOptions(tree, options);

  const jsOptions: LibraryGeneratorSchema = {
    buildable: true,
    bundler: 'tsc',
    compiler: 'tsc',
    directory,
    importPath: `${NPM_SCOPE}/${name}`,
    name,
    projectNameAndRootFormat: 'as-provided',
    publishable: true,
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

  let executionContext = argsContext;
  if (executionContext && !isValidContext(executionContext)) {
    throw new Error(`Invalid context provided: ${argsContext}`);
  }

  const fullDomainName = getPackageDomainName(argsName, argsDomain);
  log.verbose(`Full package domain name: ${fullDomainName}`);
  const nameParts = fullDomainName.split('-');

  // if the name includes context, it will be the last part of the name, e.g. "workflows-js"
  const possibleContextFromName = getExecutionContextFromList(argsName);
  const contextInName = isValidContext(possibleContextFromName);
  if (contextInName) {
    if (executionContext && possibleContextFromName !== executionContext) {
      throw new Error(
        'The context provided in the name does not match the context provided in the options',
      );
    }
    log.verbose(`Found context in name: ${possibleContextFromName}`);
    executionContext = possibleContextFromName as ExecutionContext;
  }

  // check if any of the name parts might be an existing domain in `packages/`
  // If a domain is found, the package will be created in that domain
  let finalParentPath = PACKAGES_PATH;
  for (const part of nameParts) {
    const pathToCheck = join(finalParentPath, part);
    log.verbose(`Checking for existing domain at ${pathToCheck}`);
    if (tree.exists(pathToCheck)) {
      log.verbose(`Found existing domain at ${pathToCheck}`);
    } else if (part === argsDomain) {
      log.verbose(`Creating new domain at ${pathToCheck}`);
    } else {
      log.verbose(`No existing domain found at ${pathToCheck}`);
      break;
    }
    finalParentPath = pathToCheck;
    nameParts.shift();
  }

  const packageBaseName = nameParts.join('-');

  const parsedOptions = {
    directory: join(finalParentPath, packageBaseName),
    name: fullDomainName,
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
