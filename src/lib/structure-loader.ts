/**
 * Loads structure metadata (section and challenge ordering)
 * Similar to FCC's structure/ directory
 */

export interface SectionMetadata {
  id: number;
  title: string;
  description: string;
  estimated_hours: string;
  challenges_file: string;
}

export interface ChallengeMetadata {
  id: string;
  order: number;
  content_file: string;
}

export interface SectionStructure {
  section_id: number;
  challenges: ChallengeMetadata[];
}

// Load sections metadata
export async function loadSectionsMetadata(): Promise<SectionMetadata[]> {
  try {
    const response = await fetch('/src/data/structure/sections.json');
    const data = await response.json();
    return data.sections;
  } catch (error) {
    console.error('Failed to load sections metadata:', error);
    // Fallback to hardcoded structure
    return [
      {
        id: 1,
        title: 'Fundamentals & CLI Tools',
        description: 'Master Rust syntax, ownership, and build practical command-line applications.',
        estimated_hours: '80-100',
        challenges_file: 'section1.json',
      },
    ];
  }
}

// Load section structure (challenge ordering)
export async function loadSectionStructure(sectionId: number): Promise<SectionStructure | null> {
  try {
    const response = await fetch(`/src/data/structure/section${sectionId}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to load section ${sectionId} structure:`, error);
    return null;
  }
}

// Get ordered challenge IDs for a section
export async function getOrderedChallengeIds(sectionId: number): Promise<string[]> {
  const structure = await loadSectionStructure(sectionId);
  if (!structure) return [];
  
  return structure.challenges
    .sort((a, b) => a.order - b.order)
    .map(c => c.id);
}
