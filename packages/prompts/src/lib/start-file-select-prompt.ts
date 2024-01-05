import path from 'path';
import prompts from 'prompts';
import { createFileBrowserService, existsAsync, FileNode, mkdirAsync } from '@ag-oss/fs';
import { StartFileSelectPromptOptions } from './prompt-util.types';

const BACK_KEY = '::back::';
const CURRENT_KEY = '::current::';
const CREATE_NEW_KEY = '::create-new::';

export function startFileSelectPrompt(
  options: StartFileSelectPromptOptions,
): Promise<FileNode | undefined> {
  const browserService = createFileBrowserService(options);
  return new Promise<FileNode | undefined>((resolve, reject) => {
    try {
      browserService.activeFileNode.subscribe({
        complete: () => {
          resolve(undefined);
        },
        next: async (item) => {
          if (!item) {
            return;
          }
          const goBackOption =
            item.path !== options.rootPath && item.parentPath
              ? [
                  {
                    title: `< Back (${path.basename(item.parentPath)})`,
                    value: BACK_KEY,
                  },
                ]
              : [];
          const selectCurrentOption = [
            {
              title: `Select this location (${path.basename(item.path)})`,
              value: CURRENT_KEY,
            },
          ];
          const createOption = options.allowCreateItem
            ? [
                {
                  title: 'Create new',
                  value: CREATE_NEW_KEY,
                },
              ]
            : [];
          const directories = item.children
            .filter((item) => {
              return options.filterItem?.(item) ?? true;
            })
            .map((item) => {
              return {
                title: item.name,
                value: item.path,
              };
            });
          const selected = await prompts(
            {
              choices: goBackOption
                .concat(selectCurrentOption)
                .concat(createOption)
                .concat(directories),
              message: 'Select a location',
              name: 'selection',
              type: 'select',
            },
            {
              onCancel: () => {
                process.exit(0);
              },
            },
          );
          if (selected.selection === CURRENT_KEY) {
            resolve(item);
            return;
          }
          if (selected.selection === BACK_KEY && item.parentPath) {
            browserService.goTo(item.parentPath);
            return;
          }
          if (selected.selection === CREATE_NEW_KEY) {
            const promptForDirectoryName = async (): Promise<string> => {
              const response = await prompts(
                {
                  message: 'Enter a name for the new directory',
                  name: 'directoryName',
                  type: 'text',
                },
                {
                  onCancel: () => {
                    process.exit(0);
                  },
                },
              );
              const directoryPath = item.path + '/' + response.directoryName;
              const exists = await existsAsync(directoryPath);
              if (exists) {
                console.log(
                  `Directory ${directoryPath} already exists. Please try again.`,
                );
                return promptForDirectoryName();
              }
              return directoryPath;
            };
            const directoryPath = await promptForDirectoryName();
            await mkdirAsync(directoryPath);
            const finalPath = await startFileSelectPrompt({
              ...options,
              initialPath: directoryPath,
            });
            resolve(finalPath);
            return;
          }
          const selectedItem = item.children.find(
            (child) => child.path === selected.selection,
          );
          if (selectedItem?.type === 'file') {
            resolve(selectedItem);
            return;
          }
          if (options.selectItem?.(item)) {
            resolve(item);
            return;
          }
          if (options.jumpTo) {
            const finalPath = await startFileSelectPrompt({
              ...options,
              initialPath: await options.jumpTo(selected.selection),
            });
            resolve(finalPath);
            return;
          }
          browserService.goTo(selected.selection);
          return;
        },
      });
    } catch (e) {
      reject(e);
    }
  });
}
