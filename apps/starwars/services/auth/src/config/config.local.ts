import { AwsProfile, AwsRegion, ServiceEnv } from '../types';

export const config = {
  dynamo: {
    endpoint: 'http://localhost:4566',
    tableName: `local-StarWarsAuthTable`,
  },
  env: ServiceEnv.Local,
  jwtSecret: process.env.JWT_SECRET,
  profile: AwsProfile.Default,
  region: AwsRegion.UsWest1,
};
