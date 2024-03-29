export enum ServiceEnv {
  Local = 'local',
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

export enum AwsRegion {
  Local = 'local',
  UsWest1 = 'us-west-1',
}

export enum AwsProfile {
  Local = 'local',
  Default = '',
}

export interface DynamoConfig {
  endpoint?: string;
  tableName: string;
}

export interface JwtConfig {
  claims: {
    aud: string;
    iss: string;
  };
  accessKey: string;
  idKey: string;
  refreshKey: string;
}

export interface EmailConfig {
  domain: string;
  username: string;
  password: string;
}

export interface ServiceConfig {
  apiVersion?: number;
  email: EmailConfig;
  region: AwsRegion;
  profile: AwsProfile;
  dynamo: DynamoConfig;
  env: ServiceEnv;
  jwt: JwtConfig;
}
