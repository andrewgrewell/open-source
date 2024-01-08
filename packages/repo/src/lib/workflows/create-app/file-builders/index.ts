import {
  AppClientType,
  AppServiceType,
  AppType,
  ProjectFileBuilderMap,
} from '../../../types';
import { CreateAppOptions } from '../create-app';
import { browserFileBuilders } from './browser';
import { commonFileBuilders } from './common';

export const clientBuilders = {
  [AppClientType.BROWSER]: browserFileBuilders,
  [AppClientType.MOBILE]: commonFileBuilders,
  [AppClientType.Desktop]: commonFileBuilders,
  [AppClientType.CLI]: commonFileBuilders,
};

export const serviceBuilders = {
  [AppServiceType.DAEMON]: commonFileBuilders,
  [AppServiceType.DYNAMODB]: commonFileBuilders,
  [AppServiceType.GRAPHQL_API]: commonFileBuilders,
  [AppServiceType.REST_API]: commonFileBuilders,
};

export function getFileBuilderMap(options: CreateAppOptions): ProjectFileBuilderMap {
  const { appType, appServiceType, appClientType } = options;
  let fileBuilders: ProjectFileBuilderMap = {};
  if (appType === AppType.CLIENT) {
    fileBuilders = clientBuilders[appClientType];
    if (!fileBuilders) {
      throw new Error(`No file builders found for client type ${appClientType}`);
    }
  } else if (appType === AppType.SERVICE) {
    fileBuilders = serviceBuilders[appServiceType];
    if (!fileBuilders) {
      throw new Error(`No file builders found for service type ${appServiceType}`);
    }
  }

  return fileBuilders;
}
