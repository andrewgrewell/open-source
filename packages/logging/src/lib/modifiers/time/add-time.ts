import { addMiddleware } from '../../utils';
import { formatTime } from '@ag-oss/string-utils';

export function addTime(console: Console): Console {
  return addMiddleware(console, (_, args) => {
    const dateFormatted = formatTime(new Date());
    return [dateFormatted, ...args];
  });
}
