import { AwsProfile, AwsRegion, ServiceConfig, ServiceEnv } from '../types';

/**
 * Common Configuration which will be included with all env specific configurations
 * @todo: treat this as a schema and validate that required fields are present, e.g. not missing on the env.
 */
export const commonConfig: ServiceConfig = {
  apiVersion: 1,
  dynamo: {
    endpoint: null,
    tableName: null,
  },
  email: {
    domain: process.env.EMAIL_SENDER_DOMAIN,
    password: process.env.EMAIL_SENDER_PASSWORD,
    username: process.env.EMAIL_SENDER_USERNAME,
  },
  env: ServiceEnv.Production,
  jwt: {
    accessKey: process.env.JWT_ACCESS_KEY,
    claims: {
      aud: process.env.JWT_AUDIENCE,
      iss: null,
    },
    idKey: process.env.JWT_ID_KEY,
    refreshKey: process.env.JWT_REFRESH_KEY,
  },
  profile: AwsProfile.Default,
  region: AwsRegion.UsWest1,
};
