import { ServiceConfig } from '../types';

/**
 * Common Configuration which will be included with all env specific configurations
 */
export const commonConfig: Partial<ServiceConfig> = {
  apiVersion: 1,
};
