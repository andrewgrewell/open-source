import { getJestProjects } from '@nx/jest';

export default {
  prettierPath: require.resolve('prettier-2'),
  projects: getJestProjects(),
};
