import { getPackageScope } from '../get-package-scope';

describe('getPackageScope', () => {
  it.each([
    ['@scope/package-name', '@scope'],
    ['scope/package-name', 'scope'],
    ['@scope/package-name-with-dashes', '@scope'],
    ['scope/package-name-with-dashes', 'scope'],
    ['scope-with-dash/package-name', 'scope-with-dash'],
    ['@scope-with-dash/package-name', '@scope-with-dash'],
    ['package-name', undefined],
  ])('should return the correct scope from name "%s"', (packageName, expectedScope) => {
    const actualScope = getPackageScope(packageName);
    expect(actualScope).toEqual(expectedScope);
  });
});
