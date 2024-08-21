import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface SectionProps {
  className?: string;
}

export const Section: FC<PropsWithChildren<SectionProps>> = ({ children, className }) => {
  return (
    <section className={clsx(['flex flex-col py-5 my-5', className])}>{children}</section>
  );
};
