module.exports = {
  coverageDirectory: '../../../../coverage/starwars/services/api',
  displayName: 'starwars-api',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
};
