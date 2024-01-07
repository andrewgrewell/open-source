import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { removeJsoncGenerator } from './generator';
import { RemoveJsoncGeneratorSchema } from './schema';

// TODO: Add Non NX Tree abstraction and update tasks which modify the file system to take it as a dependency
//  see: https://www.notion.so/Update-repo-tasks-to-take-Tree-6274ada474924cf5b5dcdc707b4ac254?pvs=4
describe.skip('removeJsonc generator', () => {
  let tree: Tree;
  const options: RemoveJsoncGeneratorSchema = { projectName: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await removeJsoncGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
