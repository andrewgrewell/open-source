import { createMockObject } from '../create-mock-object';

interface TestObject {
  foo(): void;
  bar(): void;
}
describe('createMockObject', function () {
  it('should return an object that traps method calls', function () {
    const { model, traps } = createMockObject<TestObject>();
    model.foo();
    expect(traps.foo).toHaveBeenCalled();
  });
});
