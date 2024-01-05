import { createMockReaddirResult } from '../create-mock-readdir-result';

describe('createMockReaddirResult', () => {
  it('return the expected result', () => {
    const files = [
      ['file1', true],
      ['file2', false],
      ['file3', false],
    ] as [string, boolean][];
    const result = createMockReaddirResult({ files });
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "isDirectory": [Function],
          "name": "file1",
        },
        {
          "isDirectory": [Function],
          "name": "file2",
        },
        {
          "isDirectory": [Function],
          "name": "file3",
        },
      ]
    `);
  });
});
