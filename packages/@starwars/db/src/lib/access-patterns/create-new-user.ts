import { TableModelsMap } from '../types';
import { verboseLogger as log } from '@ag-oss/logging';
import { kebabCase } from 'lodash';

export interface CreateNewUserConfig {
  orgId?: string;
  email: string;
  displayName: string;
  password: string;
}

/**
 * Creates a new user and optionally adds them to an org.
 * If no orgId is provided, a new org will be created and the user will be added to it.
 * @param config
 * @param models
 */
async function createNewUserExecutor(
  config: CreateNewUserConfig,
  models: TableModelsMap,
) {
  const { User, Org } = models;
  const userCreate = {
    displayName: config.displayName,
    email: config.email,
    password: config.password,
  };
  if (config.orgId) {
    // TODO an invitation needs to exist to verify that a new user can join org
    const user = await User.create({
      ...userCreate,
      orgId: config.orgId,
    });
    log.verbose(`User created with id ${user.id} and added to org ${config.orgId}`);
    return user;
  } else {
    // TODO creating the org and user needs to be in a transaction
    const org = await Org.create({
      code: `${kebabCase(config.displayName)}`,
      name: `${config.displayName}'s Organization`,
    });
    log.verbose(`User org created with id ${org.id}`);
    const user = await User.create({
      ...userCreate,
      orgId: org.id,
    });
    log.verbose(`User created with id ${user.id}`);
    await Org.update({ ownerId: user.id, pk: `org#${org.id}` });
    log.verbose(`Org owner updated to user id ${user.id}`);
    return user;
  }
}

export const createNewUser = {
  executor: createNewUserExecutor,
  params: [
    {
      name: 'createNewUserConfig',
      params: [
        {
          name: 'orgId',
          type: 'string',
        },
        {
          name: 'email',
          type: 'string',
        },
        {
          name: 'displayName',
          type: 'string',
        },
        {
          name: 'password',
          type: 'string',
        },
      ],
      type: 'object',
    },
  ],
};
