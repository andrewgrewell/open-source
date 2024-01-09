export function getPackageDomainName(name: string, domains?: string | string[]): string {
  const domain = Array.isArray(domains) ? domains.join('-') : domains;
  const nameWithoutDomain = name.replace(`${domain}-`, '');
  return domain?.length ? `${domain}-${nameWithoutDomain}` : name;
}
