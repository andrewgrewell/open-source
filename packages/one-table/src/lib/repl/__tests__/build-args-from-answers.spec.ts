import { buildArgsFromAnswers } from '../build-args-from-answers';

describe('buildArgsFromAnswers', () => {
  it('should return an array of value corresponding to arg positions', function () {
    const result = buildArgsFromAnswers([{ foo: 'bar' }, { another: 'value' }]);
    expect(result).toEqual(['bar', 'value']);
  });

  it('should handle object args', function () {
    const result = buildArgsFromAnswers([
      { foo: [{ bar: 'barValue' }, { baz: 'bazValue' }] },
      { another: 'anotherValue' },
    ]);
    expect(result).toEqual([{ bar: 'barValue', baz: 'bazValue' }, 'anotherValue']);
  });
});
