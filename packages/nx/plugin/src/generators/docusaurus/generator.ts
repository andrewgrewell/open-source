import { DocusaurusGeneratorSchema } from './schema';
import {
  Tree,
  addDependenciesToPackageJson,
  installPackagesTask,
  formatFiles,
  generateFiles,
} from '@nx/devkit';
import { join } from 'path';
import { copyFiles } from '../../utils/copy-files';

export async function packageGenerator(tree: Tree, options: DocusaurusGeneratorSchema) {
  const { name = 'docs', appName } = options;
  const projectPath = join('apps', appName, 'clients', name);
  // TODO handle dependency versions
  addDependenciesToPackageJson(
    tree,
    {
      '@docusaurus/core': '3.1.1',
      '@docusaurus/preset-classic': '3.1.1',
      '@mdx-js/react': '^3.0.0',
      clsx: '^2.0.0',
      'prism-react-renderer': '^2.3.0',
    },
    {
      '@docusaurus/module-type-aliases': '3.1.1',
      '@docusaurus/tsconfig': '3.1.1',
      '@docusaurus/types': '3.1.1',
    },
  );
  await copyFiles(tree, join(__dirname, 'files'), projectPath);
  generateFiles(tree, join(__dirname, 'templates'), projectPath, {
    appName,
    name,
    projectName: `${appName}-${name}`,
    tmpl: '',
  });
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}

export default packageGenerator;
