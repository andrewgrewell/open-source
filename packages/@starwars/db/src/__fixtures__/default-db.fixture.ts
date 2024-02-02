import { defaultOrgFixture } from './default-org.fixture';
import { defaultUserFixture } from './default-user.fixture';

export const defaultDbFixture = {
  Org: [defaultOrgFixture],
  User: [defaultUserFixture],
};

export type DbFixture = typeof defaultDbFixture;
