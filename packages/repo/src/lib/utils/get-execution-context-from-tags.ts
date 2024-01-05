import { ExecutionContext } from '../types';

/**
 * Assumes the projects execution context based off the project boundary tag
 * @param tags
 */
export function getExecutionContextFromTags(
  tags: string[],
): ExecutionContext | undefined {
  return Object.values(ExecutionContext).find((executionContext) =>
    tags.includes(executionContext),
  );
}
