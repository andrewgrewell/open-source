import { verboseLogger } from '../logging';
import { execAsync } from '../process';

export interface Container {
  Command: string;
  CreatedAt: string;
  ID: string;
  Image: string;
  Labels: string;
  LocalVolumes: string;
  Mounts: string;
  Names: string;
  Networks: string;
  Ports: string;
  RunningFor: string;
  Size: string;
  State: string;
  Status: string;
}
export async function getAllContainers(): Promise<Container[]> {
  const { stdout } = await execAsync('docker ps -a --format "{{json .}}"');
  try {
    const containers = stdout
      ?.match(/\{"Command".+}[\r\n\s]/g)
      ?.map((line) => JSON.parse(line));
    return Array.isArray(containers) ? containers : [containers];
  } catch (e) {
    verboseLogger.error('Failed to parse docker ps output: ', e);
    return [];
  }
}

export async function getContainer(identifier: string): Promise<Container | undefined> {
  const containers = await getAllContainers();
  if (!containers || !containers.length) {
    return;
  }
  return containers.find((container) => {
    return (
      container.ID === identifier ||
      container.Names.includes(identifier) ||
      container.Image.includes(identifier)
    );
  });
}
