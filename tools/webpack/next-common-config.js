// eslint-disable-next-line @typescript-eslint/no-var-requires
const { merge } = require('webpack-merge');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const commonConfig = require('./common-config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nx/next/plugins/with-nx');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_BUNDLE === 'true',
});

/**
 * Exports a function that can be used to merge config that is common to all NextJS projects
 * @param nextConfig
 * @returns {*}
 */
module.exports.nextCommonConfig = (nextConfig = {}) => {
  const { webpack: projectWebpackConfig } = nextConfig;
  return withNx(
    withBundleAnalyzer({
      ...nextConfig,
      modularizeImports: {
        '@tabler/icons-react': {
          transform: '@tabler/icons-react/dist/esm/icons/{{member}}',
        },
      },
      transpilePackages: ['@tabler/icons-react'],
      webpack: (config) => {
        return merge(config, projectWebpackConfig(config), commonConfig, {
          // common NextJs specific config
        });
      },
    }),
  );
};
