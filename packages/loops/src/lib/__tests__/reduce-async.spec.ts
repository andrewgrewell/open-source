import { reduceAsync } from '../reduce-async';

describe('reduceAsync', () => {
  it('should use initial value as accumulator', function () {
    const initialValue = { value: 'test' };
    return expect(
      reduceAsync<string[], typeof initialValue>(
        [],
        (result) => Promise.resolve(result),
        initialValue,
      ),
    ).resolves.toBe(initialValue);
  });

  it('should pass the same args as reduce', function () {
    const reducer = jest.fn((result) => result);
    return reduceAsync(['a', 'b', 'c'], reducer, []).then(() => {
      expect(reducer).toHaveBeenNthCalledWith(1, [], 'a', 0, ['a', 'b', 'c']);
      expect(reducer).toHaveBeenNthCalledWith(2, [], 'b', 1, ['a', 'b', 'c']);
      expect(reducer).toHaveBeenNthCalledWith(3, [], 'c', 2, ['a', 'b', 'c']);
    });
  });

  it('should build accumulator', function () {
    const data = [1, 2, 3];
    const expected = data[0] + data[1] + data[2];
    return expect(
      reduceAsync<number, number>(
        data,
        (result, value) => Promise.resolve(result + value),
        0,
      ),
    ).resolves.toEqual(expected);
  });
});
