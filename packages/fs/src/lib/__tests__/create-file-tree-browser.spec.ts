import { createMockFileTree } from '../../__test-utils__/create-mock-file-tree';
import { createFileTreeBrowser, FileTreeBrowser } from '../create-file-tree-browser';
import { lastValueFrom, take } from 'rxjs';

async function spyOnCwd(browser: FileTreeBrowser, emitCount = 1) {
  const spy = jest.fn();
  const stream = browser.cwd.pipe(take(emitCount));
  stream.subscribe(spy);
  const lastValue = await lastValueFrom(stream);
  return {
    lastValue,
    spy,
    stream,
  };
}

describe('createFileTreeBrowser', () => {
  const fileTree = createMockFileTree({
    files: ['file1', ['file2', ['file3']]],
  });

  it('should default to the root as the cwd', async () => {
    const browser = createFileTreeBrowser({ fileTree });
    const { spy } = await spyOnCwd(browser);
    expect(spy).toHaveBeenLastCalledWith(fileTree);
  });

  it('should allow an initial path to be specified', async () => {
    const browser = createFileTreeBrowser({
      fileTree,
      initialPath: '/root/dir-1/dir-2',
    });
    const { spy } = await spyOnCwd(browser);
    expect(spy).toHaveBeenLastCalledWith(expect.objectContaining({ name: 'dir-2' }));
  });

  it('should go to a path when goTo is called with a valid path', async () => {
    const browser = createFileTreeBrowser({ fileTree });
    browser.goTo('/root/dir-1/dir-2');
    const { spy } = await spyOnCwd(browser);
    expect(spy).toHaveBeenLastCalledWith(expect.objectContaining({ name: 'dir-2' }));
  });

  it('should go to the parent path if the path provided to goTo is a file', async () => {
    const browser = createFileTreeBrowser({ fileTree });
    browser.goTo('/root/dir-1/dir-2/file3');
    const { spy } = await spyOnCwd(browser);
    expect(spy).toHaveBeenLastCalledWith(expect.objectContaining({ name: 'dir-2' }));
  });

  it('should return false if the goTo path does not exist', async () => {
    const browser = createFileTreeBrowser({ fileTree });
    const { spy } = await spyOnCwd(browser);
    expect(browser.goTo('/does/not/exist')).toBe(false);
    expect(spy).toHaveBeenLastCalledWith(fileTree);
  });

  it('should go up a level when goUp is called', async () => {
    const browser = createFileTreeBrowser({
      fileTree,
      initialPath: '/root/dir-1/dir-2',
    });
    browser.goUp();
    const { spy } = await spyOnCwd(browser);
    expect(spy).toHaveBeenLastCalledWith(expect.objectContaining({ name: 'dir-1' }));
  });

  it('should return false if goUp is called on root', async () => {
    const browser = createFileTreeBrowser({ fileTree });
    const { spy } = await spyOnCwd(browser);
    expect(browser.goUp()).toBe(false);
    expect(spy).toHaveBeenLastCalledWith(fileTree);
  });
});
