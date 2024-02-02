import { createMockTable, TABLE_METHOD_NAMES } from '../create-mock-table';

describe('createMockTable', function () {
  const setup = () => {
    const table = createMockTable();
    return { table };
  };

  it('should create a mock table', function () {
    const { table } = setup();
    expect(table).toBeDefined();
  });

  it.each(TABLE_METHOD_NAMES)('should have a %s mock function', function (methodName) {
    const { table } = setup();
    const method = table[methodName];
    method.mockReturnValueOnce('test');
    const result = method();
    expect(method).toHaveBeenCalledTimes(1);
    expect(result).toBe('test');
  });
});
