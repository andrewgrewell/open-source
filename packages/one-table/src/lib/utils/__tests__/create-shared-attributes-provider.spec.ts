import { createSharedAttributesProvider } from '../create-shared-attributes-provider';

describe('createSharedAttributesProvider', () => {
  it('should return a function', function () {
    expect(createSharedAttributesProvider({})).toBeInstanceOf(Function);
  });

  describe('withSharedAttributes', () => {
    const sharedAttributes = {
      testAttr1: { type: Date },
      testAttr2: { generate: 'ulid', type: String },
    };
    const testSchema = {
      Test: {
        name: { type: String },
      },
    };
    const withSharedAttributes = createSharedAttributesProvider(sharedAttributes);

    it('should return passed in schema with additional fields', function () {
      const fooSchema = {
        ...testSchema,
        Foo: {
          name: { type: String },
        },
      };
      const barSchema = {
        ...testSchema,
        Bar: {
          name: { type: String },
        },
      };
      const fooResult = withSharedAttributes(fooSchema);
      expect(fooResult).toMatchInlineSnapshot(`
        {
          "Foo": {
            "name": {
              "type": [Function],
            },
            "testAttr1": {
              "type": [Function],
            },
            "testAttr2": {
              "generate": "ulid",
              "type": [Function],
            },
          },
          "Test": {
            "name": {
              "type": [Function],
            },
            "testAttr1": {
              "type": [Function],
            },
            "testAttr2": {
              "generate": "ulid",
              "type": [Function],
            },
          },
        }
      `);
      const barResult = withSharedAttributes(barSchema);
      expect(barResult).toMatchInlineSnapshot(`
        {
          "Bar": {
            "name": {
              "type": [Function],
            },
            "testAttr1": {
              "type": [Function],
            },
            "testAttr2": {
              "generate": "ulid",
              "type": [Function],
            },
          },
          "Test": {
            "name": {
              "type": [Function],
            },
            "testAttr1": {
              "type": [Function],
            },
            "testAttr2": {
              "generate": "ulid",
              "type": [Function],
            },
          },
        }
      `);
    });
  });
});
