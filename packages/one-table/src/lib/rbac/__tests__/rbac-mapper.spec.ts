import { rbacFromDb, rbacToDb } from '../rbac-mapper';
import { RbacDefinition, RbacModel } from '../rbac.types';

describe('rbac-mapper', () => {
  it('should covert a js rbacDefinition to a db rbacModel', function () {
    const rbacDefinition: RbacDefinition<any, any, any, any> = {
      action: 'read:any',
      attributes: ['id', 'name'],
      resource: 'user',
      role: 'admin',
    };
    const rbacModel = rbacToDb(rbacDefinition);
    expect(rbacModel).toEqual({
      action: 'read:any',
      attributes: 'id,name',
      resource: 'user',
      role: 'admin',
    });
  });

  it('should convert from a db rbacModel to a js rbacDefinition', function () {
    const rbacModel: RbacModel = {
      action: 'read:any',
      attributes: 'id,name',
      resource: 'user',
      role: 'admin',
    };
    const rbacDefinition = rbacFromDb(rbacModel);
    expect(rbacDefinition).toEqual({
      action: 'read:any',
      attributes: ['id', 'name'],
      resource: 'user',
      role: 'admin',
    });
  });
});
