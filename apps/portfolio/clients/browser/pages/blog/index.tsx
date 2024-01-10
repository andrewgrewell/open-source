import { BLOG_ROOT_PATH } from '../../constants';
import { getStaticPostSummaries } from '@ag-oss/blog';
import { GetStaticProps } from 'next';
import React from 'react';

export default function BlogList({ postSummaries }) {
  return (
    <div>
      <h1>Blog List</h1>
      <ol>
        {postSummaries?.map((summary) => {
          return (
            <li key={summary.slug}>
              <a href={`/blog/${summary.slug}`}>{summary.title}</a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const summaries = await getStaticPostSummaries(BLOG_ROOT_PATH);
  return {
    props: { postSummaries: summaries },
  };
};
