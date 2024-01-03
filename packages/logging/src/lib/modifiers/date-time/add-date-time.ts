import { addMiddleware } from '../../utils';
import { formatDateTime } from '@ag-oss/string-utils';

export function addDateTime(console: Console): Console {
  return addMiddleware(console, (_, args) => {
    const dateFormatted = formatDateTime(new Date());
    return [dateFormatted, ...args];
  });
}
