import { FC } from 'react';
import { Card } from './card';
import { TagList } from './tag-list';
import Link from 'next/link';
import { PERSONAL_GITHUB_LINK } from '../config';

export interface Project {
  name: string;
  description: string;
  tags: string[];
  githubPath?: string;
  href?: string;
}

interface GithubProject extends Project {
  githubPath: string;
  href: never;
}

interface HostedProject extends Project {
  githubPath: never;
  href: string;
}

export interface ProjectListProps {
  projects: (GithubProject | HostedProject)[];
}
export const ProjectList: FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
      {projects.map((project) => {
        const href = project.githubPath
          ? `${PERSONAL_GITHUB_LINK}/${project.githubPath}`
          : project.href;
        return (
          <Link key={project.name} href={href} target="_blank">
            <Card className="min-w-48">
              <h4 className="font-heading font-bold mb-2">{project.name}</h4>
              <p className="flex flex-1 mb-2">{project.description}</p>
              <div className="py-2">
                <TagList tags={project.tags} />
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
