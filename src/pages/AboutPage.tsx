import { AboutHead, Bio, Timeline, Kit } from '../sections/about/AboutSections';
import { DevelopScroll } from '../sections/about/DevelopScroll';

export function AboutPage() {
  return (
    <>
      <AboutHead />
      <DevelopScroll />
      <Bio />
      <Timeline />
      <Kit />
    </>
  );
}
