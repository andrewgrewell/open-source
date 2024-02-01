import * as loggingExample from './logging';
import * as progressExample from './progress';
import * as promptExample from './prompt';
import * as throwExample from './throw';
import * as fileTreeExample from './file-tree';
import Yargs from 'yargs';

export const command = 'run-example <exampleName>';
export const desc = 'Run example <exampleName> highlighting the features of cli builder';

export const builder = (yargs: typeof Yargs) => {
  return yargs
    .command(loggingExample)
    .command(progressExample)
    .command(promptExample)
    .command(throwExample as never)
    .command(fileTreeExample)
    .demandCommand();
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const handler = () => {};
