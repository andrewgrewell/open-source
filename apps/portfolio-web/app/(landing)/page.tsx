import { Hero } from '../../components/hero';
import { About } from '../../components/about';
import { Projects } from '../../components/projects';
import { Cv } from '../../components/cv';
import { ContractCta } from '../../components/contract-cta';

export default async function Index() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <ContractCta />
      <Cv />
    </>
  );
}
