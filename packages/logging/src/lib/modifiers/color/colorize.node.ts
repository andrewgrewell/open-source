import { ColorCodes, ConsoleLogMethods } from '../../types';

const methodColorMap = {
  [ConsoleLogMethods.DEBUG]: ColorCodes.FgCyan,
  [ConsoleLogMethods.ERROR]: ColorCodes.FgRed,
  [ConsoleLogMethods.INFO]: ColorCodes.FgGreen,
  [ConsoleLogMethods.LOG]: ColorCodes.FgGreen,
  [ConsoleLogMethods.TRACE]: ColorCodes.FgMagenta,
  [ConsoleLogMethods.WARN]: ColorCodes.FgYellow,
};

export function colorizeNode(string: string, method: ConsoleLogMethods) {
  const colorCode = methodColorMap[method];
  return `${colorCode}${string}${ColorCodes.Reset}`;
}
