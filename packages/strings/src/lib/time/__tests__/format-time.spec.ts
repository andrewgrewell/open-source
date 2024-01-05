import { formatTime } from '../format-time';

describe('formatTime', () => {
  it('should return the expected output', () => {
    expect(formatTime(new Date(2020, 0, 1, 2, 3, 4, 5))).toBe('02:03:04.005');
  });
});
