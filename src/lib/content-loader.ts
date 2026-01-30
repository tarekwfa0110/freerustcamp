import { Challenge } from '@/types/challenge';
import { parseMarkdownChallenge } from './markdown-parser';

// Dynamic imports for all markdown files
const contentModules = import.meta.glob('../content/**/*.md', { as: 'raw' });

export async function loadChallenge(sectionId: number, challengeId: string): Promise<Challenge> {
  const path = `../content/section${sectionId}/${challengeId}.md`;
  const module = contentModules[path];
  
  if (!module) {
    throw new Error(`Challenge not found: ${challengeId}`);
  }
  
  const markdown = await module();
  return parseMarkdownChallenge(markdown);
}

export async function loadSectionChallenges(sectionId: number): Promise<Challenge[]> {
  const sectionPattern = `../content/section${sectionId}/`;
  const challenges: Challenge[] = [];
  
  for (const [path, loader] of Object.entries(contentModules)) {
    if (path.startsWith(sectionPattern) && path.endsWith('.md')) {
      const markdown = await (loader as () => Promise<string>)();
      const challenge = parseMarkdownChallenge(markdown);
      challenges.push(challenge);
    }
  }
  
  return challenges.sort((a, b) => a.id.localeCompare(b.id));
}
