import { FC } from 'react';
import { Questrial } from 'next/font/google';
import clsx from 'clsx';
import { Section } from './section';
import { SectionTitle } from './section-title';
const fontSans = Questrial({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: '400',
});

export const About: FC = () => {
  return (
    <Section data-testid="about-section" className="flex flex-col">
      <SectionTitle>Hi, I&apos;m Andrew</SectionTitle>
      <p
        className={clsx(
          'text-xl leading-relaxed text-slate-700 font-sans',
          fontSans.className,
        )}
      >
        a seasoned Software Engineer based in the Pacific Northwest.
      </p>
    </Section>
  );
};
