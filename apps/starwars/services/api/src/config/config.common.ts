import { AwsProfile, AwsRegion, ServiceConfig, ServiceEnv } from '../types';

/**
 * Common Configuration which will be included with all env specific configurations
 * @todo: treat this as a schema and validate that required fields are present, e.g. not missing on the env.
 */
export const commonConfig: ServiceConfig = {
  apiVersion: 1,
  // the values below are for reference when extending this config
  dynamo: {
    endpoint: null,
    tableName: null,
  },
  env: ServiceEnv.Production,
  jwt: {
    accessKey: process.env.JWT_ACCESS_KEY,
    adminKey: process.env.ADMIN_JWT_KEY,
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
