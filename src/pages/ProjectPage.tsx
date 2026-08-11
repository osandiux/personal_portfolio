import {
  ProjectOpen,
  ProjectBrief,
  ProjectStillOne,
  ProjectTwoUp,
  ProjectStillTwo,
  ContactSheet,
  ProjectQuote,
  NextProject,
} from '../sections/project/ProjectSections';
import { BeforeAfter } from '../sections/project/BeforeAfter';

export function ProjectPage() {
  return (
    <>
      <ProjectOpen />
      <ProjectBrief />
      <ProjectStillOne />
      <ProjectTwoUp />
      <BeforeAfter />
      <ProjectStillTwo />
      <ContactSheet />
      <ProjectQuote />
      <NextProject />
    </>
  );
}
