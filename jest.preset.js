/* eslint @typescript-eslint/no-var-requires: 0 */
const { merge } = require('lodash');
const nxPreset = require('@nrwl/jest/preset').default;
const path = require('path');

/**
 * This file should be used for jest config that should apply to all projects.
 */
module.exports = merge(
  {},
  {
    ...nxPreset,
    collectCoverageFrom: [
      // NOTE: projects must be excluded in scripts/merge-coverage-reports.sh
      '**/*.{ts,tsx,js,jsx}',
      '!**/node_modules/**',
      '!**/.git-hooks/**',
      '!**/.github/**',
      '!**/.storybook/**',
      '!**/.vscode/**',
      '!**/coverage/**',
      '!**/dist/**',
      '!**/docs/**',
      '!**/blog/**',
      '!**/reports/**',
      '!**/scripts/**',
      '!**/cypress/**',
      '!**/.storybook/**',
      '!**/environments/**',
      '!**/jest.config.{ts,js}',
      '!**/index.{ts,js}',
      '!**/*.config.{ts,js}',
      '!**/*.types.{ts,js}',
      '!**/*.stories.{tsx,jsx}',
      '!**/*.unify.{tsx,jsx}',
      '!**/*.table-def.{ts,js}',
      '!**/table-def.{ts,js}',
      '!**/types.{ts,js}',
      '!**/*.schema.{ts,js}',
      '!**/schema.{ts,js}',
      '!**/constants.{ts,js}',
      '!**/*.constants.{ts,js}',
      '!**/__storybook__/**',
      '!**/__functional__/**',
      '!**/__fixtures__/**',
      '!**/__test-utils__/**',
      '!**/__mocks__/**',
      '!**/.next/**',
    ],
    coverageReporters: ['text', 'json', 'json-summary'],
    coverageThreshold: {
      global: {
        branches: 55,
        functions: 94,
        lines: 94,
        statements: 94,
      },
    },
    moduleNameMapper: {
      '^lodash-es$': 'lodash',
    },
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    reporters: [
      'jest-silent-reporter',
      'summary',
      'github-actions',
      [
        'jest-junit',
        {
          ancestorSeparator: ' › ',
          classNameTemplate: '{classname}-{title}',
          outputDirectory: 'reports/jest',
          outputName: 'junit.xml',
          reportTestSuiteErrors: 'true',
          suiteName: 'jest tests',
          titleTemplate: '{classname}-{title}',
          uniqueOutputName: 'false',
          usePathForSuiteName: 'true',
        },
      ],
    ],
    setupFiles: [path.resolve(__dirname, './jest.setup.ts')],
    setupFilesAfterEnv: [path.resolve(__dirname, './jest.setup.postenv.ts')],
    testPathIgnorePatterns: ['/node_modules/', '/__functional__/'],
  },
);
