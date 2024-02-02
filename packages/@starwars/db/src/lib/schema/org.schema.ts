import { TableModelName } from '../types';
import { createStarWarsRbacSchema } from '../utils/create-star-wars-rbac-schema';
import { withCommonAttributes } from './common.schema';
import { fieldValidators } from '@ag-oss/one-table';

const orgSchemaDef = {
  Org: {
    code: { required: true, type: String, validate: fieldValidators.kebabCase },
    gs1pk: { type: String, value: 'org#' },
    gs1sk: { type: String, value: 'org#${id}' },
    name: {
      required: true,
      type: String,
      validate: fieldValidators.name,
    },
    ownerId: { type: String },
    pk: { type: String, value: 'org#${id}' },
    sk: { type: String, value: 'org#' },
  },
} as const;

export const OrgAccessSchema = {
  OrgAccess: createStarWarsRbacSchema(
    [TableModelName.Org],
    Object.keys(orgSchemaDef.Org),
  ),
};

export const orgSchema = {
  ...withCommonAttributes(orgSchemaDef),
  ...OrgAccessSchema,
} as const;
