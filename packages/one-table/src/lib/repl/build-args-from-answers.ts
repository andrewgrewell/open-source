export function buildArgsFromAnswers(answers: Record<string, unknown>[]) {
  const result = [];
  for (const answer of answers) {
    const value = Object.values(answer)[0];
    if (Array.isArray(value)) {
      // Arrays are the key/value pairs of object type, once Array types are supported
      // this would need to change to check
      const object = value.reduce((acc, objectPart) => {
        return {
          ...acc,
          ...objectPart,
        };
      }, {});
      result.push(object);
    } else {
      result.push(value);
    }
  }
  return result;
}
