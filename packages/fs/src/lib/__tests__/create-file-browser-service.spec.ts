import { createFileBrowserService } from '../create-file-browser-service';
import { getFileTree } from '../get-file-tree';
import { createMockFileTree } from '../../__test-utils__/create-mock-file-tree';
import { nextValuePromise } from '@ag-oss/rxjs';

jest.mock('../get-file-tree');

const mockGetFileTree = getFileTree as jest.Mock;

describe('createFileBrowserService', () => {
  const mockFileTree = createMockFileTree({ files: ['file-1', ['file-2', ['file-3']]] });

  beforeEach(() => {
    mockGetFileTree.mockResolvedValue(mockFileTree);
  });

  it('should return a service', () => {
    const service = createFileBrowserService({
      rootPath: '/root',
    });
    expect(service).toMatchInlineSnapshot(`
      {
        "cwd": Observable {
          "operator": [Function],
          "source": Observable {
            "_subscribe": [Function],
          },
        },
        "error": Observable {
          "operator": [Function],
          "source": Observable {
            "_subscribe": [Function],
          },
        },
        "goTo": [Function],
        "goUp": [Function],
      }
    `);
  });

  it('should expose errors', async () => {
    mockGetFileTree.mockResolvedValue(undefined);
    const service = createFileBrowserService({
      rootPath: '/root',
    });
    const error = await nextValuePromise(service.error);
    expect(error).toMatchInlineSnapshot(`[Error: Could not find root path: /root]`);
  });

  it('should return the correct cwd', async () => {
    const service = createFileBrowserService({
      initialPath: '/root/dir-1/dir-2',
      rootPath: '/root',
    });
    const cwd = await nextValuePromise(service.cwd);
    expect(cwd).toEqual(expect.objectContaining({ path: '/root/dir-1/dir-2' }));
  });

  it('should go up a level', async () => {
    const service = createFileBrowserService({
      initialPath: '/root/dir-1/dir-2',
      rootPath: '/root',
    });
    service.goUp();
    const cwd = await nextValuePromise(service.cwd);
    expect(cwd).toEqual(expect.objectContaining({ path: '/root/dir-1' }));
  });

  it('should go to specific path', async () => {
    const service = createFileBrowserService({
      rootPath: '/root',
    });
    service.goTo('/root/dir-1/dir-2/file-3');
    const cwd = await nextValuePromise(service.cwd);
    expect(cwd).toEqual(expect.objectContaining({ path: '/root/dir-1/dir-2' }));
  });
});
