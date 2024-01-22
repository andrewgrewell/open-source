import { getPackageDomainName } from '../get-package-domain-name';

describe('getPackageDomainName', () => {
  it('should return name as is if no domain is provided', () => {
    expect(getPackageDomainName('my-package')).toEqual('my-package');
  });

  it.each([
    ['domain1', 'domain1-my-package'],
    [['domain1'], 'domain1-my-package'],
    [['domain1', 'domain2'], 'domain1-domain2-my-package'],
    [[], 'my-package'],
  ])('should return the package name with domain(s) if provided', (domain, expected) => {
    expect(getPackageDomainName('my-package', domain)).toEqual(expected);
  });

  it.each([
    ['@scope/my-package', undefined, 'scope-my-package'],
    ['@ag-oss/my-package', [], 'my-package'],
    ['ag-oss/my-package', [], 'my-package'],
    ['@some-scope/my-package', undefined, 'some-scope-my-package'],
    ['some-scope/my-package', undefined, 'some-scope-my-package'],
  ])('should handle scopes in package names', (name, domain, expected) => {
    expect(getPackageDomainName(name, domain)).toEqual(expected);
  });
});
