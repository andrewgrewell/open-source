import { createStarWarsModels } from '../create-star-wars-models';
import { createStarWarsTable } from '../create-star-wars-table';
import { initializeStarWarsDb } from '../initialize-star-wars-db';
import { createMockTable } from '@ag-oss/one-table';

jest.mock('../create-star-wars-models');
jest.mock('../create-star-wars-table');
jest.mock('@ag-oss/console-ui', () => {
  const actual = jest.requireActual('@ag-oss/console-ui');
  return {
    ...actual,
    withPrettyOutput: jest.fn((fn) =>
      fn({ spinner: { start: jest.fn(), succeed: jest.fn() } }),
    ),
  };
});

describe('initializeStarWarsDb', () => {
  const setup = () => {
    const mockTable = createMockTable();
    (createStarWarsTable as jest.Mock).mockReturnValue(mockTable);
    const mockModels = { foo: 'bar' };
    (createStarWarsModels as jest.Mock).mockReturnValue(mockModels);
    return {
      mockModels,
      mockTable,
    };
  };

  it('should create table if not exits', async () => {
    const { mockTable } = setup();
    mockTable.exists.mockResolvedValue(false);
    await initializeStarWarsDb();
    expect(mockTable.createTable).toHaveBeenCalled();
  });

  it('should return models and table', async () => {
    const { mockModels, mockTable } = setup();
    const result = await initializeStarWarsDb();
    expect(result).toEqual({ models: mockModels, table: mockTable });
  });
});
