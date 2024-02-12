/* eslint-disable */
export default {
  prettierPath: require.resolve('prettier-2'),
  displayName: 'ez-api-docs',
  preset: '../../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: false,
  coverageDirectory: '../../../../coverage/apps/ez-api/clients/docs',
};
