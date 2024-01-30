import { createRbacSchema } from '../create-rbac-schema';

describe('createRbacSchema', () => {
  it('should create a rbac schema', function () {
    const rbacSchema = createRbacSchema(
      ['admin', 'user'],
      ['user', 'product'],
      ['id', 'name'],
    );
    expect(rbacSchema).toEqual({
      action: {
        enum: [
          'create:any',
          'create:own',
          'read:any',
          'read:own',
          'update:any',
          'update:own',
          'delete:any',
          'delete:own',
        ],
        require: true,
        type: String,
      },
      attributes: { enum: ['id', 'name', '*'], required: true, type: String },
      gs1pk: { type: String, value: 'rbac#' },
      gs1sk: { type: String, value: 'rbac#${resource}#${action}' },
      pk: { type: String, value: 'rbac#${role}' },
      resource: { enum: ['user', 'product'], required: true, type: String },
      role: { enum: ['admin', 'user'], required: true, type: String },
      sk: { type: String, value: 'rbac#${resource}#${action}' },
    });
  });
});
