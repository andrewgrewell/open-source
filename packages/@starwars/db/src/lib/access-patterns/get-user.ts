import { TableModelsMap } from '../types';

export const getUserForOrgById = {
  executor: async (userId: string, orgId: string, { User }: TableModelsMap) => {
    return User.get({ gs1sk: `user#${userId}`, pk: `org#${orgId}` });
  },
  params: [
    {
      name: 'userId',
      type: 'string',
    },
    {
      name: 'orgId',
      type: 'string',
    },
  ],
};
