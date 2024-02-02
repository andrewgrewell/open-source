/// <reference types="jest" />

import MockableFunction = jest.MockableFunction;

export const MODEL_METHOD_NAMES = [
  'create',
  'find',
  'get',
  'init',
  'remove',
  'scan',
  'update',
] as const;

export type MockModelMethodName = (typeof MODEL_METHOD_NAMES)[number];

export type MockModel<MockType extends MockableFunction = jest.Mock> = Record<
  MockModelMethodName,
  jest.MockedFn<MockType>
>;
export function createMockModel() {
  const mockModel: MockModel = {
    create: jest.fn(),
    find: jest.fn(),
    get: jest.fn(),
    init: jest.fn(),
    remove: jest.fn(),
    scan: jest.fn(),
    update: jest.fn(),
  };
  return mockModel;
}
