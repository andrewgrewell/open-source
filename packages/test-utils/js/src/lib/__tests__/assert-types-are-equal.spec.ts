import { AssertTypesAreEqual } from '../assert-types-are-equal';

type TestType1 = {
  a: string;
};

type TestType2 = 'a' | 'b';

describe('AssertTypeAreEqual', () => {
  it('should return true if types are equal', () => {
    const expected: AssertTypesAreEqual<TestType2, 'a'> = true;
    expect(expected).toBe(true);
  });

  it('should error if types are not equal', () => {
    const expected: AssertTypesAreEqual<TestType1, TestType2> = false;
    expect(expected).toBe(false);
  });
});
