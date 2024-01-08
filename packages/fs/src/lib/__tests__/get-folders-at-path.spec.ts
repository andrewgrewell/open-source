import { getFoldersAtPath } from '../get-folders-at-path';
import { readDirAsync } from '../read-dir-async';

jest.mock('../read-dir-async', () => ({
  readDirAsync: jest.fn(),
}));

const mockReadDirAsync = readDirAsync as jest.Mock;

describe('getFoldersAtPath', () => {
  it('should return an empty array if no files are found', async () => {
    mockReadDirAsync.mockResolvedValueOnce([]);
    const folders = await getFoldersAtPath('some/path');
    expect(folders).toEqual([]);
  });

  it('should return an empty array if no folders are found', async () => {
    mockReadDirAsync.mockResolvedValueOnce([{ isDirectory: () => false, name: 'file1' }]);
    const folders = await getFoldersAtPath('some/path');
    expect(folders).toEqual([]);
  });

  it('should return an empty array if readdir returns nothing', async () => {
    mockReadDirAsync.mockResolvedValueOnce(undefined);
    const folders = await getFoldersAtPath('some/path');
    expect(folders).toEqual([]);
  });

  it('should return an array of folder names', async () => {
    mockReadDirAsync.mockResolvedValueOnce([
      { isDirectory: () => true, name: 'folder1' },
      { isDirectory: () => false, name: 'file1' },
      { isDirectory: () => true, name: 'folder2' },
    ]);
    const folders = await getFoldersAtPath('some/path');
    expect(folders).toEqual(['folder1', 'folder2']);
  });
});
