/**
 * If the name contains the package scope (e.g. @scope/package-name, or scope/package-name),
 * @param name
 */
export function getPackageScope(name: string): string | undefined {
  if (!name.includes('/')) {
    return undefined;
  }
  const nameParts = name.split('/');
  return nameParts[0];
}
