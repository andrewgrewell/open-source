import { FC } from 'react';
import { Card } from './card';
import { Tag } from './tag';

export interface Job {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  contract?: boolean;
}

export interface JobListProps {
  jobs: Job[];
}

export const JobList: FC<JobListProps> = ({ jobs }) => {
  return (
    <ol className="flex flex-col gap-y-3">
      {jobs.map((entry, i) => (
        <li key={`${entry.company}:${i}`}>
          <Card className="gap-y-2">
            <div className="flex flex-1 flew-row">
              <h4 className="flex flex-1 font-display font-bold text-slate-700">
                {entry.title}
                {entry.contract ? <Tag className="ml-4 text-tiny">Contract</Tag> : null}
              </h4>
              <span className="flex flex-row font-display font-light text-slate-500">
                {entry.startDate} — {entry.endDate}
              </span>
            </div>

            <div className="flex flex-row">
              <p className="flex flex-1">{entry.company}</p>
            </div>
          </Card>
        </li>
      ))}
    </ol>
  );
};
