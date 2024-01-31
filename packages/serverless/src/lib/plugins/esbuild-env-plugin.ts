export interface CreateEnvPluginOptions {
  /**
   * Path to the environments folder, which contains the environment files.
   */
  environmentsPath: string;
  /**
   * Name of the environment file. e.g. environment.prod.ts
   */
  filePrefix?: string;
}

export const createEnvPlugin = (options: CreateEnvPluginOptions) => {
  return {
    name: 'env',
    setup(build) {
      // build.onResolve({ filter: /@app\/env$/ }, (args) => {
      //   return {
      //     namespace: 'env-ns',
      //     path: args.path,
      //   };
      // });
      // build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => {
      //   const envFile = process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '';
      //   const content = readFileSync(
      //     `../../environments/environment${envFile}.ts`,
      //     'utf8',
      //   );
      //
      //   return {
      //     contents: content,
      //     loader: 'ts',
      //     resolveDir: '../../environments',
      //   };
      // });
    },
  };
};
