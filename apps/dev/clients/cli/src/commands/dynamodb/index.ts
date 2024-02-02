import * as startCommand from './start';
import Yargs from 'yargs';

export const command = 'dynamodb <command>';
export const desc = 'Run Dynamodb helper command <command>';

export const builder = (yargs: typeof Yargs) => {
  return yargs.command(startCommand as never).demandCommand();
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const handler = () => {};
