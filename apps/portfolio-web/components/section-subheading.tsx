import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface SectionSubheadingProps {
  className?: string;
}

export const SectionSubheading: FC<PropsWithChildren<SectionSubheadingProps>> = ({
  children,
  className,
}) => {
  return <p className={clsx(['font-body', className])}>{children}</p>;
};
