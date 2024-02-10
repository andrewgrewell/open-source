/// <reference types="jest" />
import { DbFixture } from '../__fixtures__/default-db.fixture';
import { createMockModelMap } from './create-mock-model-map';
import { createMockTable as createMockOneTable } from '@ag-oss/one-table';
import { AuthModels } from '../lib/table';

export function createMockTable(dbFixture?: DbFixture) {
  const mockDbRef = {
    current: dbFixture,
  };
  const table = createMockOneTable();
  const modelMap = createMockModelMap(mockDbRef, table);
  table.getModel.mockImplementation((modelName: keyof AuthModels) => {
    return modelMap[modelName];
  });
  table.exists.mockImplementation(async () => {
    return !!mockDbRef.current;
  });
  table.createTable.mockImplementation(async () => {
    if (mockDbRef.current) {
      throw new Error('Table already exists');
    } else {
      mockDbRef.current = {
        Account: [],
      };
    }
    return table;
  });
  table.deleteTable.mockImplementation(async () => {
    if (mockDbRef.current) {
      mockDbRef.current = undefined;
    } else {
      throw new Error('Table does not exist');
    }
    return table;
  });
  // @ts-expect-error - adding properties to mock
  table.__modelMap = modelMap;
  // @ts-expect-error - adding properties to mock
  table.__mockDbRef = mockDbRef;
  return table as ReturnType<typeof createMockOneTable> & {
    __mockDbRef: typeof mockDbRef;
    __modelMap: typeof modelMap;
  };
}
