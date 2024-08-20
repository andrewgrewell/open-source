import { FC } from 'react';

export interface TagListProps {
  tags: string[];
}

export const TagList: FC<TagListProps> = ({ tags }) => {
  return (
    <ul className="flex flex-wrap gap-x-1">
      {tags.map((tag) => (
        <li
          key={tag}
          className="bg-gray-200 text-gray-800 text-xs font-semibold rounded-full px-2 py-1 mr-2"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
};
