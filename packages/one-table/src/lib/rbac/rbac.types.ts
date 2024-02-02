import { rbacSchema } from './rbac.schema';
import { Entity } from 'dynamodb-onetable';

export const rbacActionTypes = [
  'create:any',
  'create:own',
  'read:any',
  'read:own',
  'update:any',
  'update:own',
  'delete:any',
  'delete:own',
] as const;

export type RbacAction = (typeof rbacActionTypes)[number];

export type RbacAttribute<T extends string = string> = '*' | T;

export interface RbacDefinition<
  Role extends string,
  Resource extends string,
  Action extends RbacAction,
  Attribute extends RbacAttribute,
> {
  role: Role;
  resource: Resource;
  action: Action;
  attributes: Attribute[];
}

export type RbacModel = Entity<typeof rbacSchema.Rbac>;
