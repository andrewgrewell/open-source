import { TableModelsMap } from '../../types';

export const getOrg = {
  executor: async (orgId: string, { Org }: TableModelsMap) => {
    return Org.get({ pk: `org#${orgId}`, sk: 'org#' });
  },
  params: [
    {
      name: 'orgId',
      type: 'string',
    },
  ],
};
