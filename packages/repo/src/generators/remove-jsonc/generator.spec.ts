import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { removeJsoncGenerator } from './generator';
import { RemoveJsoncGeneratorSchema } from './schema';

describe('removeJsonc generator', () => {
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
