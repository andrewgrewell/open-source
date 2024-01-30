import { rbacActionTypes, RbacAttribute } from './rbac.types';

export function createRbacSchema<
  Role extends string,
  Resource extends string,
  Attribute extends string = string,
>(roles: Role[], resources: Resource[], attributes: RbacAttribute<Attribute>[]) {
  if (!attributes || !attributes.includes('*')) {
    attributes = (attributes || []).concat(['*']);
  }
  return {
    action: { enum: rbacActionTypes, require: true, type: String },
    attributes: { enum: attributes, required: true, type: String },
    gs1pk: { type: String, value: 'rbac#' },
    gs1sk: { type: String, value: 'rbac#${resource}#${action}' },
    pk: { type: String, value: 'rbac#${role}' },
    resource: { enum: resources, required: true, type: String },
    role: { enum: roles, required: true, type: String },
    sk: { type: String, value: 'rbac#${resource}#${action}' },
  } as const;
}
