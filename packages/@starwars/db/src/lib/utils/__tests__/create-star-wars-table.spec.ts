import { createStarWarsTable } from '../create-star-wars-table';
import { createOneTable } from '@ag-oss/one-table';

jest.mock('@ag-oss/one-table', () => {
  const actual = jest.requireActual('@ag-oss/one-table');
  return {
    ...actual,
    createOneTable: jest.fn(),
  };
});

const mockCreateOneTable = createOneTable as jest.MockedFunction<typeof createOneTable>;
describe('createStarWarsTable', () => {
  it('should create StarWars table', () => {
    createStarWarsTable();
    expect(mockCreateOneTable.mock.calls[0]).toMatchInlineSnapshot(`
      [
        {
          "client": undefined,
          "logger": undefined,
          "name": "StarWarsTable",
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
              "Org": {
                "code": {
                  "required": true,
                  "type": [Function],
                  "validate": /\\^\\[a-z\\]\\+\\(-\\[a-z\\]\\+\\)\\*\\$/,
                },
                "gs1pk": {
                  "type": [Function],
                  "value": "org#",
                },
                "gs1sk": {
                  "type": [Function],
                  "value": "org#\${id}",
                },
                "id": {
                  "generate": "ulid",
                  "required": true,
                  "type": [Function],
                  "validate": /\\^\\[0123456789ABCDEFGHJKMNPQRSTVWXYZ\\]\\{26\\}\\$/,
                },
                "name": {
                  "required": true,
                  "type": [Function],
                  "validate": /\\^\\[a-z0-9 ,\\.'-\\]\\+\\$/i,
                },
                "ownerId": {
                  "type": [Function],
                },
                "pk": {
                  "type": [Function],
                  "value": "org#\${id}",
                },
                "sk": {
                  "type": [Function],
                  "value": "org#",
                },
              },
              "OrgAccess": {
                "action": {
                  "enum": [
                    "create:any",
                    "create:own",
                    "read:any",
                    "read:own",
                    "update:any",
                    "update:own",
                    "delete:any",
                    "delete:own",
                  ],
                  "require": true,
                  "type": [Function],
                },
                "attributes": {
                  "enum": [
                    "code",
                    "gs1pk",
                    "gs1sk",
                    "name",
                    "ownerId",
                    "pk",
                    "sk",
                    "*",
                  ],
                  "required": true,
                  "type": [Function],
                },
                "gs1pk": {
                  "type": [Function],
                  "value": "rbac#",
                },
                "gs1sk": {
                  "type": [Function],
                  "value": "rbac#\${resource}#\${action}",
                },
                "pk": {
                  "type": [Function],
                  "value": "rbac#\${role}",
                },
                "resource": {
                  "enum": [
                    "Org",
                  ],
                  "required": true,
                  "type": [Function],
                },
                "role": {
                  "enum": [
                    "internalAdmin",
                    "internalSupport",
                    "orgAdmin",
                    "orgSupport",
                    "orgMember",
                  ],
                  "required": true,
                  "type": [Function],
                },
                "sk": {
                  "type": [Function],
                  "value": "rbac#\${resource}#\${action}",
                },
              },
              "User": {
                "displayName": {
                  "required": true,
                  "type": [Function],
                  "validate": /\\^\\[a-z0-9 ,\\.'-\\]\\+\\$/i,
                },
                "email": {
                  "crypt": true,
                  "required": true,
                  "type": [Function],
                  "validate": /\\^\\(\\(\\[\\^<>\\(\\)\\[\\\\\\]\\\\\\\\\\.,;:\\\\s@"\\]\\+\\(\\\\\\.\\[\\^<>\\(\\)\\[\\\\\\]\\\\\\\\\\.,;:\\\\s@"\\]\\+\\)\\*\\)\\|\\("\\.\\+"\\)\\)@\\(\\(\\\\\\[\\[0-9\\]\\{1,3\\}\\\\\\.\\[0-9\\]\\{1,3\\}\\\\\\.\\[0-9\\]\\{1,3\\}\\\\\\.\\[0-9\\]\\{1,3\\}\\]\\)\\|\\(\\(\\[a-zA-Z\\\\-0-9\\]\\+\\\\\\.\\)\\+\\[a-zA-Z\\]\\{2,\\}\\)\\)\\$/,
                },
                "gs1pk": {
                  "type": [Function],
                  "value": "user#",
                },
                "gs1sk": {
                  "type": [Function],
                  "value": "user#\${id}",
                },
                "id": {
                  "generate": "ulid",
                  "required": true,
                  "type": [Function],
                  "validate": /\\^\\[0123456789ABCDEFGHJKMNPQRSTVWXYZ\\]\\{26\\}\\$/,
                },
                "orgId": {
                  "required": true,
                  "type": [Function],
                },
                "password": {
                  "crypt": true,
                  "required": true,
                  "type": [Function],
                  "validate": /\\^\\(\\?=\\.\\*\\[a-z\\]\\)\\(\\?=\\.\\*\\[A-Z\\]\\)\\(\\?=\\.\\*\\\\d\\)\\(\\?=\\.\\*\\[@\\$!%\\*\\?&\\]\\)\\[A-Za-z\\\\d@\\$!%\\*\\?&\\]\\{8,\\}\\$/,
                },
                "pk": {
                  "type": [Function],
                  "value": "org#\${orgId}",
                },
                "sk": {
                  "type": [Function],
                  "value": "user#\${email}",
                },
                "stats": {
                  "default": {},
                  "schema": {
                    "location": {
                      "type": [Function],
                    },
                    "totalPlayTime": {
                      "type": [Function],
                    },
                    "totalPurchaseCount": {
                      "type": [Function],
                    },
                    "totalSpent": {
                      "type": [Function],
                    },
                  },
                  "type": [Function],
                },
              },
              "UserAccess": {
                "action": {
                  "enum": [
                    "create:any",
                    "create:own",
                    "read:any",
                    "read:own",
                    "update:any",
                    "update:own",
                    "delete:any",
                    "delete:own",
                  ],
                  "require": true,
                  "type": [Function],
                },
                "attributes": {
                  "enum": [
                    "displayName",
                    "email",
                    "gs1pk",
                    "gs1sk",
                    "id",
                    "orgId",
                    "password",
                    "pk",
                    "sk",
                    "stats",
                    "*",
                  ],
                  "required": true,
                  "type": [Function],
                },
                "gs1pk": {
                  "type": [Function],
                  "value": "rbac#",
                },
                "gs1sk": {
                  "type": [Function],
                  "value": "rbac#\${resource}#\${action}",
                },
                "pk": {
                  "type": [Function],
                  "value": "rbac#\${role}",
                },
                "resource": {
                  "enum": [
                    "User",
                  ],
                  "required": true,
                  "type": [Function],
                },
                "role": {
                  "enum": [
                    "internalAdmin",
                    "internalSupport",
                    "orgAdmin",
                    "orgSupport",
                    "orgMember",
                  ],
                  "required": true,
                  "type": [Function],
                },
                "sk": {
                  "type": [Function],
                  "value": "rbac#\${resource}#\${action}",
                },
              },
            },
            "params": {
              "isoDates": true,
              "timestamps": true,
            },
            "version": "0.0.1",
          },
        },
      ]
    `);
  });
});
