import AgLogo from './ag-logo';
import { Section } from './section';

export function Hero() {
  return (
    <Section>
      <div className="flex flex-1 items-center justify-center max-md:justify-start max-md:flex-col pt-12 pb-32">
        <div className="flex mr-8 max-md:mr-0 max-md:mb-2">
          <AgLogo className="w-32 max-md:w-24 h-auto" />
        </div>
        <div>
          <h1 className="text-left mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-600 max-md:text-2xl max-md:text-center">
            <span className="block leading-none">Software Engineer,</span>
            <span className="block leading-none">Designer,</span>
            <span className="block leading-none-10">Entrepreneur</span>
          </h1>
        </div>
      </div>
    </Section>
  );
}
