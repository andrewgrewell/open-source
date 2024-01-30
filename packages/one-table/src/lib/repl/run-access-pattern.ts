import { AccessPatternConfig } from '../types';
import { buildArgsFromAnswers } from './build-args-from-answers';
import { promptForParamValues } from './prompt-for-param-values';

export async function runAccessPattern<TModels>(
  accessPatternConfig: AccessPatternConfig,
  models: TModels,
) {
  const { params, executor } = accessPatternConfig;
  const paramAnswers = await promptForParamValues(params);
  const paramsAsArgs = buildArgsFromAnswers(paramAnswers);
  return executor(...paramsAsArgs, models);
}
