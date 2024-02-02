import { StarWarsTable, TableModelName } from '../../types';
import { createStarWarsModels } from '../create-star-wars-models';
import { createMockTable } from '@ag-oss/one-table';

describe('createStarWarsModels', () => {
  it.each(['Org', 'User'])('should create %s model', (modelName) => {
    const table = createMockTable();
    table.getModel.mockImplementation((name: TableModelName) => name);
    const models = createStarWarsModels(table as never as StarWarsTable);
    expect(table.getModel).toHaveBeenCalledWith(modelName);
    expect(models[modelName as TableModelName]).toBeDefined();
  });

  it('should have the table on the table model on the model map', function () {
    const table = createMockTable();
    const models = createStarWarsModels(table as never as StarWarsTable);
    expect(models.table).toBe(table);
  });
});
