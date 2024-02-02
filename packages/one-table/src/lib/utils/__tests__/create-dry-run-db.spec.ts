import { createDryRunDb } from '../create-dry-run-db';

class TestModel {
  testMethod;
  get;

  constructor() {
    this.testMethod = jest.fn();
    this.get = jest.fn();
  }
}

describe('createDryRunDb', () => {
  let logSpy: jest.SpyInstance;
  let testModel: TestModel;
  let testDb: {
    create: jest.MockedFunction<() => TestModel>;
    getModel: jest.MockedFunction<() => TestModel>;
  };

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log');
    logSpy.mockImplementation(() => {
      // do nothing
    });
    testModel = new TestModel();
    testDb = {
      create: jest.fn(),
      getModel: jest.fn(() => {
        return testModel;
      }),
    };
  });

  it('should return models as proxies', function () {
    const dryDb = createDryRunDb(testDb);
    const modelName = 'TestModel';
    const model = dryDb.getModel(modelName);
    expect(model).toBeDefined();
    model.testMethod('testing');
    expect(testModel.testMethod).not.toHaveBeenCalled();
    expect(logSpy).toHaveBeenLastCalledWith(`[DRY] TestModel.testMethod("testing")`);
  });

  it('should return noop proxy as result of model calls', function () {
    const dryDb = createDryRunDb(testDb);
    const modelName = 'TestModel';
    const model = dryDb.getModel(modelName);
    const propertyResult = model.get().someField;
    expect(propertyResult).toEqual('${testModel.someField}');
  });

  it('should log error if db.getModel errors', function () {
    const dryDb = createDryRunDb(testDb);
    const modelName = 'TestModel';
    const error = new Error('test error');
    testDb.getModel.mockImplementation(() => {
      throw error;
    });
    dryDb.getModel(modelName);
    expect(logSpy).toHaveBeenLastCalledWith('error getting model', error);
  });

  it('should wrap db as proxy', function () {
    const dryDb = createDryRunDb(testDb);
    dryDb.create('User', { name: 'Test User' });
    expect(testDb.create).not.toHaveBeenCalled();
    expect(logSpy).toHaveBeenLastCalledWith(
      `[DRY] Object.create("User", {"name":"Test User"})`,
    );
  });
});
