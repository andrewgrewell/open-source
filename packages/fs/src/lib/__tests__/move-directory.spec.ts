import { moveDirectory } from '../move-directory';
import { existsAsync } from '../exists-async';
import { renameAsync } from '../rename-async';
import { mkdirAsync } from '../mkdir-async';
import { readDirAsync } from '../read-dir-async';

jest.mock('../exists-async');
jest.mock('../rename-async');
jest.mock('../mkdir-async');
jest.mock('../read-dir-async');

const mockExistsAsync = existsAsync as jest.Mock;
const mockRenameAsync = renameAsync as jest.Mock;
const mockMkDirAsync = mkdirAsync as jest.Mock;
const mockReadDirAsync = readDirAsync as jest.Mock;

describe('moveDirectory', () => {
  const pathA = 'some/path/a';
  const pathB = 'some/path/b';

  it('should create a directory for destination if it doesnt exist', async () => {
    mockExistsAsync.mockResolvedValueOnce(false);
    await moveDirectory(pathA, pathB);
    expect(mockMkDirAsync).toHaveBeenCalledWith(pathB, { recursive: true });
  });

  it('should move the directory if the destination is not a subdirectory of the source', async () => {
    mockExistsAsync.mockResolvedValueOnce(true);
    await moveDirectory(pathA, pathB);
    expect(mockRenameAsync).toHaveBeenCalledWith(pathA, pathB);
  });

  it('should move each file into the new directory if the destination is a subdirectory of the source', async () => {
    mockExistsAsync.mockResolvedValueOnce(true);
    const dirContents = ['dir1', 'file1', 'file2'];
    mockReadDirAsync.mockResolvedValueOnce(dirContents);
    await moveDirectory(pathA, `${pathA}/new-directory`);
    dirContents.forEach((file) => {
      expect(mockRenameAsync).toHaveBeenCalledWith(
        `${pathA}/${file}`,
        `${pathA}/new-directory/${file}`,
      );
    });
  });
});
