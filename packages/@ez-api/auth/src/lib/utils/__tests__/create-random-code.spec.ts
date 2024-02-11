import { createRandomCode } from '../create-random-code';

describe('createRandomCode', () => {
  it('should return a string', () => {
    const code = createRandomCode();
    expect(typeof code).toBe('string');
  });

  it('should return a string of length equal to the size parameter', () => {
    const size = 8;
    const code = createRandomCode(size);
    expect(code.length).toBe(size);
  });

  it('should return a string containing only numeric characters', () => {
    const code = createRandomCode();
    expect(/^\d+$/.test(code)).toBe(true);
  });
});
