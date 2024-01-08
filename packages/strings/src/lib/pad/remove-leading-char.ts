export function removeLeadingChar(path: string, char: string) {
  return path.startsWith(char) ? path.slice(char.length) : path;
}
