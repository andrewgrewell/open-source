import { mapAsync } from '../map-async';

describe('mapAsync', () => {
  beforeAll(() => {
    jest.useRealTimers();
  });

  afterAll(() => {
    jest.useFakeTimers();
  });

  it('should map over item asynchronously', async function () {
    const items = [1, 2, 3];
    const mapper = jest.fn((item: number) => {
      return new Promise<number>((resolve) => {
        setTimeout(() => {
          resolve(item * 2);
        }, 1);
      });
    });
    await expect(mapAsync(items, mapper)).resolves.toEqual([2, 4, 6]);
  });

  it('should return empty array if no data', async () => {
    await expect(mapAsync(undefined as never, undefined as never)).resolves.toEqual([]);
  });
});
