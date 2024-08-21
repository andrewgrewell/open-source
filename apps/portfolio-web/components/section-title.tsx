import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface SectionTitleProps {
  id?: string;
  className?: string;
}

export const SectionTitle: FC<PropsWithChildren<SectionTitleProps>> = ({
  children,
  id,
  className,
}) => {
  return (
    <h2
      id={id}
      className={clsx([
        'font-heading text-4xl max-md:text-2xl font-bold text-slate-600',
        className,
      ])}
    >
      {children}
    </h2>
  );
};
