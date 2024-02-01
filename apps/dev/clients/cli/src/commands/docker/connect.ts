import { Container, getAllContainers, getContainer } from '@ag-oss/docker';
import { spawnAsync } from '@ag-oss/child-process';
import { Spinner } from '@ag-oss/console-ui';
import prompts from 'prompts';

export const command = 'connect [identifier]';
export const desc = 'Connect to a docker container';
export const builder = {
  identifier: {
    describe: 'Identifier for container lookup',
    required: false,
  },
};

export interface Args {
  identifier: string;
}

async function promptForContainer() {
  const containers = await getAllContainers();
  const { container } = await prompts({
    choices: containers.map((container) => ({
      title: Array.isArray(container.Names) ? container.Names[0] : container.Names,
      value: container,
    })),
    message: 'Select container to connect to',
    name: 'container',
    type: 'select',
  });
  return container;
}

export const handler = async (args: Args) => {
  const { identifier } = args;
  const spinner = new Spinner();
  const container: Container = await (identifier
    ? getContainer(identifier)
    : promptForContainer());
  if (!container) {
    throw new Error('Could not find container');
  }
  spinner.start('Connecting to container');
  const { ID, Image } = container;
  // docker container run --entrypoint /bin/bash --volumes-from {container-name} -it {image-name}
  const spawnProcess = spawnAsync('docker', [
    'container',
    'run',
    '--rm',
    '--entrypoint',
    '/bin/bash',
    '--volumes-from',
    ID,
    '-it',
    Image,
  ]);
  spinner.succeed('Connected to container');
  await spawnProcess;
};
