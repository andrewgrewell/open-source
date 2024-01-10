import { ExecutionContext } from '@ag-oss/repo';

export interface PackageGeneratorSchema {
  /**
   * The name of the package
   */
  name: string;
  /**
   * The execution context that the package will be executed in (e.g. js, node, react-native, browser, electron, etc.)
   */
  context?: ExecutionContext;
  /**
   * The domain(s) of the package, e.g. product name, etc.
   * The package will be nested under the domain directory, and the name will be prefixed with the domain.
   */
  domain?: string;
  verbose?: boolean;
}
