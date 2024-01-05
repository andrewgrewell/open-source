/**
 * Takes an object of n levels and converts it to a single level
 * @remarks
 * The object will be one level deep, with keys following path syntax.
 * @example
 * original object: { foo: { bar: { baz: 'value' } } }
 * flat object: { 'foo.bar.baz': 'value' }
 * @param object - The object to flatten
 * @param baseKey - Append all keys with this string
 * @param delimiter - The delimiter to use between keys
 */
export const flattenObject = (
  object: Record<string, unknown>,
  baseKey?: string,
  delimiter = '.',
): Record<string, unknown> => {
  return Object.keys(object).reduce(
    (finalResult, key) => {
      const value = object[key];
      const finalKey = baseKey ? `${baseKey}${delimiter}${key}` : key;
      if (value && typeof value !== 'object') {
        finalResult[finalKey] = value;
      } else if (value && typeof value === 'object') {
        finalResult = {
          ...finalResult,
          ...flattenObject(value as Record<string, unknown>, finalKey),
        };
      }
      return finalResult;
    },
    {} as Record<string, unknown>,
  );
};
