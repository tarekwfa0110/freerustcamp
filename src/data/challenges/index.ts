import { section1Challenges } from './section1';
import { Challenge, Section } from '@/types/challenge';

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

/**
 * Returns the section that contains the challenge with the given id (not the challenge itself).
 * Public API for section/curriculum lookups.
 */
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

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getChallengeSlug(challenge: Challenge): string {
  return slugify(challenge.title);
}

export function getChallengeBySlug(slug: string) {
  for (const section of sections) {
    const challenge = section.challenges.find((c) => getChallengeSlug(c) === slug);
    if (challenge) {
      return { challenge, section };
    }
  }
  return null;
}

export function getChallengeByIdOrSlug(idOrSlug: string) {
  return getChallenge(idOrSlug) ?? getChallengeBySlug(idOrSlug);
}

/** Public API: flat list of all challenges with their section. Used for curriculum listing / search. */
export function getAllChallenges() {
  return sections.flatMap((section) =>
    section.challenges.map((challenge) => ({ challenge, section }))
  );
}

export function getSectionById(id: number) {
  return sections.find((s) => s.id === id);
}

/** Public API: first challenge in a section (e.g. for "Start Section" links). */
export function getFirstChallengeForSection(sectionId: number) {
  const section = getSectionById(sectionId);
  return section && section.challenges.length > 0 ? section.challenges[0] : null;
}
