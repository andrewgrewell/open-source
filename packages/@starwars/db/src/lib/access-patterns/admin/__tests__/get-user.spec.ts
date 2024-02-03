import { defaultDbFixture } from '../../../../__fixtures__/default-db.fixture';
import { createMockModelMap, createMockTable } from '../../../../__test-utils__';
import { TableModelsMap } from '../../../types';
import { getUserForOrgById } from '../get-user';

describe('getUser', () => {
  it('should get an org', async function () {
    const table = createMockTable();
    const modelMap = createMockModelMap({ current: defaultDbFixture }, table);
    await getUserForOrgById.executor(
      'userId',
      'orgId',
      modelMap as unknown as TableModelsMap,
    );
    expect(modelMap.User.get).toHaveBeenCalledWith({
      gs1sk: 'user#userId',
      pk: 'org#orgId',
    });
  });
});
