import { FC, PropsWithChildren } from 'react';

export const PageContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col py-10 bg-white">{children}</div>;
};
