import { ConsoleLogMethods } from '../types';

export function addMiddleware(
  console: Console,
  callHandler: (methodName: ConsoleLogMethods, args: unknown[]) => unknown[],
): Console {
  return new Proxy(console, {
    get(target, prop) {
      const ref = Reflect.get(target, prop);
      // we are only concerned with log type method calls
      if (typeof prop !== 'string') {
        return ref;
      }
      const methodName = ConsoleLogMethods[prop.toUpperCase() as never];
      if (!methodName || !ref) {
        return ref;
      }
      return (...args: unknown[]) => {
        const updatedArgs = callHandler(methodName, args);
        return ref.call(target, ...updatedArgs);
      };
    },
  });
}
