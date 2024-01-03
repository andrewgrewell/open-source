import { addDateTime } from './add-date-time';
import { mockConsole, ConsoleMock } from '../../../__test-utils__/mock-console';
import { ConsoleLogMethods } from '../../types';

describe('addDateTime', () => {
  let consoleMock: ConsoleMock;

  beforeAll(() => {
    consoleMock = mockConsole(console);
    jest.useFakeTimers().setSystemTime(new Date(2024, 0, 2, 15, 30, 45, 123));
  });

  beforeEach(() => {
    consoleMock.resetAll();
  });

  it.each(Object.values(ConsoleLogMethods))('should add date time to %s', (method) => {
    const console = addDateTime(global.console);
    console[method]('test', { foo: 'bar' });
    expect(consoleMock.spies[method].mock.calls[0]).toEqual([
      '2024-01-02T23:30:45.123Z',
      'test',
      { foo: 'bar' },
    ]);
  });
});
