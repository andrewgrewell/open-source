const { readFileSync } = require('fs');

/**
 * This is required in order to make sure the env specific config file is available
 * in the runtime.
 * @type {{name: string, setup(*): void}}
 */
const envPlugin = {
  name: 'env',
  setup(build) {
    build.onResolve({ filter: /config$/ }, (args) => {
      return {
        namespace: 'env-ns',
        path: args.path,
      };
    });
    build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => {
      const configPath = 'src/config';
      const env = process.env.NODE_ENV || 'production';
      const content = readFileSync(
        `${configPath}/config.${env}.ts`,
        'utf8',
      );
      return {
        contents: content,
        loader: 'ts',
        resolveDir: configPath,
      };
    });
  },
};

module.exports = [envPlugin];
