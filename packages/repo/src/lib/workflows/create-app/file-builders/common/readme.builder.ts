import { ProjectFileBuilder } from '../../../../types';

export const readmeBuilder: ProjectFileBuilder = (config) => {
  return `
# ${config.projectName}

No description provided. Have some time? Please add a description of what this app is.
`;
};
