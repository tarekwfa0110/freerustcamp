import { section1Challenges } from './section1';
import { Section } from '@/types/challenge';

export const sections: Section[] = [
  {
    id: 1,
    title: 'Fundamentals & CLI Tools',
    description: 'Master Rust syntax, ownership, and build practical command-line applications.',
    estimated_hours: '80-100',
    challenges: section1Challenges,
  },
  // More sections will be added as we build them out
];

export function getChallengeById(id: string): Section | null {
  for (const section of sections) {
    const challenge = section.challenges.find((c) => c.id === id);
    if (challenge) {
      return section;
    }
  }
  return null;
}

export function getChallenge(id: string) {
  for (const section of sections) {
    const challenge = section.challenges.find((c) => c.id === id);
    if (challenge) {
      return { challenge, section };
    }
  }
  return null;
}

export function getAllChallenges() {
  return sections.flatMap((section) =>
    section.challenges.map((challenge) => ({ challenge, section }))
  );
}

export function getSectionById(id: number) {
  return sections.find((s) => s.id === id);
}

export function getFirstChallengeForSection(sectionId: number) {
  const section = getSectionById(sectionId);
  return section && section.challenges.length > 0 ? section.challenges[0] : null;
}
