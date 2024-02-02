import * as commands from './commands';
import dotenv from 'dotenv';
import Signale from 'signale';
import yargs from 'yargs';

// support loading env from .env file
dotenv.config();

try {
  Object.values(commands).forEach((command) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    yargs.command(command);
  });
  void yargs
    .option('v', {
      alias: 'verbose',
      default: false,
      describe: 'Log verbose output',
      type: 'boolean',
    })
    .check((argv) => {
      if (argv.v) {
        process.env['VERBOSE'] = 'true';
      }
      return true;
    })
    .help()
    .demandCommand()
    .recommendCommands()
    .parse();
} catch (e) {
  parseError(e);
}

function parseError(e: unknown) {
  if (process.env['VERBOSE']) {
    throw e;
  }
  if (!(e instanceof Error)) {
    Signale.error('Unexpected error', e);
    return;
  }
  if (e.message && /ENOENT.*\/src\/commands/.test(e.message)) {
    Signale.error('No src/commands directory found in project');
  }
  Signale.error('Unhandled error in command', e.message);
  process.exit(1);
}
