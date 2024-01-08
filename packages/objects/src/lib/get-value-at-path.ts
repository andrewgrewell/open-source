const escape = ['.', '\\'];

export function getValueAtPath<TObject = Record<string, unknown>>(
  object: TObject,
  path: string,
  delimiter = '.',
) {
  delimiter = escape.includes(delimiter) ? `\\${delimiter}` : delimiter;
  const trimRegex = new RegExp(`^${delimiter}|${delimiter}$`);
  const splitRegex = new RegExp(delimiter);
  const parts = path.replace(trimRegex, '').split(splitRegex);
  let result = object as TObject;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const value = (result as any)[part];
    if (value == null) {
      return undefined;
    }
    result = value;
  }
  return result;
}
