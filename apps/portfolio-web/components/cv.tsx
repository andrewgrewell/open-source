import { FC } from 'react';
import { Section } from './section';
import { SectionTitle } from './section-title';
import cvJson from '../cv.json';
import { JobList } from './job-list';

export const Cv: FC = () => {
  return (
    <Section>
      <SectionTitle>CV</SectionTitle>
      <p>Here are some of the teams I&apos;ve worked with</p>
      <JobList jobs={cvJson.jobs} />
      <button className="bg-slate-50 hover:bg-slate-100 p-4 rounded-md mt-4 font-bold text-slate-600">
        Download CV
      </button>
    </Section>
  );
};
