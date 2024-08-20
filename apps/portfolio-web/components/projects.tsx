import { FC } from 'react';
import { Section } from './section';
import { SectionTitle } from './section-title';
import projectsJson from '../projects.json';
import { ProjectList } from './project-list';

export const Projects: FC = () => {
  return (
    <Section>
      <SectionTitle>Projects</SectionTitle>
      <p>Here are some of the projects I have worked on:</p>
      <div className="mt-4">
        <ProjectList projects={projectsJson.projects} />
      </div>
    </Section>
  );
};
