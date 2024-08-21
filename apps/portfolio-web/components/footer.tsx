import { MaxContentWidth } from './max-content-width';
import { GithubLink } from './github-link';
import { LinkedinLink } from './linkedin-link';

export function Footer() {
  return (
    <MaxContentWidth>
      <footer className="bg-white flex flex-1 gap-x-2 max-md:flex-col-reverse items-center border-t border-slate-400/10 py-4">
        <p className="flex flex-1 mt-6 text-sm text-slate-500 mb-4">
          &copy; {new Date().getFullYear()} Andrew Grewell. All rights reserved.
        </p>
        <LinkedinLink />
        <GithubLink />
      </footer>
    </MaxContentWidth>
  );
}
