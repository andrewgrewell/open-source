import { addMiddleware } from '../../utils';
import { formatTime } from '@ag-oss/strings';

export function addTime(console: Console): Console {
  return addMiddleware(console, (_, args) => {
    const dateFormatted = formatTime(new Date());
    return [dateFormatted, ...args];
  });
}
