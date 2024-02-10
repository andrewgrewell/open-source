import { createMockModel, createMockTable } from '@ag-oss/one-table';
import { Model } from 'dynamodb-onetable';
import { AuthModels, IAccount, IAccountToken, IAccountVerifyCode } from '../lib/table';
import { MockDbRef } from './types';
import { createMockAccountModel } from './create-mock-account-model';

type Table = ReturnType<typeof createMockTable>;

export function createMockModelMap(
  mockDbRef: MockDbRef,
  table: jest.Mocked<Table>,
): AuthModels {
  const modelMap: AuthModels = {
    Account: createMockAccountModel(mockDbRef) as never as Model<IAccount>,
    // TODO: create this mock and test the account token flow
    AccountToken: createMockModel() as never as Model<IAccountToken>,
    AccountVerifyCode: createMockModel() as never as Model<IAccountVerifyCode>,
  };
  table.getModel.mockImplementation((modelName: keyof AuthModels) => {
    return modelMap[modelName];
  });
  return {
    ...modelMap,
    table,
  } as never as AuthModels;
}
