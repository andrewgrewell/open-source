import { FC } from 'react';
import { Section } from './section';
import { SectionTitle } from './section-title';
import cv from '../cv.json';

export const Cv: FC = () => {
  return (
    <Section>
      <SectionTitle>CV</SectionTitle>
      <p>Here are some of the teams I&apos;ve worked with</p>
      <ol>
        {cv.history.map((entry) => (
          <li key={entry.company}>
            <h3>{entry.company}</h3>
            <p>{entry.title}</p>
            <p>{entry.startDate}</p>
            <p>{entry.endDate}</p>
            <p>{entry.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
};
