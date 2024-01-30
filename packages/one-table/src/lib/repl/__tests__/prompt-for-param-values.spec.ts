import { promptForParamValues } from '../prompt-for-param-values';
import prompts from 'prompts';

jest.mock('prompts');

const mockedPrompts = prompts as unknown as jest.MockedFn<typeof prompts>;

describe('promptForParamValues', () => {
  beforeEach(() => {
    mockedPrompts.mockClear();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - we are assuming that the question is always an object form and not array
    mockedPrompts.mockImplementation(({ name }) =>
      Promise.resolve({
        [name]: 'mockedValue',
      }),
    );
  });

  it('should return an array of objects for type:string params', async function () {
    const result = await promptForParamValues([
      { name: 'foo', type: 'string' },
      { name: 'bar', type: 'string' },
    ]);
    expect(result).toEqual([{ foo: 'mockedValue' }, { bar: 'mockedValue' }]);
  });

  it('should return a nested array for params for type:object', async function () {
    const result = await promptForParamValues([
      {
        name: 'foo',
        params: [
          { name: 'bar', type: 'string' },
          { name: 'another', type: 'string' },
        ],
        type: 'object',
      },
      { name: 'baz', type: 'string' },
    ]);
    expect(result).toEqual([
      { foo: [{ bar: 'mockedValue' }, { another: 'mockedValue' }] },
      { baz: 'mockedValue' },
    ]);
  });

  it.each([
    ['number', '5', 5],
    ['number', '3.33', 3.33],
    ['boolean', 'true', true],
    ['boolean', 'false', false],
    ['unsupported-json', '{ "foo": 1 }', '{ "foo": 1 }'], // TODO support this
  ])(`should covert type:%s (%s)`, async function (type, value, expectedValue) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockedPrompts.mockImplementation(({ name, format }) => {
      const formatted = format(value);
      return Promise.resolve({
        [name]: formatted,
      });
    });
    const result = await promptForParamValues([{ name: 'arg1', type: type as never }]);
    expect(result).toEqual([{ arg1: expectedValue }]);
  });
});
