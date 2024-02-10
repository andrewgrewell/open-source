import { ServiceEnv } from './src/types';
import { config } from './src/config';

console.log(`Using config env: "${config.env}" with API version: "${config.apiVersion}"`);

const { env, dynamo, profile, region } = config;

export const serviceName = 'starwars-api';

// TODO: Add support for routing in handlers, to share global context between invocations
export const functions = {
  admin: {
    events: [
      {
        http: {
          method: 'ANY',
          path: 'admin/{any+}',
        },
      },
    ],
    handler: './src/handlers/admin/index.handler',
  },
  auth: {
    events: [
      {
        http: {
          method: 'ANY',
          path: 'auth/{any+}',
        },
      },
    ],
    handler: './src/handlers/auth/index.handler',
  },
};

module.exports = {
  custom: {
    esbuild: {
      bundle: true,
      define: { 'require.resolve': undefined },
      minify: env !== ServiceEnv.Local,
      plugins: './esbuild-plugins.js',
      sourcemap: env !== ServiceEnv.Local,
      sourcesContent: false,
      target: ['es2020'],
    },
    'serverless-offline': {
      httpPort: 3010,
      lambdaPort: 3011,
    },
  },
  frameworkVersion: '3',
  functions,
  package: {
    excludeDevDependencies: true,
    individually: true,
  },
  plugins: ['serverless-dotenv-plugin', 'serverless-esbuild', 'serverless-offline'],
  provider: {
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_ENV: env,
    },
    iam: {
      role: {
        statements: [
          {
            Action: [
              'dynamodb:Query',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
            ],
            Effect: 'Allow',
            Resource: `arn:aws:dynamodb:${region}:*:table/${dynamo.tableName}`,
          },
        ],
      },
    },
    memorySize: 128,
    name: 'aws',
    profile,
    region,
    runtime: 'nodejs20.x',
    stage: env,
  },
  service: serviceName,
};
