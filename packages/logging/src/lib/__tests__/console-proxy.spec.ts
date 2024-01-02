import { consoleProxy } from '../console-proxy';
import { mockConsole } from '../../__test-utils__/mock-console';

describe('consoleProxy', () => {
  beforeAll(() => {
    mockConsole(console, { disableMethods: true, noopErrors: true });
  });

  it.each([
    ['log', 'test-log'],
    ['info', 'test-info'],
    ['warn', 'test-warn'],
    ['error', 'test-error'],
    ['debug', 'test-debug'],
    ['trace', 'test-trace'],
  ])(`should proxy %s`, (method, message) => {
    const spy = jest.spyOn(console, method as never);
    // @ts-expect-error We don't care that `method` is a string indexing Console
    consoleProxy[method](message);
    expect(spy).toHaveBeenCalledWith(message);
  });
});
