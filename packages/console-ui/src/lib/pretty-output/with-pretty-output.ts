import { WithPrettyOutputCallback, WithPrettyOutputOptions } from '../types';
import { createPrettyOutputContext } from './pretty-output-context';

export function withPrettyOutput<TResult = void>(
  callback: WithPrettyOutputCallback<TResult>,
  options: WithPrettyOutputOptions = {},
) {
  return callback(createPrettyOutputContext(options));
}
