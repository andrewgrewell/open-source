/* eslint-disable */
export default {
  prettierPath: require.resolve('prettier-2'),
  displayName: 'portfolio-browser',
  preset: '../../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: false,
  coverageDirectory: '../../../../coverage/apps/portfolio/clients/browser',
};
