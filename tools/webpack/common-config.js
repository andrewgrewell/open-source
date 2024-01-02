// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/**
 * Exports a common webpack config to use used by all projects using Webpack
 * @type {{resolveLoader: {alias: {'remove-test-utils-loader': string}}, resolve: {alias: {[p: string]: boolean, '@monorepo-v2/js-test-utils': boolean, './__test_utils__': boolean}}, module: {rules: [{test: RegExp, use: string[]}]}}}
 */
module.exports = {
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: ['remove-test-utils-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      [path.resolve(__dirname, '../../packages/test-utils/js')]: false,
      [path.resolve(__dirname, '../../packages/test-utils/node')]: false,
      ['./__test_utils__']: false,

      ['@internal/test-utils-js']: false,
    },
  },
  resolveLoader: {
    alias: {
      'remove-test-utils-loader': path.resolve(__dirname, 'remove-test-utils-loader.js'),
    },
  },
};
