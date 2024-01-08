import { padStart } from '../pad';

/**
 * Returns a time string in the format HH:mm:ss.sss
 * @param date
 */
export function formatTime(date: Date) {
  const hours = padStart(date.getHours(), 2);
  const minutes = padStart(date.getMinutes(), 2);
  const seconds = padStart(date.getSeconds(), 2);
  const milliseconds = padStart(date.getMilliseconds(), 3);

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
