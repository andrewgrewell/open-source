import { TableModelName, UserRoles } from '../types';
import { createRbacSchema } from '@ag-oss/one-table';

export function createStarWarsRbacSchema<Attribute extends string = string>(
  resources: TableModelName[],
  attributes: Attribute[],
) {
  return createRbacSchema<UserRoles, TableModelName, Attribute>(
    Object.values(UserRoles),
    resources,
    attributes,
  );
}
