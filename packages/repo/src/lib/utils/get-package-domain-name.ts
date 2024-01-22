import { removeLeadingChar } from '@ag-oss/strings';
import { NPM_SCOPE } from '../constants';

export function getPackageDomainName(name: string, domains?: string | string[]): string {
  const nameParsed = name
    .replace('@', '')
    .replace('/', '-')
    .replace(`${NPM_SCOPE.replace('@', '')}-`, '');
  const domain = (Array.isArray(domains) ? domains : [domains])
    .filter((d) => d?.length)
    .map((d) => removeLeadingChar(d, '@'))
    .filter((d) => {
      return d !== NPM_SCOPE.replace('@', '');
    })
    .join('-');
  const nameWithoutDomain = nameParsed.replace(`${domain}-`, '');
  return domain?.length ? `${domain}-${nameWithoutDomain}` : nameParsed;
}
