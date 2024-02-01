import { getAllContainers } from '@ag-oss/docker';
import { verboseLogger as log } from '@ag-oss/logging';

export const command = 'list';
export const desc = 'List all docker containers';
export const builder = {}; // TODO support filtering

export const handler = async () => {
  const containers = await getAllContainers();
  log.verbose('Containers:', containers);
  if (!containers?.length) {
    console.log('No containers found');
    return;
  }
  containers?.map((container) => {
    console.log(container?.Names);
  });
};
