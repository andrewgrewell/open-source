import { BLOG_ROOT_PATH } from '../../constants';
import { getStaticPost, getStaticPostSlugs } from '@ag-oss/blog';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';

export default function BlogPage({ post }) {
  const { mdx } = post;
  const { title } = mdx.frontmatter;
  return (
    <div>
      <h1>{title}</h1>
      <MDXRemote {...mdx} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { slug } = params;
  const post = await getStaticPost(BLOG_ROOT_PATH, slug as string);
  return {
    props: { post },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getStaticPostSlugs(BLOG_ROOT_PATH);
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return {
    fallback: false,
    paths: paths,
  };
};
