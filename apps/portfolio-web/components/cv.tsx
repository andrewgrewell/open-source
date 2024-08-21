import { FC } from 'react';
import { Section } from './section';
import { SectionTitle } from './section-title';
import cvJson from '../cv.json';
import { JobList } from './job-list';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export const Cv: FC = () => {
  return (
    <Section>
      <SectionTitle id="cv">
        <div className="flex flex-row items-center">
          <span className="flex flex-1">CV </span>
          <button className="ml-2 bg-slate-50 hover:bg-slate-100 rounded-md p-1">
            <ArrowDownTrayIcon className="w-6 h-6" />
          </button>
        </div>
      </SectionTitle>
      <JobList jobs={cvJson.jobs} />
      <a
        className="flex flex-row items-center justify-center bg-slate-50 hover:bg-slate-100 p-4 rounded-md mt-4 font-bold text-slate-600"
        href="https://drive.google.com/file/d/1AHIiWQO-JFVaBlYwuV0MhhEmP4_VvcXQ/view?usp=drive_link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download CV <ArrowDownTrayIcon className="ml-2 w-5 h-5" />
      </a>
    </Section>
  );
};
