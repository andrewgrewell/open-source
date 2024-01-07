import { getNodeInFileTree } from '../get-node-in-file-tree';
import { createMockFileTree } from '../../__test-utils__/create-mock-file-tree';

describe('getNodeInFileTree', () => {
  const tree = createMockFileTree({ files: [['file1']] });

  it('should return the node at the specified path', () => {
    const result = getNodeInFileTree(tree, '/root/dir-1/file1');
    expect(result).toBeDefined();
  });

  it('should return undefined if the path does not exist', () => {
    const result = getNodeInFileTree(tree, '/root/some-file');
    expect(result).toBeUndefined();
  });
});
