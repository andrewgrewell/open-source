import { fieldValidators, createSharedAttributesProvider } from '@ag-oss/one-table';

const commonAttributes = {
  id: { generate: 'ulid', required: true, type: String, validate: fieldValidators.ulid },
} as const;

export const withCommonAttributes =
  createSharedAttributesProvider<typeof commonAttributes>(commonAttributes);

export const asAccountItem = createSharedAttributesProvider({
  accountId: { required: true, type: String },
  pk: { type: String, value: 'account#${accountId}' },
});
