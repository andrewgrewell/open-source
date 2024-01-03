import { addTime } from './add-time';
import { mockConsole, ConsoleMock } from '../../../__test-utils__/mock-console';
import { ConsoleLogMethods } from '../../types';

describe('addTime', () => {
  let consoleMock: ConsoleMock;

  beforeAll(() => {
    consoleMock = mockConsole(console);
    jest.useFakeTimers().setSystemTime(new Date(2024, 0, 2, 15, 30, 45, 123));
  });

  beforeEach(() => {
    consoleMock.resetAll();
  });

  it.each(Object.values(ConsoleLogMethods))('should add time to %s', (method) => {
    const console = addTime(global.console);
    console[method]('test', { foo: 'bar' });
    expect(consoleMock.spies[method].mock.calls[0]).toEqual([
      '15:30:45.123',
      'test',
      { foo: 'bar' },
    ]);
  });
});
