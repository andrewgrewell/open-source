import { FC } from 'react';
import { Tag } from './tag';

export interface TagListProps {
  tags: string[];
}

export const TagList: FC<TagListProps> = ({ tags }) => {
  return (
    <ul className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
  );
};
