/* istanbul ignore file */
export function getTimeWithOffset(date: Date) {
  const timeZoneOffset = date.getTimezoneOffset(); // Offset in minutes
  const offsetSign = timeZoneOffset > 0 ? '-' : '+';
  const offsetHours = Math.abs(Math.floor(timeZoneOffset / 60));
  const offsetMinutes = Math.abs(timeZoneOffset % 60);
  const formattedOffset =
    timeZoneOffset === 0
      ? 'Z'
      : offsetSign +
        String(offsetHours).padStart(2, '0') +
        ':' +
        String(offsetMinutes).padStart(2, '0');

  // Formatting the date and time
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}${formattedOffset}`;
}
