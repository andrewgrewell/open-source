import { Entity, Model, OneSchema, Table } from 'dynamodb-onetable';

export const schemaModelsFixture = {
  TestEntity: {
    data: { type: Object },
    description: { type: String },
    gs1pk: { type: String, value: 'test-entity#' },
    gs1sk: { type: String, value: 'test-entity#${name}${id}' },
    id: { generate: 'ulid', type: String },
    name: { type: String },
    pk: { type: String, value: 'test-entity#${id}' },
    sk: { type: String, value: 'test-entity#' },
    tags: { default: [], items: { type: String }, type: Array },
    title: { type: String },
  },
};

export const testTableSchema: OneSchema = {
  indexes: {
    gs1: { hash: 'gs1pk', project: ['gs1pk', 'gs1sk'], sort: 'gs1sk' },
    primary: { hash: 'pk', sort: 'sk' },
  },
  models: schemaModelsFixture,
  params: {
    isoDates: true,
    timestamps: true,
  },
  version: '0.0.1',
} as const;

export type ITestEntity = Entity<typeof schemaModelsFixture.TestEntity>;

export type TestEntityModel = Model<ITestEntity>;

export type TestTable = Table<typeof testTableSchema>;
