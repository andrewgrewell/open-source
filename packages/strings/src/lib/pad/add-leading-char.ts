export function addLeadingChar(path: string, char: string) {
  return path.startsWith(char) ? path : `${char}${path}`;
}
