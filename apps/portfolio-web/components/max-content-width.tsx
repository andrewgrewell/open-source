import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface MaxContentWidthProps {
  className?: string;
}

export const MaxContentWidth: FC<PropsWithChildren<MaxContentWidthProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={clsx([
        'flex flex-1 flex-col max-w-7xl mx-auto bg-white px-40 max-md:max-w-full max-md:px-8',
        className,
      ])}
    >
      {children}
    </div>
  );
};
