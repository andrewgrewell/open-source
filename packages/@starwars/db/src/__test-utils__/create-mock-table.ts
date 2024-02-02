/// <reference types="jest" />
import { DbFixture } from '../__fixtures__/default-db.fixture';
import { TableModelName } from '../lib/types';
import { createMockModelMap } from './create-mock-model-map';
import { createMockTable as createMockOneTable } from '@ag-oss/one-table';

export function createMockTable(dbFixture?: DbFixture) {
  const mockDbRef = {
    current: dbFixture,
  };
  const table = createMockOneTable();
  const modelMap = createMockModelMap(mockDbRef, table);
  table.getModel.mockImplementation((modelName: TableModelName) => {
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
        Org: [],
        User: [],
      };
    }
    return table;
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  table.__mockDbRef = mockDbRef;
  return table as ReturnType<typeof createMockOneTable> & {
    __mockDbRef: typeof mockDbRef;
  };
}
