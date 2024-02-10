import { fieldValidators } from '../field-validators';

describe('fieldValidators', () => {
  describe.each([
    ['email', 'valid.email+123@d.com', 'invalid@domain'],
    ['accountName', 'test-account-01', 'test account 01'],
    ['personalName', 'Joe Foo', '__invalid__'],
    ['password', 'P@ssw0rd', 'password'],
    ['phone', '999 123-4567', '123-4567'],
    ['ulid', '12345678901234567890123456', '1234567890'],
  ])(`%s`, (name: string, good: string, bad: string) => {
    it.each([
      [name, good, true],
      [name, bad, false],
    ])(`should validate %s "%s" as %s`, (name, value, expected) => {
      const result = fieldValidators[name].test(value as string);
      expect(result).toBe(expected);
    });
  });
});
