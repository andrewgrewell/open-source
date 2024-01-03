import { addDateTime } from './add-date-time';
import { mockConsole, ConsoleMock } from '../../../__test-utils__/mock-console';
import { ConsoleLogMethods } from '../../types';
import { getTimezoneOffset } from '@ag-oss/test-utils-js';

describe('addDateTime', () => {
  let consoleMock: ConsoleMock;

  beforeAll(() => {
    consoleMock = mockConsole(console);
    jest.useFakeTimers().setSystemTime(1370866345);
  });

  beforeEach(() => {
    consoleMock.resetAll();
  });

  it.each(Object.values(ConsoleLogMethods))('should add date time to %s', (method) => {
    const console = addDateTime(global.console);
    console[method]('test', { foo: 'bar' });
    const tzOffset = getTimezoneOffset();
    expect(consoleMock.spies[method].mock.calls[0]).toEqual([
      `1970-01-16T12:47:46${tzOffset}`,
      'test',
      { foo: 'bar' },
    ]);
  });
});
