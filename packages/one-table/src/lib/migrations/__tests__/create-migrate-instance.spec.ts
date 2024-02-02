import { migrationMapFixture } from '../../../__fixtures__/migration-map.fixture';
import { createMockMigrateInstance } from '../../../__test-utils__/create-mock-migrate-instance';
import { convertMigrationsMapToConfigArray } from '../convert-migrations-map-to-config-array';
import { createMigrateInstance } from '../create-migrate-instance';
import { Migrate } from 'onetable-migrate';

jest.mock('onetable-migrate', () => ({
  Migrate: jest.fn(() => createMockMigrateInstance({ currentVersion: '0.0.0' })),
}));

const mockMigrate = Migrate as jest.Mock;

describe('createMigrateInstance', () => {
  it('should create and init a OneTable Migrate instance', async () => {
    const params = {};
    const migrate = await createMigrateInstance(
      convertMigrationsMapToConfigArray(migrationMapFixture),
      params,
    );
    expect(mockMigrate).toHaveBeenCalledTimes(1);
    expect(migrate.init).toHaveBeenCalledTimes(1);
  });
});
