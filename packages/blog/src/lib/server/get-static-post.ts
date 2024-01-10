import { BlogPost, Frontmatter, MdxScope } from '../types';
import { extractMetaFromFile } from './extract-meta-from-file';
import { readDirAsync, readFileAsync } from '@ag-oss/fs';
import { serialize } from 'next-mdx-remote/serialize';

export async function getStaticPost(postsPath: string, slug: string): Promise<BlogPost> {
  const staticPosts = await readDirAsync(postsPath);
  const postName = staticPosts.find((post) => post.includes(slug));
  const { date } = extractMetaFromFile(postName);
  const source = await readFileAsync(`${postsPath}/${postName}`, 'utf8');
  const mdx = await serialize<MdxScope, Frontmatter>(source, {
    mdxOptions: { development: process.env.NODE_ENV === 'development' },
    parseFrontmatter: true,
  });
  return {
    createdDate: date,
    mdx,
    slug,
  };
}
