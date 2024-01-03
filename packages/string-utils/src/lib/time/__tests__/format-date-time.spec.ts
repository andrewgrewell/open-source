import { formatDateTime } from '../format-date-time';

describe('formatDateTime', () => {
  it('should return the expected output', () => {
    expect(formatDateTime(new Date(2020, 0, 1, 2, 3, 4, 5))).toBe(
      '2020-01-01T10:03:04.005Z',
    );
  });
});