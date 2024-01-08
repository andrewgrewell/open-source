export function permuteObject<T extends object>(obj: T) {
  const keys = Object.keys(obj);
  const permutations: Partial<T>[] = [];

  function generatePermutations(count: number, currentPermutation: Partial<T>) {
    if (count === keys.length) {
      permutations.push(currentPermutation);
      return;
    }
    const key = keys[count];
    const value = (obj as Record<string, unknown>)[key];
    generatePermutations(count + 1, {
      ...currentPermutation,
      [key]: value,
    });
    generatePermutations(count + 1, currentPermutation);
  }

  generatePermutations(0, {});
  return permutations.sort((a, b) => Object.keys(a).length - Object.keys(b).length);
}
