import { DbFixture } from '../__fixtures__/default-db.fixture';
import { TableModelName } from '../lib/types';
import { createMockModel, createMockTable } from '@ag-oss/one-table';

type Table = ReturnType<typeof createMockTable>;
type MockDbRef = { current?: DbFixture };

export function createMockModelMap(mockDbRef: MockDbRef, table: Table) {
  const modelMap = {
    Org: setupMockOrg(mockDbRef),
    User: setupMockUser(mockDbRef),
  };
  table.getModel.mockImplementation((modelName: TableModelName) => {
    return modelMap[modelName];
  });
  return {
    ...modelMap,
    table,
  };
}

function setupMockOrg(dbRef: MockDbRef) {
  // create mock model
  const Org = createMockModel();
  let orgCount = dbRef.current?.Org?.length || 0;
  Org.create.mockImplementation((orgCreate) => {
    if (!dbRef.current) {
      throw new Error('Table does not exist');
    }
    const orgs = dbRef.current?.Org ?? [];
    orgCount += 1;
    const orgId = `org-id-${orgCount}`;
    const newOrg = {
      ...orgCreate,
      id: orgId,
      pk: `org#${orgId}`,
    };
    const exists = orgs.find((org) => org.pk === newOrg.pk);
    if (exists) {
      throw new Error('Org already exists');
    }
    dbRef.current.Org = [...orgs, newOrg];
    return newOrg;
  });
  Org.get.mockImplementation((orgId) => {
    if (!dbRef.current) {
      throw new Error('Table does not exist');
    }
    const orgs = dbRef.current?.Org ?? [];
    const org = orgs.find((org) => org.id === orgId);
    if (!org) {
      return undefined;
    }
    return org;
  });
  Org.update.mockImplementation((orgUpdate) => {
    if (!dbRef.current) {
      throw new Error('Table does not exist');
    }
    const orgs = dbRef.current?.Org ?? [];
    const org = orgs.find((org) => org.pk === orgUpdate.pk);
    if (!org) {
      throw new Error('Org does not exist');
    }
    const update = { ...org, orgUpdate };
    const index = orgs.findIndex((org) => org.pk === orgUpdate.pk);
    dbRef.current.Org.splice(index, 1, update);
    dbRef.current.Org = [...dbRef.current.Org];
    return org;
  });
  return Org;
}

function setupMockUser(dbRef: MockDbRef) {
  const User = createMockModel();
  let userCount = dbRef.current?.User?.length || 0;
  User.create.mockImplementation((userCreate) => {
    if (!dbRef.current) {
      throw new Error('Table does not exist');
    }
    const users = dbRef.current?.User ?? [];
    userCount += 1;
    const newUser = {
      ...userCreate,
      id: `user-id-${userCount}`,
      pk: `user#${userCreate.email}`,
    };
    const exists = users.find((user) => user.email === newUser.email);
    if (exists) {
      throw new Error('User already exists');
    }
    dbRef.current.User = [...users, newUser];
    return newUser;
  });
  User.get.mockImplementation((userGet) => {
    if (!dbRef.current) {
      throw new Error('Table does not exist');
    }
    const users = dbRef.current?.User ?? [];
    const user = users.find((user) => user.pk === userGet.pk);
    if (!user) {
      return undefined;
    }
    return user;
  });
  return User;
}
