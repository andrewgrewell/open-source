import { AuthTable, authTableSchema } from '../../table';
import { getAuthModels } from '../get-auth-models';
import { createMockTable } from '@ag-oss/one-table';

describe('getAuthModels', () => {
  it('should return all auth models', () => {
    const mockTable = createMockTable();

    // @ts-expect-error - returning a string for easier assertion
    mockTable.getModel.mockImplementation((modelName) => modelName);

    const result = getAuthModels(mockTable as never as AuthTable);
    const expectedResult = {};
    Object.keys(authTableSchema.models).forEach((modelName) => {
      expectedResult[modelName] = modelName;
    });

    expect(result).toEqual(expectedResult);
  });
});
