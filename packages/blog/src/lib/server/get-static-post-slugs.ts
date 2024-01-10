import { extractMetaFromFile } from './extract-meta-from-file';
import { readDirAsync } from '@ag-oss/fs';

export async function getStaticPostSlugs(postsPath: string): Promise<string[]> {
  // TODO: validate that directory structure doesn't break things
  //  e.g. that we can nest posts in directories and have it flatten or ignore them
  //  for example a WIP directory
  const blogFiles = await readDirAsync(postsPath);
  const slugs = [];
  for (const blogFile of blogFiles) {
    const { slug } = extractMetaFromFile(blogFile);
    slugs.push(slug);
  }
  return slugs;
}
