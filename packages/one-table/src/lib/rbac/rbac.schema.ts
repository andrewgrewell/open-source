import { rbacActionTypes } from './rbac.types';

export const rbacSchema = {
  Rbac: {
    action: { enum: rbacActionTypes, require: true, type: String },
    attributes: { required: true, type: String },
    gs1pk: { type: String, value: 'rbac#' },
    gs1sk: { type: String, value: 'rbac#${resource}#${action}' },
    pk: { type: String, value: 'rbac#${role}' },
    resource: { required: true, type: String },
    role: { required: true, type: String },
    sk: { type: String, value: 'rbac#${resource}#${action}' },
  } as const,
};
