import { TableModelName } from '../types';
import { createStarWarsRbacSchema } from '../utils/create-star-wars-rbac-schema';
import { withCommonAttributes } from './common.schema';
import { fieldValidators } from '@ag-oss/one-table';

/**
 * UserSchema: pk = org#orgId sk = user@userId
 */
const userSchemaDef = {
  User: {
    displayName: { required: true, type: String, validate: fieldValidators.name },
    email: {
      crypt: true,
      required: true,
      type: String,
      validate: fieldValidators.email,
    },
    gs1pk: { type: String, value: 'user#' },
    gs1sk: { type: String, value: 'user#${id}' },
    id: {
      generate: 'ulid',
      required: true,
      type: String,
      validate: fieldValidators.ulid,
    },
    orgId: { required: true, type: String },
    password: {
      crypt: true,
      required: true,
      type: String,
      validate: fieldValidators.password,
    },
    pk: { type: String, value: 'org#${orgId}' },
    sk: { type: String, value: 'user#${email}' },
    stats: {
      default: {},
      schema: {
        location: { type: String },
        totalPlayTime: { type: Number },
        totalPurchaseCount: { type: Number },
        totalSpent: { type: Number },
      },
      type: Object,
    },
  },
} as const;

export const userAccessSchema = {
  UserAccess: createStarWarsRbacSchema(
    [TableModelName.User],
    Object.keys(userSchemaDef.User),
  ),
};

export const userSchema = {
  ...withCommonAttributes(userSchemaDef),
  ...userAccessSchema,
};
