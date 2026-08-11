import {
  BuildHead,
  SystemShowcase,
  ChromeCatalog,
  BuildOutline,
  BuildMilestones,
  BuildChallenges,
  BuildSteps,
  BuildTradeoffs,
  BuildLearnings,
} from '../sections/build/BuildSections';

export function BuildPage() {
  return (
    <>
      <BuildHead />
      <SystemShowcase />
      <ChromeCatalog />
      <BuildOutline />
      <BuildMilestones />
      <BuildChallenges />
      <BuildSteps />
      <BuildTradeoffs />
      <BuildLearnings />
    </>
  );
}
