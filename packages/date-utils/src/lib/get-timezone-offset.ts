/* istanbul ignore file */
/**
 * This utility is mainly used to make testing dates that include timezones easier.
 */
export function getTimezoneOffset() {
  const offset = new Date().getTimezoneOffset(), // Offset in minutes
    offsetHours = Math.abs(Math.floor(offset / 60)),
    offsetMinutes = Math.abs(offset % 60),
    sign = offset > 0 ? '-' : '+';

  // Formatting the offset to match the required format
  const formattedOffset =
    offset === 0
      ? 'Z'
      : sign +
        String(offsetHours).padStart(2, '0') +
        ':' +
        String(offsetMinutes).padStart(2, '0');

  return formattedOffset;
}
