import { getContainer } from './get-container';
import { waitFor } from '@ag-oss/timing-js';

export type ContainerState =
  | 'Created'
  | 'Running'
  | 'Restarting'
  | 'Exited'
  | 'Paused'
  | 'Dead';

export function waitForContainerState(identifier: string, state: ContainerState) {
  return waitFor(async () => {
    const container = await getContainer(identifier);
    return container?.State.toLowerCase() === state.toLowerCase();
  });
}
