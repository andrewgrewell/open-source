import { testTableSchema } from '../../../__fixtures__/schema.fixture';
import { createOneTable } from '../create-one-table';

jest.mock('../crypto', () => ({
  oneTableCrypto: {
    primary: {
      cipher: 'cipher',
      password: 'password',
    },
  },
}));

describe('createOneTable', () => {
  it('should return a OneTable instance', () => {
    const result = createOneTable({
      client: {},
      name: 'TestTable',
      schema: testTableSchema,
    });
    expect(result).toBeDefined();
  });
});
