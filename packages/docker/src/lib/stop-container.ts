import { execAsync } from '../process';
import { getContainer } from './get-container';

export async function stopContainer(identifier: string): Promise<string | undefined> {
  const container = await getContainer(identifier);
  if (!container) {
    return;
  }
  await execAsync(`docker stop ${container.ID}`);
  return container.ID;
}
