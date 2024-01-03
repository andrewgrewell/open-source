const noop = () => {};

export type VerboseConsole = Console & { verbose: Console['log'] };

export function addVerboseLogging(console: Console): VerboseConsole {
  return new Proxy(console, {
    get(target, prop) {
      if (prop !== 'verbose') {
        return Reflect.get(target, prop);
      }
      if (process.env?.['VERBOSE'] === 'true') {
        return Reflect.get(target, 'log');
      }
      return noop;
    },
  }) as VerboseConsole;
}
