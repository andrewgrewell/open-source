import { ConsoleLogMethods } from '../../types';

const methodColorMap: Record<ConsoleLogMethods, string> = {
  [ConsoleLogMethods.DEBUG]: 'cyan',
  [ConsoleLogMethods.ERROR]: 'red',
  [ConsoleLogMethods.INFO]: 'green',
  [ConsoleLogMethods.LOG]: 'green',
  [ConsoleLogMethods.TRACE]: 'magenta',
  [ConsoleLogMethods.WARN]: 'yellow',
};

export function colorizeBrowser(string: string, logMethod: ConsoleLogMethods) {
  const color = methodColorMap[logMethod];
  if (!color) {
    return string;
  }
  return [`%c${string}`, `color: ${color};`];
}
