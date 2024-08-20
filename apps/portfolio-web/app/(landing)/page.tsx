import { Hero } from '../../components/hero';
import { About } from '../../components/about';
import { Projects } from '../../components/projects';
import { Cv } from '../../components/cv';

export default async function Index() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Cv />
    </>
  );
}
