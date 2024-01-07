import { createMockReaddirImpl, DEFAULT_ROOT_PATH } from '../../__test-utils__';
import { getFileTree } from '../get-file-tree';
import { readDirAsync } from '../read-dir-async';

jest.mock('../read-dir-async', () => ({
  readDirAsync: jest.fn(),
}));

const mockReadDirAsync = readDirAsync as jest.Mock;

describe('getFileTree', () => {
  beforeEach(() => {
    const readdirImpl = createMockReaddirImpl();
    mockReadDirAsync.mockImplementation(async (path: string) => {
      const result = readdirImpl(path);
      return result;
    });
  });
  it('should return expected file tree', async () => {
    const result = await getFileTree(DEFAULT_ROOT_PATH);
    expect(result).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [],
                    "name": "file5.md",
                    "parentPath": "test/root-path/dir1/dir2",
                    "path": "test/root-path/dir1/dir2/file5.md",
                    "type": "file",
                  },
                ],
                "name": "dir2",
                "parentPath": "test/root-path/dir1",
                "path": "test/root-path/dir1/dir2",
                "type": "directory",
              },
              {
                "children": [],
                "name": "file3.md",
                "parentPath": "test/root-path/dir1",
                "path": "test/root-path/dir1/file3.md",
                "type": "file",
              },
              {
                "children": [],
                "name": "file4.md",
                "parentPath": "test/root-path/dir1",
                "path": "test/root-path/dir1/file4.md",
                "type": "file",
              },
            ],
            "name": "dir1",
            "parentPath": "test/root-path",
            "path": "test/root-path/dir1",
            "type": "directory",
          },
          {
            "children": [],
            "name": "file1.md",
            "parentPath": "test/root-path",
            "path": "test/root-path/file1.md",
            "type": "file",
          },
          {
            "children": [],
            "name": "file2.md",
            "parentPath": "test/root-path",
            "path": "test/root-path/file2.md",
            "type": "file",
          },
        ],
        "name": "root-path",
        "parentPath": "test",
        "path": "test/root-path",
        "type": "directory",
      }
    `);
  });

  it('should return tree with correct depth if options.maxDepth is set', async () => {
    const result = await getFileTree(DEFAULT_ROOT_PATH, { maxDepth: 0 });
    expect(result).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "children": [],
            "name": "file1.md",
            "parentPath": "test/root-path",
            "path": "test/root-path/file1.md",
            "type": "file",
          },
          {
            "children": [],
            "name": "file2.md",
            "parentPath": "test/root-path",
            "path": "test/root-path/file2.md",
            "type": "file",
          },
        ],
        "name": "root-path",
        "parentPath": "test",
        "path": "test/root-path",
        "type": "directory",
      }
    `);
  });

  it.each([undefined, { maxDepth: -1 }])(
    'should use a depth of 0 if options.maxDepth is not provided or negative',
    async (options) => {
      const result = await getFileTree(DEFAULT_ROOT_PATH, options);
      const children = result?.children.map((item) => item.name);
      expect(children).toEqual(['file1.md', 'file2.md']);
    },
  );

  it('should exclude files in options.exclude list', async () => {
    const result = await getFileTree(DEFAULT_ROOT_PATH, { exclude: [/file2\.md/] });
    expect(result?.children?.find((item) => item.name === 'file2.md')).toBeUndefined();
  });

  it('should include only files in options.include list when include is provided', async () => {
    const result = await getFileTree(DEFAULT_ROOT_PATH, { include: [/file2\.md/] });
    expect(result?.children?.find((item) => item.name === 'file2.md')).toBeTruthy();
    expect(result?.children?.length).toBe(1);
  });

  it('should include hidden files if options.includeHidden is true', async () => {
    const result = await getFileTree(DEFAULT_ROOT_PATH, { includeHidden: true });
    expect(result?.children?.find((item) => item.name === '.hidden-file')).toBeTruthy();
  });

  it('should exclude directories if options.excludeDirectories is true', async () => {
    const result = await getFileTree(DEFAULT_ROOT_PATH, {
      excludeDirectories: true,
    });
    expect(result?.children?.find((item) => item.name === 'dir1')).toBeFalsy();
  });

  it('should include directories if explicitly included', async () => {
    const result = await getFileTree(DEFAULT_ROOT_PATH, {
      excludeDirectories: true,
      include: [/dir1/],
    });
    expect(result?.children?.find((item) => item.name === 'dir1')).toBeTruthy();
  });

  it('should add files if options.includeFiles is true', async () => {
    const result = await getFileTree(DEFAULT_ROOT_PATH, {
      excludeFiles: true,
    });
    expect(result?.children?.find((item) => item.name === 'file1.md')).toBeFalsy();
  });

  it('should include files if explicitly included', async () => {
    const result = await getFileTree(DEFAULT_ROOT_PATH, {
      excludeFiles: true,
      include: [/file1\.md/],
    });
    expect(result?.children?.find((item) => item.name === 'file1.md')).toBeTruthy();
  });

  it('should exclude files if fileVisitor returns false', async () => {
    const result = await getFileTree(DEFAULT_ROOT_PATH, {
      fileVisitor: (node) => {
        return node.name !== 'file1.md';
      },
    });
    expect(result?.children?.find((item) => item.name === 'file1.md')).toBeFalsy();
  });
});
