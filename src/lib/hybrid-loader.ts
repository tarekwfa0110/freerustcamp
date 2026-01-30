/**
 * Hybrid loader: Supports both TypeScript and Markdown challenge sources
 * During migration, we'll use this to gradually move from TS to MD
 */

import { Challenge, Section } from '@/types/challenge';
import { getChallenge as getTSChallenge, getSectionById as getTSSectionById, sections as tsSections } from '@/data/challenges';
import { loadChallenge as loadMDChallenge, loadSectionChallenges as loadMDSectionChallenges } from './content-loader';
import { loadSectionsMetadata, loadSectionStructure, getOrderedChallengeIds } from './structure-loader';

// Configuration: Set to true to use markdown, false to use TypeScript
const USE_MARKDOWN = false; // Start with TS, migrate gradually

export async function getChallenge(id: string): Promise<{ challenge: Challenge; section: Section } | null> {
  if (USE_MARKDOWN) {
    try {
      const sectionsMeta = await loadSectionsMetadata();
      for (const sectionMeta of sectionsMeta) {
        const structure = await loadSectionStructure(sectionMeta.id);
        const matched = structure?.challenges.find(
          c => c.id === id || c.id.replace(/\.md$/, '') === id.replace(/\.md$/, '')
        );
        if (matched) {
          const loadId = matched.id.replace(/\.md$/, '');
          const challenge = await loadMDChallenge(sectionMeta.id, loadId);
          if (challenge) {
            const section: Section = {
              id: sectionMeta.id,
              title: sectionMeta.title,
              description: sectionMeta.description,
              estimated_hours: sectionMeta.estimated_hours,
              challenges: [],
            };
            return { challenge, section };
          }
          // loadMDChallenge returned null, continue searching other sections
        }
      }
      // No non-null challenge from markdown, fall back to TypeScript
    } catch (error) {
      console.warn(`Failed to load challenge ${id} from markdown, falling back to TS:`, error);
    }
  }

  return getTSChallenge(id);
}

export async function getSectionById(id: number): Promise<Section | null> {
  if (USE_MARKDOWN) {
    try {
      const sectionsMeta = await loadSectionsMetadata();
      const sectionMeta = sectionsMeta.find(s => s.id === id);
      if (sectionMeta) {
        const structure = await loadSectionStructure(id);
        if (structure) {
          const challenges = await loadMDSectionChallenges(id);
          // Sort by order from structure
          const orderedIds = await getOrderedChallengeIds(id);
          challenges.sort((a, b) => {
            const aIndex = orderedIds.indexOf(a.id);
            const bIndex = orderedIds.indexOf(b.id);
            return aIndex - bIndex;
          });
          
          return {
            id: sectionMeta.id,
            title: sectionMeta.title,
            description: sectionMeta.description,
            estimated_hours: sectionMeta.estimated_hours,
            challenges,
          };
        }
      }
    } catch (error) {
      console.warn(`Failed to load section ${id} from markdown, falling back to TS:`, error);
    }
  }
  
  // Fallback to TypeScript
  const section = getTSSectionById(id);
  return section ?? null;
}

export async function getAllSections(): Promise<Section[]> {
  if (USE_MARKDOWN) {
    try {
      const sectionsMeta = await loadSectionsMetadata();
      const sections: Section[] = [];
      
      for (const sectionMeta of sectionsMeta) {
        const section = await getSectionById(sectionMeta.id);
        if (section) {
          sections.push(section);
        }
      }
      
      return sections;
    } catch (error) {
      console.warn('Failed to load sections from markdown, falling back to TS:', error);
    }
  }
  
  // Fallback to TypeScript
  return tsSections;
}
