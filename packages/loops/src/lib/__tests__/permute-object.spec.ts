import { permuteObject } from '../permute-object';

describe('permuteObject', () => {
  it('should return all permutations for an object', function () {
    const permutations = permuteObject({ a: 1, b: 2, c: 3 });
    expect(permutations).toMatchInlineSnapshot(`
      [
        {},
        {
          "a": 1,
        },
        {
          "b": 2,
        },
        {
          "c": 3,
        },
        {
          "a": 1,
          "b": 2,
        },
        {
          "a": 1,
          "c": 3,
        },
        {
          "b": 2,
          "c": 3,
        },
        {
          "a": 1,
          "b": 2,
          "c": 3,
        },
      ]
    `);
  });
});
