import { getValueAtPath } from '../get-value-at-path';

describe('getValueAtPath', () => {
  const testObject = {
    a: {
      b: {
        c: '1',
      },
    },
    b: {
      c: '2',
    },
    c: '3',
    example: {
      dir: {
        path: {
          'file1.md': 'file contents',
        },
      },
      file1: 'file contents',
    },
  };

  describe('dot delimiter', () => {
    it.each([
      ['a.b.c.', testObject.a.b.c],
      ['.a.b', testObject.a.b],
      ['a', testObject.a],
      ['b.c', testObject.b.c],
      ['b', testObject.b],
      ['c', testObject.c],
      ['q.r.s', undefined],
    ])('should return expected value for path %s', (path, expectedValue) => {
      expect(getValueAtPath(testObject, path, '.')).toEqual(expectedValue);
    });
  });

  describe('forward slash delimiter', () => {
    it.each([
      ['example/dir/path/file1.md', testObject.example.dir.path['file1.md']],
      ['example/dir/path', testObject.example.dir.path],
      ['example/dir', testObject.example.dir],
      ['example/file1', testObject.example.file1],
      ['x/y/z', undefined],
    ])(`should return expected value for path %s`, (path, expectedValue) => {
      expect(getValueAtPath(testObject, path, '/')).toEqual(expectedValue);
    });
  });
});
