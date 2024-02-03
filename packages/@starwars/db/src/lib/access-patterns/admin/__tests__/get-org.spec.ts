import { defaultDbFixture } from '../../../../__fixtures__/default-db.fixture';
import { createMockModelMap, createMockTable } from '../../../../__test-utils__';
import { TableModelsMap } from '../../../types';
import { getOrg } from '../get-org';

describe('getOrg', () => {
  it('should get an org', async function () {
    const table = createMockTable();
    const modelMap = createMockModelMap({ current: defaultDbFixture }, table);
    await getOrg.executor('org1', modelMap as unknown as TableModelsMap);
    expect(modelMap.Org.get).toHaveBeenCalledWith({ pk: 'org#org1', sk: 'org#' });
  });
});
