import { TableModelName, TableModelsMap } from '../types';

export const getAllEntitiesForOrg = {
  executor: async (orgId: string, { table }: TableModelsMap) => {
    return table.fetch([TableModelName.Org, TableModelName.User], { pk: `org#${orgId}` });
  },
  params: [
    {
      name: 'orgId',
      type: 'string',
    },
  ],
};
