/// <reference types="jest" />
const methods = ['info', 'warn', 'error', 'trace', 'debug', 'log'];

export interface ConsoleMethodSpies {
  debug: jest.SpyInstance;
  log: jest.SpyInstance;
  info: jest.SpyInstance;
  warn: jest.SpyInstance;
  error: jest.SpyInstance;
  trace: jest.SpyInstance;
}

type ConsoleMethodNames = keyof ConsoleMethodSpies;

let _spies: ConsoleMethodSpies = {
  debug: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  log: jest.fn(),
  trace: jest.fn(),
  warn: jest.fn(),
};

export class TestConsole {
  static get spies() {
    return _spies;
  }

  static buildSpies() {
    _spies = methods.reduce((result, method) => {
      result[method as ConsoleMethodNames] = jest.spyOn(
        console,
        method as ConsoleMethodNames,
      );
      return result;
    }, {} as ConsoleMethodSpies);
    return _spies;
  }

  static disableAll() {
    TestConsole.restoreAll();
    TestConsole.buildSpies();
    Object.entries(_spies).forEach(([key, spy]) => {
      if (key === 'error') {
        // don't noop errors as this will prevent some jest libs errors from surfacing
        return;
      }
      spy.mockImplementation(() => {
        return () => {
          // noop
        };
      });
    });
  }

  static disableNextError() {
    TestConsole.spies.error.mockImplementationOnce(() => {
      return () => {
        // noop
      };
    });
  }

  static clearAll() {
    Object.values(_spies).forEach((spy) => {
      spy.mockClear();
    });
  }

  static resetAll() {
    Object.values(_spies).forEach((spy) => {
      spy.mockReset();
    });
  }

  static restoreAll() {
    Object.values(_spies).forEach((spy) => {
      spy.mockRestore();
    });
  }
}
