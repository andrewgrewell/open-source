import { existsAsync } from '../exists-async';

describe('existsAsync', () => {
  it('should return true if the path exists', async () => {
    const result = await existsAsync(__filename);
    expect(result).toBe(true);
  });

  it('should return false if the path does not exist', async () => {
    const result = await existsAsync(__filename + '.non-existent');
    expect(result).toBe(false);
  });
});
