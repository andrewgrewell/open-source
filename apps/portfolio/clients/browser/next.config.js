const { withNx } = require('@nx/next/plugins/with-nx');
const { merge } = require('webpack-merge');
const PrebuildPlugin = require('prebuild-webpack-plugin');

const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config, { isServer }) => {
    const runContextConfig = isServer ? {
      // server only config
      plugins: [
        new PrebuildPlugin({
          build: async (compiler, compilation, matchedFiles) => {
            // do any work that is needed to setup the build
          },
        })
      ]
    } : {
      // client only config
    };
    return merge(config, {

    }, runContextConfig);
  },
};

module.exports = withNx(nextConfig);
