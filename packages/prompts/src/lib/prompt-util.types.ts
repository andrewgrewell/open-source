import { CreateFileBrowserServiceOptions, FileNode } from '@ag-oss/fs';

export interface StartFileSelectPromptOptions extends CreateFileBrowserServiceOptions {
  /**
   * Allow the consumer to filter items from showing in the list
   * @param item
   */
  filterItem?: (item: FileNode) => boolean;
  /**
   * Allow the consumer to decide if the selected node should be returned.
   * @param item
   */
  selectItem?: (item: FileNode) => boolean;
  /**
   * If true, an option is provided to create a new folder.
   */
  allowCreateItem?: boolean;
  /**
   * Allow the consumer to return a sub path of the selected path to jump to
   * @param nextPath
   */
  jumpTo?: (nextPath: string) => string | Promise<string> | undefined;
}
