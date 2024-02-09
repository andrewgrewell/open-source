import * as apiToken from './api-token';
import Yargs from 'yargs';

export const command = 'star-wars <command>';
export const desc = 'Run StarWars helper command <command>';

export const builder = (yargs: typeof Yargs) => {
  return yargs.command(apiToken).demandCommand();
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const handler = () => {};
