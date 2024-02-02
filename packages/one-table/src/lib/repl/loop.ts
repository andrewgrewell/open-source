import { AccessPatternConfig } from '../types';
import { runAccessPattern } from './run-access-pattern';
import { selectAccessPattern } from './select-access-pattern';

export async function loop<TModels>(
  accessPatterns: AccessPatternConfig[],
  models: TModels,
): Promise<unknown> {
  const accessPattern = await selectAccessPattern(accessPatterns);
  if (!accessPattern) {
    return;
  }
  const result = await runAccessPattern(accessPattern, models);
  console.log(`----------------------------------------`);
  console.log(`Access Pattern Result:\n${JSON.stringify(result, null, 2)}`);
  console.log(`----------------------------------------`);
  return loop(accessPatterns, models);
}
