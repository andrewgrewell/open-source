import { FC } from 'react';
import clsx from 'clsx';
import { MaxContentWidth } from './max-content-width';
import { GithubLink } from './github-link';

const NavRoutes = [
  { color: 'red', href: '#about', label: 'About' },
  { color: 'blue', href: '#projects', label: 'Projects' },
  { color: 'purple', href: '#cv', label: 'CV' },
];

export const Header: FC = () => {
  return (
    <header className="flex flex-1 flex-row">
      <MaxContentWidth>
        <nav className="flex flex-1 items-center border-b-2 border-b-slate-100 py-5">
          <ul className="flex flex-1 flex-row gap-x-4">
            {NavRoutes.map(({ href, label, color }) => {
              return (
                <li key={href}>
                  <a
                    className={clsx(
                      'px-2 py-2 border-b-2 border-transparent text-lg text-slate-500 font-bold font-display',
                      {
                        'hover:border-blue-700 hover:text-blue-700': color === 'blue',
                        'hover:border-purple-700 hover:text-purple-700':
                          color === 'purple',
                        'hover:border-red-700 hover:text-red-700': color === 'red',
                      },
                    )}
                    href={href}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex gap-x-6">
            <GithubLink />
          </div>
        </nav>
      </MaxContentWidth>
    </header>
  );
};
