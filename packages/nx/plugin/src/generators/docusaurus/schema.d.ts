export interface DocusaurusGeneratorSchema {
  /**
   * The name of the app which the documentation is for. will be placed in apps clients dir.
   */
  appName: string;
  /**
   * The name of the client, e.g. "docs"
   */
  name: string;
}
