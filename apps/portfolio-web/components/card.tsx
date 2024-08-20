import { FC, PropsWithChildren } from 'react';

export const Card: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-1 flex-col bg-white border border-zinc-100 rounded-lg p-4 hover:bg-slate-50 overflow-hidden">
      {children}
    </div>
  );
};
