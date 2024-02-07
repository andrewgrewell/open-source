import { TableModelName } from '../../types';
import { createStarWarsRbacSchema } from '../create-star-wars-rbac-schema';
import { createRbacSchema } from '@ag-oss/one-table';

jest.mock('@ag-oss/one-table', () => ({
  createRbacSchema: jest.fn(),
}));

const mockCreateRbacSchema = createRbacSchema as jest.MockedFunction<
  typeof createRbacSchema
>;

describe('createStarWarsRbacSchema', () => {
  it('should create rbac schema', () => {
    createStarWarsRbacSchema([TableModelName.Account], ['id', 'email']);
    expect(mockCreateRbacSchema.mock.calls[0]).toMatchInlineSnapshot(`
      [
        [
          "admin",
          "user",
        ],
        [
          "Account",
        ],
        [
          "id",
          "email",
        ],
      ]
    `);
  });
});
