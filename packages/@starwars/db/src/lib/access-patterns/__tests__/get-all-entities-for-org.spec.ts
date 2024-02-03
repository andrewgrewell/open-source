import { TableModelsMap } from '../../types';
import { getAllEntitiesForOrg } from '../get-all-entities-for-org';

describe('getAllEntitiesForOrg', () => {
  it('should fetch all entities for org', function () {
    const orgId = 'orgId';
    const table = {
      fetch: jest.fn(),
    };
    getAllEntitiesForOrg.executor(orgId, { table } as never as TableModelsMap);
    expect(table.fetch).toHaveBeenCalledWith(['Org', 'User'], { pk: `org#${orgId}` });
  });
});
