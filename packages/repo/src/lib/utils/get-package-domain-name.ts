export function getPackageDomainName(name: string, domains?: string | string[]): string {
  const domain = Array.isArray(domains) ? domains.join('-') : domains;
  return domain?.length ? `${domain}-${name}` : name;
}
