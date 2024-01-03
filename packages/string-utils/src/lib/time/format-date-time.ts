import { formatISO } from 'date-fns';
/**
 * Return the formatted date string in ISO 8601 format
 * @param date
 */
export function formatDateTime(date: Date) {
  return formatISO(date, { representation: 'complete' });
}
