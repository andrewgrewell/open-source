import { CliPackageExecutorSchema } from './schema';
import { spawnAsync } from '@ag-oss/child-process';
import { ExecutorContext } from '@nrwl/devkit';
import * as path from 'path';

export default async function cliPackageExecutor(
  options: CliPackageExecutorSchema,
  context: ExecutorContext,
) {
  try {
    let args = ['pkg'];
    if (options.debug) {
      args.push('-d');
    }
    if (!context.workspace) {
      throw new Error('No workspace found');
    }
    const projectPath = path.join(
      context.root,
      context.workspace.projects[context.projectName!].root,
    );
    const absOutputPath = path.resolve(context.root, options.outputPath);
    const outPath = path.relative(projectPath, absOutputPath);
    args = args.concat([
      '--no-bytecode',
      `--out-path=${outPath}`,
      '--public-packages',
      '*',
      '.',
    ]);
    await spawnAsync('npx', args, {
      cwd: projectPath,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
