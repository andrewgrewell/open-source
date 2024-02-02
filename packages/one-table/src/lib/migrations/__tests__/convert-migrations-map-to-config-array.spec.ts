import { migrationMapFixture } from '../../../__fixtures__/migration-map.fixture';
import { convertMigrationsMapToConfigArray } from '../convert-migrations-map-to-config-array';

describe('convertMigrationsMapToConfigArray', () => {
  it('should convert migration config map to migration config array', () => {
    expect(convertMigrationsMapToConfigArray(migrationMapFixture)).toEqual([
      {
        description: 'test migration 1',
        down: expect.any(Function),
        schema: expect.any(Object),
        up: expect.any(Function),
        version: '0.0.1',
      },
      {
        description: 'test migration 2',
        down: expect.any(Function),
        schema: expect.any(Object),
        up: expect.any(Function),
        version: '0.0.2',
      },
    ]);
  });
});
