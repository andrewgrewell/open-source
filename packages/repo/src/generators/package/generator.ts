import { PackageGeneratorSchema } from './schema';
import { libraryGenerator as jsLibraryGenerator } from '@nx/js';
import { Tree } from '@nx/devkit';

export async function packageGenerator(tree: Tree, options: PackageGeneratorSchema) {
  await jsLibraryGenerator(tree, options);
}

export default packageGenerator;
