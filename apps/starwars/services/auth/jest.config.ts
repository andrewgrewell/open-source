module.exports = {
  coverageDirectory: '../../../../coverage/starwars/services/auth',
  displayName: 'starwars-auth',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
};
