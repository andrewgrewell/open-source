import { execAsync } from '../process';

export async function isImageRunning(imageName: string) {
  try {
    const { stdout } = await execAsync(
      `docker ps --format '{{.Image}}' | grep ${imageName}`,
    );
    return stdout.includes(imageName);
  } catch (e) {
    return false;
  }
}
