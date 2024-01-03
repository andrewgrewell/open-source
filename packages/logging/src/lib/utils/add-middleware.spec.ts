import { addMiddleware } from './add-middleware';
import { ConsoleLogMethods } from '../types';
import { ConsoleMock, mockConsole } from '../../__test-utils__/mock-console';

describe('addMiddleware', () => {
  let consoleMock: ConsoleMock;

  beforeAll(() => {
    consoleMock = mockConsole(console);
  });

  beforeEach(() => {
    consoleMock.resetAll();
  });

  it.each([Object.values(ConsoleLogMethods)])(
    'should call middleware when method `%s` is called',
    (methodName) => {
      const console = addMiddleware(global.console, (_methodName, args) => {
        expect(_methodName).toBe(methodName);
        expect(args).toEqual(['test']);
        return ['updated'];
      });
      console[methodName]('test');
      expect(consoleMock.spies[methodName].mock.calls[0]).toEqual(['updated']);
    },
  );

  it('should return property value as is if prop is not a string', () => {
    const handlerSpy = jest.fn();
    const console = addMiddleware(global.console, handlerSpy);
    const testSymbol = Symbol();
    // @ts-expect-error - indexing Console with a Symbol is not allowed
    console[testSymbol] = 'test';
    // @ts-expect-error - indexing Console with a Symbol is not allowed
    const value = console[testSymbol];
    expect(value).toBe('test');
    expect(handlerSpy).not.toHaveBeenCalled();
  });

  it('should return property value as is if prop is not a log type method', () => {
    const handlerSpy = jest.fn();
    const console = addMiddleware(global.console, handlerSpy);
    // @ts-expect-error - indexing Console with a string is not allowed
    console['zoop'] = 'zap';
    // @ts-expect-error - yeah, we know 'zoop' doesn't exist on Console
    const value = console.zoop;
    expect(value).toBe('zap');
    expect(handlerSpy).not.toHaveBeenCalled();
  });

  it('should return property value as is if prop is a log type method with wrong casing', () => {
    const handlerSpy = jest.fn();
    const console = addMiddleware(global.console, handlerSpy);
    // @ts-expect-error - purposely using wrong casing
    const value = console['LOG'];
    expect(value).toBe(undefined);
    expect(handlerSpy).not.toHaveBeenCalled();
  });
});
