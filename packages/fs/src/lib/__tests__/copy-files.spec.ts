import { copyFiles } from '../copy-files';
import { promises as fs } from 'fs';
import { mockConsole } from '@ag-oss/logging';

jest.mock('fs', () => ({
  promises: {
    copyFile: jest.fn(),
    mkdir: jest.fn(),
    readdir: jest.fn(),
  },
}));

jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
}));

describe('copyFiles', () => {
  const consoleMock = mockConsole(console);
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should copy files successfully', async () => {
    (fs.readdir as jest.Mock).mockResolvedValue(['file1', 'file2']);
    await copyFiles('src', 'dest');
    expect(fs.mkdir).toHaveBeenCalledWith('dest', { recursive: true });
    expect(fs.readdir).toHaveBeenCalledWith('src');
    expect(fs.copyFile).toHaveBeenCalledWith('src/file1', 'dest/file1');
    expect(fs.copyFile).toHaveBeenCalledWith('src/file2', 'dest/file2');
  });

  it('should handle error', async () => {
    consoleMock.disableNextError();
    (fs.mkdir as jest.Mock).mockRejectedValue(new Error('Test error'));
    await expect(() => copyFiles('src', 'dest')).rejects.toThrow('Test error');
    expect(consoleMock.spies.error).toHaveBeenCalledWith(
      'Error copying files:',
      new Error('Test error'),
    );
  });
});
