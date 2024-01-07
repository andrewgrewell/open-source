import { formatDateTime } from '../format-date-time';
import { getTimeWithOffset } from '@ag-oss/dates';

describe('formatDateTime', () => {
  it('should return the expected output', () => {
    const mockDate = new Date(2020, 0, 1, 2, 3, 4, 5);
    const timeOffset = getTimeWithOffset(mockDate);
    expect(formatDateTime(mockDate)).toEqual(`2020-01-01T${timeOffset}`);
  });
});
