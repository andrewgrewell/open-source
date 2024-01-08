export function addTrailingChar(path: string, char: string) {
  return path.endsWith(char) ? path : `${path}${char}`;
}
