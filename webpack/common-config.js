// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

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

      ['@monorepo-v2/js-test-utils']: false,
    },
  },
  resolveLoader: {
    alias: {
      'remove-test-utils-loader': path.resolve(__dirname, 'remove-test-utils-loader.js'),
    },
  },
};
