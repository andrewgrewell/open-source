import { stringListToArray } from '../string-list-to-array';

describe('stringListToArray', () => {
  it('should return an empty array if no string', function () {
    expect(stringListToArray(null as any)).toEqual([]);
  });

  it('should return array of parts with string containing commas and single space', function () {
    expect(stringListToArray('a, b, c')).toEqual(['a', 'b', 'c']);
  });

  it('should return array when string list formatting is weird', function () {
    expect(stringListToArray('a,    b,c,last,')).toEqual(['a', 'b', 'c', 'last']);
  });
});
