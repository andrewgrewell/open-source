module.exports = {
  coverageDirectory: '../../../../coverage/apps/dev-cli',
  displayName: 'cli',
  moduleFileExtensions: ['ts', 'js', 'html'],
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
};
