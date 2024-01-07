import { isDirectory } from '../is-directory';
import { statAsync } from '../stat-async';

jest.mock('../stat-async');

const mockStatAsync = statAsync as jest.Mock;

describe('isDirectory', () => {
  it('should return true if the path is a directory', async () => {
    mockStatAsync.mockResolvedValue({ isDirectory: () => true } as never);
    const result = await isDirectory(__dirname);
    expect(result).toBe(true);
  });

  it('should return false if the path is a file', async () => {
    mockStatAsync.mockResolvedValue({ isDirectory: () => false } as never);
    const result = await isDirectory(__filename);
    expect(result).toBe(false);
  });
});
