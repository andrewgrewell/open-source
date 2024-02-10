import { createMockTable, TABLE_METHOD_NAMES } from '../create-mock-table';
import { Table } from 'dynamodb-onetable';

describe('createMockTable', function () {
  const setup = () => {
    const table = createMockTable() as jest.Mocked<Table>;
    return { table };
  };

  it('should create a mock table', function () {
    const { table } = setup();
    expect(table).toBeDefined();
  });

  it.each(TABLE_METHOD_NAMES)('should have a %s mock function', function (methodName) {
    const { table } = setup();
    const method = table[methodName];
    method('a', { nothrow: true });
    expect(method).toHaveBeenCalledTimes(1);
  });
});
