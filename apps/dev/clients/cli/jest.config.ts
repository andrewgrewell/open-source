module.exports = {
  coverageDirectory: '../../../../coverage/apps/dev-cli',
  displayName: 'cli',
  moduleFileExtensions: ['ts', 'js', 'html'],
  preset: '../../../../jest.preset.js',
  prettierPath: require.resolve('prettier-2'),
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
};
