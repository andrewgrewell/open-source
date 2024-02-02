import { Spinner } from '@ag-oss/console-ui';
import { stopContainer } from '@ag-oss/docker';

export const command = 'stop <identifier>';
export const desc = 'Stop a docker container using specified identifier for lookup';
export const builder = {
  identifier: {
    describe: 'Identifier for container lookup',
    required: true,
  },
};

export interface Args {
  identifier: string;
}

export const handler = async (args: Args) => {
  const { identifier } = args;
  const spinner = new Spinner();
  if (!identifier) {
    throw new Error('Must provide container identifier');
  }
  spinner.start('Stopping container');
  const containerId = await stopContainer(identifier);
  if (containerId) {
    spinner.succeed(`Container ${containerId} stopped`);
  }
};
