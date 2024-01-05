export interface CreateMockReaddirResultOptions {
  /**
   * A tuple of [name, isDirectory]
   */
  files?: [string, boolean][];
}

/**
 * Creates a mock result of calling readdir
 * @param options
 */
export function createMockReaddirResult(options: CreateMockReaddirResultOptions = {}) {
  const { files } = options;
  return (files || []).map(([name, isDirectory]) => ({
    isDirectory: () => !!isDirectory,
    name,
  }));
}
