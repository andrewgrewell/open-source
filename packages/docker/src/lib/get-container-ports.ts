import { execAsync } from '@ag-oss/child-process';
import { getContainer } from './get-container';

export interface ContainerPorts {
  external: number;
  internal: number;
}

export async function getContainerPorts(
  identifier: string,
): Promise<ContainerPorts | undefined> {
  const container = await getContainer(identifier);
  if (!container) {
    return;
  }
  const { stdout } = await execAsync(`docker port ${container.ID}`);
  const internal = /^\d{4}/.exec(stdout)?.[0];
  const external = /0.0.0.0:(\d{4})/.exec(stdout)?.[1];
  return {
    external: (external && parseInt(external, 10)) || -1,
    internal: (internal && parseInt(internal, 10)) || -1,
  };
}
