import { getPackageDomainName } from '../get-package-domain-name';

describe('getPackageDomainName', () => {
  it('should return name as is if no domain is provided', () => {
    expect(getPackageDomainName('my-package')).toEqual('my-package');
  });

  it.each([
    ['domain', 'domain-my-package'],
    ['domain', 'domain-my-package'],
    [['domain1', 'domain2'], 'domain1-domain2-my-package'],
    [[], 'my-package'],
  ])('should return the package name with domain(s) if provided', (domain, expected) => {
    expect(getPackageDomainName('my-package', domain)).toEqual(expected);
  });
});
