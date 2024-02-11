import { formatAsFlag } from '../format-as-flag';

describe('formatAsFlag', function () {
  it('should return undefined if flag is falsy', function () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(formatAsFlag(undefined)).toBe(undefined);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(formatAsFlag(null)).toBe(undefined);
    expect(formatAsFlag('')).toBe(undefined);
  });

  it('should return flag with -- prefix', function () {
    expect(formatAsFlag('flag')).toBe('--flag');
    expect(formatAsFlag('--flag')).toBe('--flag');
  });
});
