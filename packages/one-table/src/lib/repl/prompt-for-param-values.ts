import { ParamConfig } from '../types';
import prompts from 'prompts';

/**
 * Returns an array of param names to values.
 * Each index in the array corresponds to the index in the params array.
 * Example: function(config: { foo: string }, bar: number)
 * The result would be [[{ foo: 'valueOfFoo' }], { bar: 123 }]
 * @param params
 */
export async function promptForParamValues(params: ParamConfig[]): Promise<any[]> {
  const result = [];
  for (const param of params) {
    // TODO support arrays
    if (param.type === 'object' && param.params) {
      result.push({ [param.name]: await promptForParamValues(param.params) });
    } else {
      result.push(
        await prompts({
          format: (val: unknown) => {
            if (param.type === 'number') {
              return Number(val);
            }
            if (param.type === 'boolean') {
              return val === 'false' ? false : Boolean(val);
            }
            return val;
          },
          message: `Enter value for ${param.name}`,
          name: param.name,
          type: 'text',
        }),
      );
    }
  }
  return result;
}
