import { getContainerPorts } from '@ag-oss/docker';

export const command = 'get-ports <containerId>';
export const desc = 'Get ports for a docker container';

export interface Args {
  containerId: string;
}

export const handler = async (args: Args) => {
  const { containerId } = args;
  const ports = await getContainerPorts(containerId);
  console.log(ports);
};
