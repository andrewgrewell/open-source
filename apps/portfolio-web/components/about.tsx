import { FC } from 'react';
import { Section } from './section';
import { SectionTitle } from './section-title';
import { SectionSubheading } from './section-subheading';

export const About: FC = () => {
  return (
    <Section data-testid="about-section" className="flex flex-col">
      <SectionTitle id="about">Hi, I&apos;m Andrew</SectionTitle>
      <SectionSubheading className="max-w-2xl text-lg">
        I am a seasoned Software Engineer based in the Pacific Northwest with over a
        decade of professional experience. My journey in software development began in my
        youth, and over the years, I've grown not just in technical expertise but also in
        leadership. I have led and grown teams, establishing efficient processes that
        ensure high-quality, maintainable software. I prioritize creating solutions that
        are easy to extend, cost-effective to run, and, most importantly, make customers
        happy. I am passionate about continually refining my craft, delivering software
        that delights users and drives business success.
      </SectionSubheading>
    </Section>
  );
};
