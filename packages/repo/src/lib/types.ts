import { FileBuilder, FileBuilderMap } from '@ag-oss/workflows-js';

export interface RepoConfig {
  repoPath: string;
  npmScope: string;
  packagesPath: string;
  appsPath: string;
  distPath: string;
}

export type ProjectTags = readonly (string | ExecutionContext)[];

export interface ProjectConfig extends RepoConfig {
  /**
   * The relative path to the repo root, e.g. `../../..`
   */
  relativePathToRepoRoot: string;
  /**
   * The relative path from the repo root, e.g. `packages/my-package` or `products/product1/clients/desktop
   */
  pathInRepo: string;
  /**
   * The name of the project as defined in the project.json
   */
  projectName: string;
  /**
   * The relative path from the packages or products root,
   * e.g. `products/product1/clients/desktop` would be `product1/clients/desktop`
   */
  projectPath: string;
  /**
   * The full path to the project, e.g. repoPath + projectPath
   */
  fullProjectPath: string;
  /**
   * The type of project, e.g. `library` or `application`
   */
  projectType: 'library' | 'application';
  /**
   * The tags associated with the project
   */
  tags: ProjectTags;
  /**
   * The context that the project will be executed in (e.g. js, node, react-native, browser, electron)
   */
  executionContext: ExecutionContext;
}

export type ProjectType = 'library' | 'application';

export interface ProjectJson {
  name?: string;
  projectType?: ProjectType;
  tags?: ProjectTags;
}

export enum ExecutionContext {
  JS = 'js',
  NODE = 'node',
  REACT_NATIVE = 'react-native',
  BROWSER = 'browser',
  REACT = 'react',
  ELECTRON = 'electron',
}

export type ProjectFileBuilder = FileBuilder<ProjectConfig>;

export type ProjectFileBuilderMap = FileBuilderMap<ProjectConfig>;

export type ExecutionContextFileBuilderMap = Record<
  ExecutionContext,
  ProjectFileBuilderMap
>;

export interface PackageContextMap {
  [packageName: string]: ExecutionContext[];
}

export enum AppType {
  CLIENT = 'client',
  SERVICE = 'service',
}

export enum AppClientType {
  BROWSER = 'browser',
  MOBILE = 'mobile',
  Desktop = 'desktop',
  CLI = 'cli',
}

export enum AppServiceType {
  DAEMON = 'daemon',
  REST_API = 'rest-api',
  GRAPHQL_API = 'graphql-api',
  DYNAMODB = 'dynamodb',
}
