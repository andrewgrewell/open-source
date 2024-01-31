import type { Serverless } from 'serverless/aws';

console.log('READING SERVERLESS TS', {
  cwd: process.cwd(),
  dir: __dirname,
});

export const env = {
  dynamo: {
    endpoint: 'http://localhost:4566',
    tableName: `local-StarWarsAuthTable`,
  },
  jwtSecret: 'secret',
  name: 'dev',
  profile: 'local',
  region: 'us-west-1',
};

export const tableResource = `arn:aws:dynamodb:${env.region}:*:table/${env.dynamo.tableName}`;

export const baseServerlessConfigProvider: Serverless['provider'] = {
  environment: {
    AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    NODE_ENV: 'local',
  },
  memorySize: 128,
  name: 'aws',
  profile: env.profile,
  region: env.region,
  runtime: 'nodejs20.x',
  stage: env.name,
};

const baseServerlessConfig: Partial<Serverless> = {
  custom: {
    esbuild: {
      bundle: true,
      define: { 'require.resolve': undefined },
      minify: env.name !== 'local',
      sourcemap: env.name !== 'local',
      sourcesContent: false,
      target: ['es2020'],
    },
  },
  frameworkVersion: '3',
  package: {
    excludeDevDependencies: true,
    individually: true,
  },
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    ...baseServerlessConfigProvider,
    // apiGateway: {
    //   minimumCompressionSize: 1024,
    //   // @ts-expect-error - type thinks only strings are allowed
    //   restApiId: {
    //     'Fn::ImportValue': `${env.name}-AppApiGW-restApiId`,
    //   },
    //   // @ts-expect-error - type thinks only strings are allowed
    //   restApiRootResourceId: {
    //     'Fn::ImportValue': `${env.name}-AppApiGW-rootResourceId`,
    //   },
    // },
  },
  service: 'base',
};

const config = {
  ...baseServerlessConfig,
  custom: {
    ...baseServerlessConfig.custom,
    'serverless-offline': {
      httpPort: 3010,
      lambdaPort: 3011,
    },
  },
  functions: {
    echo: {
      description: 'Debug handler for validating setup',
      events: [
        {
          http: {
            method: 'POST',
            path: 'echo',
          },
        },
      ],
      handler: './src/handlers/echo.handler',
    },
  },
  provider: {
    ...baseServerlessConfig.provider,
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
            Resource: tableResource,
          },
        ],
      },
    },
  },
  service: `starwars-auth`,
};

module.exports = config;
