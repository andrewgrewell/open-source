import { BlogPostSummary, Frontmatter, MdxScope } from '../types';
import { extractMetaFromFile } from './extract-meta-from-file';
import { readDirAsync, readFileAsync } from '@ag-oss/fs';
import { serialize } from 'next-mdx-remote/serialize';

export async function getStaticPostSummaries(postsPath: string) {
  const staticPosts = await readDirAsync(postsPath);
  const summaries: BlogPostSummary[] = [];
  for (const postName of staticPosts) {
    const { slug, date } = extractMetaFromFile(postName);
    const source = await readFileAsync(`${postsPath}/${postName}`, 'utf8');
    const mdx = await serialize<MdxScope, Frontmatter>(source, {
      mdxOptions: { development: process.env.NODE_ENV === 'development' },
      parseFrontmatter: true,
    });
    summaries.push({
      createdDate: date,
      ...mdx.frontmatter,
      slug,
    });
  }
  return summaries;
}
