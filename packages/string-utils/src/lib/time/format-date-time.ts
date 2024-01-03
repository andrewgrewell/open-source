/**
 * Returns a a full UTC date-time string in the format YYYY-MM-DDTHH:mm:ss.sssZ
 * @param date
 */
export function formatDateTime(date: Date) {
  const pad = (num: number, size: number) => num.toString().padStart(size, '0');

  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1, 2); // getUTCMonth() returns month from 0-11
  const day = pad(date.getUTCDate(), 2);
  const hours = pad(date.getUTCHours(), 2);
  const minutes = pad(date.getUTCMinutes(), 2);
  const seconds = pad(date.getUTCSeconds(), 2);
  const milliseconds = pad(date.getUTCMilliseconds(), 3);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}
