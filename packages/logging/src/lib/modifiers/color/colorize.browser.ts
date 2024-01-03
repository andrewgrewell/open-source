import { ConsoleLogMethods } from '../../types';

const methodColorMap = {
  [ConsoleLogMethods.DEBUG]: { color: 'cyan' },
  [ConsoleLogMethods.ERROR]: { color: 'red' },
  [ConsoleLogMethods.INFO]: { color: 'green' },
  [ConsoleLogMethods.LOG]: { color: 'green' },
  [ConsoleLogMethods.TRACE]: { color: 'magenta' },
  [ConsoleLogMethods.WARN]: { color: 'yellow' },
};

export function colorizeBrowser(string: string, logMethod: ConsoleLogMethods) {
  const { color } = methodColorMap[logMethod];
  const colorCss = color ? `color: ${color};` : '';
  return [`%c${string}`, `${colorCss}`];
}
