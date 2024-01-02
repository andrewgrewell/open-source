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

export interface MockConsoleOptions {
  noopErrors?: boolean;
  disableMethods?: boolean;
}

export interface ConsoleMock {
  clearAll: () => void;
  disableAll: () => void;
  disableNextError: () => void;
  resetAll: () => void;
  restoreAll: () => void;
  spies: ConsoleMethodSpies;
}

export function mockConsole(console: Console, options?: MockConsoleOptions): ConsoleMock {
  const { noopErrors = false, disableMethods = true } = options || {};

  const spies: ConsoleMethodSpies = methods.reduce((result, method) => {
    result[method as ConsoleMethodNames] = jest.spyOn(
      console,
      method as ConsoleMethodNames,
    );
    return result;
  }, {} as ConsoleMethodSpies);

  function disableNextError() {
    spies.error.mockImplementationOnce(() => {
      return () => {
        // noop
      };
    });
  }

  function clearAll() {
    Object.values(spies).forEach((spy) => {
      spy.mockClear();
    });
  }

  function resetAll() {
    Object.values(spies).forEach((spy) => {
      spy.mockReset();
    });
  }

  function restoreAll() {
    Object.values(spies).forEach((spy) => {
      spy.mockRestore();
    });
  }

  function disableAll() {
    Object.entries(spies).forEach(([key, spy]) => {
      if (key === 'error' && !noopErrors) {
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

  if (disableMethods) {
    disableAll();
  }

  return {
    clearAll,
    disableAll,
    disableNextError,
    resetAll,
    restoreAll,
    spies,
  };
}
