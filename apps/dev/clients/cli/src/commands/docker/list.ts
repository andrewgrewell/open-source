import { getAllContainers } from '@ag-oss/docker';

export const command = 'list';
export const desc = 'List all docker containers';
export const builder = {}; // TODO support filtering

export const handler = async () => {
  const containers = await getAllContainers();
  containers?.map((container) => {
    console.log(container.Names);
  });
};
