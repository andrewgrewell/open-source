import { FC } from 'react';

export interface TagProps {
  text: string;
}

export const Tag: FC<TagProps> = ({ text }) => {
  return (
    <div className="p-2 bg-red-400">
      <span className="bg-gray-200 text-gray-800 text-xs font-semibold rounded-full px-2 py-1 mr-2">
        {text}
      </span>
    </div>
  );
};
