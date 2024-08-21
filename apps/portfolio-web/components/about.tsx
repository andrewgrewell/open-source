import { FC } from 'react';
import { Section } from './section';
import { SectionTitle } from './section-title';
import { SectionSubheading } from './section-subheading';

export const About: FC = () => {
  return (
    <Section data-testid="about-section" className="flex flex-col">
      <SectionTitle id="about">Hi, I&apos;m Andrew</SectionTitle>
      <SectionSubheading>
        a seasoned Software Engineer based in the Pacific Northwest.
      </SectionSubheading>
    </Section>
  );
};
