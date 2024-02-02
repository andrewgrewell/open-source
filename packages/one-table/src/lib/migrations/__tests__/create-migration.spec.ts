import { migrationConfigFixture } from '../../../__fixtures__/migration-config.fixture';
import { createMockTable } from '../../../__test-utils__/create-mock-table';
import { createMigration } from '../create-migration';
import { createMockObject } from '@ag-oss/test-utils-js';
import { mockConsole } from '@ag-oss/logging';

jest.mock('../../utils/create-dry-run-db', () => ({
  createDryRunDb: jest.fn((db) => db),
}));

interface SetupConfig {
  dry?: boolean;
}

describe('createMigration', () => {
  const consoleMock = mockConsole(console);
  const setup = (config?: SetupConfig) => {
    const db = createMockTable();
    const migrate = createMockObject();
    const params = { dry: !!config?.dry };
    return {
      db,
      migrate,
      migration: createMigration(migrationConfigFixture),
      params,
    };
  };
  it('should return a migration that can be used with one-table/migrate', () => {
    const { migration } = setup();
    expect(migration).toMatchInlineSnapshot(`
      {
        "description": "test migration",
        "down": [Function],
        "schema": {
          "indexes": {
            "gs1": {
              "hash": "gs1pk",
              "project": [
                "gs1pk",
                "gs1sk",
              ],
              "sort": "gs1sk",
            },
            "primary": {
              "hash": "pk",
              "sort": "sk",
            },
          },
          "models": {
            "TestEntity": {
              "data": {
                "type": [Function],
              },
              "description": {
                "type": [Function],
              },
              "gs1pk": {
                "type": [Function],
                "value": "test-entity#",
              },
              "gs1sk": {
                "type": [Function],
                "value": "test-entity#\${name}\${id}",
              },
              "id": {
                "generate": "ulid",
                "type": [Function],
              },
              "name": {
                "type": [Function],
              },
              "pk": {
                "type": [Function],
                "value": "test-entity#\${id}",
              },
              "sk": {
                "type": [Function],
                "value": "test-entity#",
              },
              "tags": {
                "default": [],
                "items": {
                  "type": [Function],
                },
                "type": [Function],
              },
              "title": {
                "type": [Function],
              },
            },
          },
          "params": {
            "isoDates": true,
            "timestamps": true,
          },
          "version": "0.0.1",
        },
        "up": [Function],
        "version": "0.0.1",
      }
    `);
  });

  it('should wrap up and down functions in order to provide utils and dry run db', () => {
    const { migration } = setup();
    expect(migration.up).not.toEqual(migrationConfigFixture.up);
    expect(migration.down).not.toEqual(migrationConfigFixture.down);
  });

  it('should pass params from one-table migrate to up and down functions', async () => {
    const { migration, db, migrate, params } = setup({ dry: true });
    await migration.up(db, migrate, params);
    expect(migrationConfigFixture.up).toHaveBeenCalledWith({
      db,
      dryLog: expect.any(Function),
      migrate,
      params,
    });
    await migration.down(db, migrate, params);
    expect(migrationConfigFixture.down).toHaveBeenCalledWith({
      db,
      dryLog: expect.any(Function),
      migrate,
      params,
    });
  });

  it('should pass a dryLog function for logging only if dry is true', async () => {
    const result = createMigration({
      ...migrationConfigFixture,
      up: ({ dryLog }) => {
        dryLog('test');
      },
    });
    await result.up(createMockTable(), createMockObject(), { dry: true });
    expect(consoleMock.spies.log).toHaveBeenCalledWith('test');
  });
});
