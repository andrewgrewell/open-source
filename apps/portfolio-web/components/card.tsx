import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface CardProps {
  className?: string;
}

export const Card: FC<PropsWithChildren<CardProps>> = ({ children, className }) => {
  return (
    <div
      className={clsx([
        'flex flex-1 flex-col bg-white border border-zinc-100 rounded-lg p-4 hover:bg-slate-50 overflow-hidden',
        className,
      ])}
    >
      {children}
    </div>
  );
};
