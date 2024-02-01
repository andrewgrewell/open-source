import { prettyLogger as log } from '@ag-oss/logging';
import prompts from 'prompts';

export const command = 'logging';
export const desc = 'Run interactive example of logging';
export const builder = {};

export const handler = async () => {
  const { query } = await prompts({
    message: 'Enter some text to log: ',
    name: 'query',
    type: 'text',
  });
  console.log('----- Colorful log levels -----');
  console.log('Debug');
  log.debug('You entered:', query);
  console.log('info');
  log.info('You entered:', query);
  console.log('warn');
  log.warn('You entered:', query);
  console.log('error');
  log.error('You entered:', query);
};
