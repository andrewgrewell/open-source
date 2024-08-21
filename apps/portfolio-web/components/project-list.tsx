import { FC } from 'react';
import projectsJson from '../projects.json';
import { Card } from './card';
import { TagList } from './tag-list';

export interface Project {
  name: string;
  description: string;
  tags: string[];
  githubLink?: string;
}

export interface ProjectListProps {
  projects: Project[];
}
export const ProjectList: FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
      {projectsJson.projects.map((project) => (
        <Card key={project.name} className="min-w-48">
          <h4 className="font-display font-bold">{project.name}</h4>
          <p className="flex flex-1">{project.description}</p>
          <div className="py-2">
            <TagList tags={project.tags} />
          </div>
        </Card>
      ))}
    </div>
  );
};
