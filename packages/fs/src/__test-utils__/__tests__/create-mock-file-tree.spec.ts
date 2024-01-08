import { createMockFileTree } from '../create-mock-file-tree';

describe('createMockFileTree', () => {
  it('should create a file tree with the default values', () => {
    const tree = createMockFileTree();
    expect(tree).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "children": [],
            "name": "file1",
            "parentPath": "/root",
            "path": "/root/file1",
            "type": "file",
          },
          {
            "children": [
              {
                "children": [],
                "name": "file2",
                "parentPath": "/root/dir-1",
                "path": "/root/dir-1/file2",
                "type": "file",
              },
              {
                "children": [
                  {
                    "children": [],
                    "name": "file3",
                    "parentPath": "/root/dir-1/dir-2",
                    "path": "/root/dir-1/dir-2/file3",
                    "type": "file",
                  },
                ],
                "name": "dir-2",
                "parentPath": "/root/dir-1",
                "path": "/root/dir-1/dir-2",
                "type": "directory",
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
      }
    `);
  });

  it('should create a file tree with the specified files', () => {
    const tree = createMockFileTree({
      files: ['file1', 'file2', ['file3', 'file4']],
    });
    expect(tree).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "children": [],
            "name": "file1",
            "parentPath": "/root",
            "path": "/root/file1",
            "type": "file",
          },
          {
            "children": [],
            "name": "file2",
            "parentPath": "/root",
            "path": "/root/file2",
            "type": "file",
          },
          {
            "children": [
              {
                "children": [],
                "name": "file3",
                "parentPath": "/root/dir-1",
                "path": "/root/dir-1/file3",
                "type": "file",
              },
              {
                "children": [],
                "name": "file4",
                "parentPath": "/root/dir-1",
                "path": "/root/dir-1/file4",
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
      }
    `);
  });
});
