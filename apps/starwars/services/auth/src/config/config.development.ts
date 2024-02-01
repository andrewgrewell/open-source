import { AwsProfile, AwsRegion, ServiceConfig, ServiceEnv } from '../types';
import { merge } from 'lodash';
import { commonConfig } from './config.common';

export const config: ServiceConfig = merge({}, commonConfig, {
  dynamo: {
    endpoint: 'http://localhost:4566',
    tableName: `dev-StarWarsAuthTable`,
  },
  env: ServiceEnv.Development,
  jwtSecret: process.env.JWT_SECRET,
  profile: AwsProfile.Default,
  region: AwsRegion.UsWest1,
});
