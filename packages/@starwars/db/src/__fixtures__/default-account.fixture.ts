import { IAccount } from '../lib/types';

export const defaultAccountFixture = {
  email: 'account-1@email.com',
  id: 'account-id-1',
  name: 'account-1',
  password: 'password',
  pk: 'account#account-id-1',
  sk: 'account#account-1@email.com#account-1',
} as IAccount;
