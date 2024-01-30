export function stringListToArray(string: string) {
  if (!string) {
    return [];
  }
  return string
    .split(',')
    .map((att) => att.trim())
    .filter(Boolean);
}
