import { FC, PropsWithChildren } from 'react';

export interface SectionTitleProps {
  id?: string;
}

export const SectionTitle: FC<PropsWithChildren<SectionTitleProps>> = ({
  children,
  id,
}) => {
  return (
    <h2
      id={id}
      className="font-display text-4xl max-md:text-2xl font-bold text-slate-600"
    >
      {children}
    </h2>
  );
};
