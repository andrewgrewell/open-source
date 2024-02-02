import * as connectCommand from './connect';
import * as getPorts from './get-ports';
import * as listCommand from './list';
import * as stopCommand from './stop';
import Yargs from 'yargs';

export const command = 'docker <command>';
export const desc = 'Run docker helper command <command>';

export const builder = (yargs: typeof Yargs) => {
  return yargs
    .command(connectCommand as never)
    .command(stopCommand as never)
    .command(listCommand)
    .command(getPorts as never)
    .demandCommand();
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const handler = () => {};
