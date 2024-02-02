import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function isContainerRunning(containerName: string) {
  try {
    const { stdout } = await execAsync(
      `docker container inspect -f '{{.State.Status}}' ${containerName}`,
    );
    return stdout.trim().toLowerCase() == 'running';
  } catch (e) {
    return false;
  }
}
