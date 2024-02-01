import { AwsProfile, AwsRegion, ServiceEnv } from '../types';

export const config = {
  dynamo: {
    endpoint: 'http://localhost:4566', //TODO actual endpoint
    tableName: `prod-StarWarsAuthTable`,
  },
  env: ServiceEnv.Production,
  jwtSecret: process.env.JWT_SECRET,
  profile: AwsProfile.Default,
  region: AwsRegion.UsWest1,
};
