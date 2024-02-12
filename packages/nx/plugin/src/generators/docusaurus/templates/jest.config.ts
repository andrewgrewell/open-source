/* eslint-disable */
export default {
  prettierPath: require.resolve('prettier-2'),
  displayName: '<%= projectName %>',
  preset: '../../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: false,
  coverageDirectory: '../../../../coverage/apps/<%= appName %>/clients/<%= name %>',
};
