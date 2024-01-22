import { removeLeadingChar } from '@ag-oss/strings';

/**
 * If the name contains the package scope (e.g. @scope/package-name, or scope/package-name),
 * return the scope name minus the @ symbol (e.g. scope).
 * @param name
 */
export function getPackageScope(name: string): string | undefined {
  if (!name.includes('/')) {
    return undefined;
  }
  const nameParts = name.split('/');
  return removeLeadingChar(nameParts[0], '@');
}
