import { FC } from 'react';

export const ContractCta: FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center flex-col bg-slate-50 p-4 rounded-md mt-4 font-bold text-slate-600">
      <p>Need help with your project?</p>
      <button className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-md mt-4 font-bold">
        Contact me
      </button>
    </div>
  );
};
