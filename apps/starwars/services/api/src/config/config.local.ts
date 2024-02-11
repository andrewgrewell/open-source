import { AwsProfile, AwsRegion, ServiceConfig, ServiceEnv } from '../types';
import { merge } from 'lodash';
import { commonConfig } from './config.common';

export const config: ServiceConfig = merge({}, commonConfig, {
  dynamo: {
    endpoint: 'http://localhost:4566',
    tableName: `local-StarWarsAuthTable`,
  },
  env: ServiceEnv.Local,
  jwt: {
    claims: {
      iss: 'localhost',
    },
  },
  profile: AwsProfile.Default,
  region: AwsRegion.UsWest1,
});
