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
              "Account": {
                "email": {
                  "crypt": true,
                  "required": true,
                  "type": [Function],
                  "validate": /\\^\\(\\(\\[\\^<>\\(\\)\\[\\\\\\]\\\\\\\\\\.,;:\\\\s@"\\]\\+\\(\\\\\\.\\[\\^<>\\(\\)\\[\\\\\\]\\\\\\\\\\.,;:\\\\s@"\\]\\+\\)\\*\\)\\|\\("\\.\\+"\\)\\)@\\(\\(\\\\\\[\\[0-9\\]\\{1,3\\}\\\\\\.\\[0-9\\]\\{1,3\\}\\\\\\.\\[0-9\\]\\{1,3\\}\\\\\\.\\[0-9\\]\\{1,3\\}\\]\\)\\|\\(\\(\\[a-zA-Z\\\\-0-9\\]\\+\\\\\\.\\)\\+\\[a-zA-Z\\]\\{2,\\}\\)\\)\\$/,
                },
                "gs1pk": {
                  "type": [Function],
                  "value": "account#\${email}",
                },
                "gs1sk": {
                  "type": [Function],
                  "value": "account#",
                },
                "id": {
                  "generate": "ulid",
                  "required": true,
                  "type": [Function],
                  "validate": /\\^\\[0123456789ABCDEFGHJKMNPQRSTVWXYZ\\]\\{26\\}\\$/,
                },
                "password": {
                  "crypt": true,
                  "required": true,
                  "type": [Function],
                  "validate": /\\^\\(\\?=\\.\\*\\[a-z\\]\\)\\(\\?=\\.\\*\\[A-Z\\]\\)\\(\\?=\\.\\*\\\\d\\)\\(\\?=\\.\\*\\[@\\$!%\\*\\?&\\]\\)\\[A-Za-z\\\\d@\\$!%\\*\\?&\\]\\{8,\\}\\$/,
                },
                "pk": {
                  "type": [Function],
                  "value": "account#\${id}",
                },
                "sk": {
                  "type": [Function],
                  "value": "account#",
                },
                "verifiedEmail": {
                  "type": [Function],
                },
              },
              "AccountAccess": {
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
                    "id",
                    "email",
                    "gs1pk",
                    "gs1sk",
                    "password",
                    "pk",
                    "sk",
                    "verifiedEmail",
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
                    "Account",
                  ],
                  "required": true,
                  "type": [Function],
                },
                "role": {
                  "enum": [
                    "admin",
                    "user",
                  ],
                  "required": true,
                  "type": [Function],
                },
                "sk": {
                  "type": [Function],
                  "value": "rbac#\${resource}#\${action}",
                },
              },
              "AccountToken": {
                "accountId": {
                  "required": true,
                  "type": [Function],
                },
                "email": {
                  "crypt": true,
                  "required": true,
                  "type": [Function],
                  "validate": /\\^\\(\\(\\[\\^<>\\(\\)\\[\\\\\\]\\\\\\\\\\.,;:\\\\s@"\\]\\+\\(\\\\\\.\\[\\^<>\\(\\)\\[\\\\\\]\\\\\\\\\\.,;:\\\\s@"\\]\\+\\)\\*\\)\\|\\("\\.\\+"\\)\\)@\\(\\(\\\\\\[\\[0-9\\]\\{1,3\\}\\\\\\.\\[0-9\\]\\{1,3\\}\\\\\\.\\[0-9\\]\\{1,3\\}\\\\\\.\\[0-9\\]\\{1,3\\}\\]\\)\\|\\(\\(\\[a-zA-Z\\\\-0-9\\]\\+\\\\\\.\\)\\+\\[a-zA-Z\\]\\{2,\\}\\)\\)\\$/,
                },
                "pk": {
                  "type": [Function],
                  "value": "account#\${accountId}",
                },
                "sk": {
                  "type": [Function],
                  "value": "token#\${email}",
                },
                "token": {
                  "crypt": true,
                  "required": true,
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
        },
      ]
    `);
  });
});
