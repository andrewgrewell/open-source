import {
  createMockModel,
  MockModelMethodName,
  MODEL_METHOD_NAMES,
} from '../create-mock-model';

describe('createMockModel', function () {
  const setup = () => {
    const model = createMockModel();
    return { model };
  };

  it('should create a mock model', function () {
    const { model } = setup();
    expect(model).toBeDefined();
  });

  it.each(MODEL_METHOD_NAMES)('should have a %s mock function', function (methodName) {
    const { model } = setup();
    const method = model[methodName as MockModelMethodName];
    method.mockReturnValueOnce('test');
    const result = method();
    expect(method).toHaveBeenCalledTimes(1);
    expect(result).toBe('test');
  });
});
