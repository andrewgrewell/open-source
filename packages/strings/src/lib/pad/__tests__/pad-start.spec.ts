import { padStart } from '../pad-start';

describe('padStart', () => {
  it('should return the expected output', () => {
    expect(padStart(1, 2)).toBe('01');
  });
});
