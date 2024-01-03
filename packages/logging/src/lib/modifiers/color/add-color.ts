import { colorizeNode } from './colorize.node';
import { addMiddleware } from '../../utils';
import { colorizeBrowser } from './colorize.browser';

export function addColor(console: Console): Console {
  const isBrowser = typeof window !== 'undefined';
  return addMiddleware(console, (methodName, args) => {
    const colorizedArgs: unknown[] = [];
    args.forEach((arg) => {
      if (typeof arg === 'string') {
        if (isBrowser) {
          colorizedArgs.push(...colorizeBrowser(arg, methodName));
        } else {
          colorizedArgs.push(colorizeNode(arg, methodName));
        }
      }
      return arg;
    });
    return colorizedArgs;
  });
}
