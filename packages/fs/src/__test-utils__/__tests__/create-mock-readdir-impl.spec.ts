import { createMockReaddirImpl } from '../create-mock-readdir-impl';

const ROOT_NAME = 'root';
const ROOT_PATH = `user/test/${ROOT_NAME}`;
const mockFileTree = {
  'some/other/path': {
    'file1.md': '',
  },
  user: {
    test: {
      [ROOT_NAME]: {
        dir1: {
          dir2: {
            'file5.md': '',
          },
          'file3.md': '',
          'file4.md': '',
        },
        'file1.md': '',
        'file2.md': '',
      },
    },
  },
};

describe('createMockReaddirImpl', () => {
  it('should return a function', () => {
    expect(typeof createMockReaddirImpl()).toBe('function');
  });

  it('should handle readdir calls as expected', () => {
    const impl = createMockReaddirImpl({ fileTree: mockFileTree });
    expect(impl(ROOT_PATH)).toMatchInlineSnapshot(`
      [
        {
          "isDirectory": [Function],
          "name": "dir1",
        },
        {
          "isDirectory": [Function],
          "name": "file1.md",
        },
        {
          "isDirectory": [Function],
          "name": "file2.md",
        },
      ]
    `);
  });
});
