import { ExecutionContext } from '../types';

/**
 * Returns the execution context if it is found in the list of strings
 * @param list
 */
export function getExecutionContextFromList(
  list: string | string[],
): ExecutionContext | undefined {
  return Object.values(ExecutionContext).find((executionContext) =>
    list.includes(executionContext),
  );
}
