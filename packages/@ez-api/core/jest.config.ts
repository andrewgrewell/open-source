/* eslint-disable */
export default {
  prettierPath: require.resolve('prettier-2'),
  displayName: 'ez-api-core',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/packages/@ez-api/core',
};
