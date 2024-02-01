export type LocalStorageMethod = 'getItem' | 'setItem' | 'removeItem' | 'clear';

export type SpyImpl = (...args: any[]) => string | null;
export function spyOnLocalStorage(method: LocalStorageMethod, implementation: SpyImpl) {
  const spy = jest.spyOn(Storage.prototype, 'getItem');
  spy.mockImplementation(implementation);
  return spy;
}
