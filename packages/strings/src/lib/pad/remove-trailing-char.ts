export function removeTrailingChar(path: string, char: string) {
  return path.endsWith(char) ? path.slice(0, -char.length) : path;
}
