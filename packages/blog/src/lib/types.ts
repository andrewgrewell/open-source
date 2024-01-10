import { MDXRemoteSerializeResult } from 'next-mdx-remote/dist/types';

export interface Frontmatter {
  title: string;
  description: string;
  tags: string[];
}

export type MdxScope = Record<string, unknown>;

export interface BlogPost {
  slug: string;
  createdDate: string;
  mdx: MDXRemoteSerializeResult<MdxScope, Frontmatter>;
}

export type BlogPostSummary = Omit<BlogPost, 'mdx'> & Frontmatter;
