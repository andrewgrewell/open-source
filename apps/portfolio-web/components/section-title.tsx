import { FC, PropsWithChildren } from 'react';

export const SectionTitle: FC<PropsWithChildren> = ({ children }) => {
  return <h2 className="font-display text-2xl font-bold text-slate-600">{children}</h2>;
};
