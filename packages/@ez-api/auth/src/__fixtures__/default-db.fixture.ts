import { defaultAccountFixture } from './default-account.fixture';

export const defaultDbFixture = {
  Account: [defaultAccountFixture],
};

export type DbFixture = typeof defaultDbFixture;
