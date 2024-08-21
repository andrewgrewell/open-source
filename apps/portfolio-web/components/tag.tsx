import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface TagProps {
  className?: string;
}

export const Tag: FC<PropsWithChildren<TagProps>> = ({ children, className }) => {
  return (
    <span
      className={clsx([
        'bg-gray-200 text-gray-800 text-xs font-semibold rounded-full px-2 py-1 mr-2',
        className,
      ])}
    >
      {children}
    </span>
  );
};
