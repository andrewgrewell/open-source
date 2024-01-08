import { createMockFileTree } from '../../__test-utils__/create-mock-file-tree';
import { createFileTreeMap } from '../create-file-tree-map';

describe('createFileTreeMap', () => {
  it('should return a map of the file tree', () => {
    const tree = createMockFileTree({ files: [['file1']] });
    const result = createFileTreeMap(tree);
    expect(result).toMatchInlineSnapshot(`
      {
        "/root": {
          "children": [
            {
              "children": [
                {
                  "children": [],
                  "name": "file1",
                  "parentPath": "/root/dir-1",
                  "path": "/root/dir-1/file1",
                  "type": "file",
                },
              ],
              "name": "dir-1",
              "parentPath": "/root",
              "path": "/root/dir-1",
              "type": "directory",
            },
          ],
          "name": "root",
          "path": "/root",
          "type": "directory",
        },
        "/root/dir-1": {
          "children": [
            {
              "children": [],
              "name": "file1",
              "parentPath": "/root/dir-1",
              "path": "/root/dir-1/file1",
              "type": "file",
            },
          ],
          "name": "dir-1",
          "parentPath": "/root",
          "path": "/root/dir-1",
          "type": "directory",
        },
        "/root/dir-1/file1": {
          "children": [],
          "name": "file1",
          "parentPath": "/root/dir-1",
          "path": "/root/dir-1/file1",
          "type": "file",
        },
      }
    `);
  });
});
