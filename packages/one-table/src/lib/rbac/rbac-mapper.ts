import { RbacAction, RbacAttribute, RbacDefinition, RbacModel } from './rbac.types';
import { stringListToArray } from '@ag-oss/strings';

export function rbacToDb<
  Role extends string,
  Resource extends string,
  Action extends RbacAction,
  Attribute extends RbacAttribute,
>(rbacDefinition: RbacDefinition<Role, Resource, Action, Attribute>): RbacModel {
  return {
    ...rbacDefinition,
    attributes: rbacDefinition.attributes.join(','),
  };
}

export function rbacFromDb<
  Role extends string,
  Resource extends string,
  Attribute extends RbacAttribute,
>(model: RbacModel) {
  return {
    action: model.action,
    attributes: stringListToArray(model.attributes),
    resource: model.resource,
    role: model.role,
  } as RbacDefinition<Role, Resource, RbacAction, Attribute>;
}
