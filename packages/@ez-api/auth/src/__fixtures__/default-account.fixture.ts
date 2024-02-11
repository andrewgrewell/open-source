import { IAccount } from '../lib/table';

export const defaultAccountFixture = {
  email: 'account-1@email.com',
  id: 'account-id-1',
  password: 'password',
  pk: 'account#account-id-1',
  role: 'user',
  sk: 'account#account-1@email.com',
} as IAccount;
