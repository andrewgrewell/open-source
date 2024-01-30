/* eslint-disable */
export default {
  prettierPath: require.resolve('prettier-2'),
  displayName: 'starwars-test-utils',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/packages/@starwars/test-utils',
};
