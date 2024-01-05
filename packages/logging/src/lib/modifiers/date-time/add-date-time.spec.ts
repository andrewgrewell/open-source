import { addDateTime } from './add-date-time';
import { mockConsole, ConsoleMock } from '../../../__test-utils__/mock-console';
import { ConsoleLogMethods } from '../../types';
import { getTimeWithOffset } from '@ag-oss/dates';

describe('addDateTime', () => {
  const mockDate = new Date(2020, 0, 1, 2, 3, 4, 5);
  const timeOffset = getTimeWithOffset(mockDate);
  let consoleMock: ConsoleMock;

  beforeAll(() => {
    consoleMock = mockConsole(console);
    jest.useFakeTimers().setSystemTime(mockDate);
  });

  beforeEach(() => {
    consoleMock.resetAll();
  });

  it.each(Object.values(ConsoleLogMethods))('should add date time to %s', (method) => {
    const console = addDateTime(global.console);
    console[method]('test', { foo: 'bar' });
    expect(consoleMock.spies[method].mock.calls[0]).toEqual([
      `2020-01-01T${timeOffset}`,
      'test',
      { foo: 'bar' },
    ]);
  });
});
