import { AccessPatternConfig } from '../types';
import prompts from 'prompts';

export async function selectAccessPattern(accessPatterns: AccessPatternConfig[]) {
  const { accessPattern } = await prompts({
    choices: accessPatterns.map((accessPattern) => ({
      title: accessPattern.name,
      value: accessPattern,
    })),
    message: 'Select an access pattern',
    name: 'accessPattern',
    type: 'select',
  });
  return accessPattern;
}
