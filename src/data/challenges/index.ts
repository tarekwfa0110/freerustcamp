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

/**
 * Locate a challenge by its id and return it together with its containing section.
 *
 * @param id - The challenge identifier to look up.
 * @returns The object `{ challenge, section }` when a matching challenge is found, or `null` otherwise.
 */
export function getChallenge(id: string) {
  for (const section of sections) {
    const challenge = section.challenges.find((c) => c.id === id);
    if (challenge) {
      return { challenge, section };
    }
  }
  return null;
}

/**
 * Converts a string into a URL-friendly slug.
 *
 * @param value - The input string to convert
 * @returns The resulting slug: lowercase, trimmed, with non-alphanumeric characters replaced by hyphens and without leading or trailing hyphens
 */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Produce a URL-safe slug from a challenge's title.
 *
 * @param challenge - The challenge whose title will be converted into a slug
 * @returns The slug derived from the challenge's title
 */
export function getChallengeSlug(challenge: Challenge): string {
  return slugify(challenge.title);
}

/**
 * Finds a challenge and its containing section by the challenge's slug.
 *
 * @param slug - The URL-friendly challenge identifier to locate
 * @returns An object with `challenge` and `section` when a matching challenge is found, `null` otherwise
 */
export function getChallengeBySlug(slug: string) {
  for (const section of sections) {
    const challenge = section.challenges.find((c) => getChallengeSlug(c) === slug);
    if (challenge) {
      return { challenge, section };
    }
  }
  return null;
}

/**
 * Finds a challenge by its numeric id or by its slug.
 *
 * @param idOrSlug - The challenge identifier: either the challenge `id` string or a slug generated from the challenge title
 * @returns An object containing `challenge` and its `section` if found, `null` otherwise
 */
export function getChallengeByIdOrSlug(idOrSlug: string) {
  return getChallenge(idOrSlug) ?? getChallengeBySlug(idOrSlug);
}

/**
 * Return a flat array of every challenge paired with its containing section.
 *
 * @returns An array of objects each with `challenge` and its containing `section`
 */
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