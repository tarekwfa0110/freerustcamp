/**
 * FCC Import Tool: Converts freeCodeCamp markdown challenges to FreeRustCamp format
 *
 * This tool reads FCC markdown files and converts them to our internal format.
 * Template script - parseFCCMarkdown and convertToFreeRustCamp are for future use.
 */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { readFileSync } from 'fs';
import { basename } from 'path';

interface FCCChallenge {
  id: string;
  title: string;
  description: string;
  hints: string[];
  seed?: string;
  solutions?: string;
}

/**
 * Parse FCC markdown file
 */
function _parseFCCMarkdown(filePath: string): FCCChallenge | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    
    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return null;
    
    const frontmatter = frontmatterMatch[1];
    const idMatch = frontmatter.match(/id:\s*(.+)/);
    const titleMatch = frontmatter.match(/title:\s*(.+)/);
    
    // Extract description
    const descMatch = content.match(/# --description--\n\n([\s\S]*?)(?=\n# --hints--|$)/);
    
    // Extract hints
    const hintsMatch = content.match(/# --hints--\n\n([\s\S]*?)(?=\n# --seed--|$)/);
    const hints: string[] = [];
    if (hintsMatch) {
      const hintsText = hintsMatch[1];
      // Extract hint descriptions (text before code blocks)
      const hintLines = hintsText.split('\n').filter(line => {
        return line.trim().length > 0 && !line.trim().startsWith('```');
      });
      hints.push(...hintLines);
    }
    
    // Extract seed code
    const seedMatch = content.match(/# --seed--\n\n## --seed-contents--\n\n```[\w]*\n([\s\S]*?)\n```/);
    
    // Extract solutions
    const solutionsMatch = content.match(/# --solutions--\n\n```[\w]*\n([\s\S]*?)\n```/);
    
    return {
      id: idMatch ? idMatch[1].trim() : basename(filePath, '.md'),
      title: titleMatch ? titleMatch[1].trim() : 'Untitled',
      description: descMatch ? descMatch[1].trim() : '',
      hints,
      seed: seedMatch ? seedMatch[1].trim() : undefined,
      solutions: solutionsMatch ? solutionsMatch[1].trim() : undefined,
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

/**
 * Convert FCC challenge to FreeRustCamp format
 */
function convertToFreeRustCamp(fcc: FCCChallenge, stepNumber: number): string {
  // This is a template - actual conversion would need more sophisticated logic
  // to map FCC's HTML/CSS challenges to Rust challenges
  
  return `---
step: ${stepNumber}
title: ${fcc.title}
---

${fcc.description}

${fcc.hints.length > 0 ? `**Hints:**\n${fcc.hints.map(h => `- ${h}`).join('\n')}\n` : ''}

${fcc.seed ? `**Starter Code:**\n\`\`\`rust\n${fcc.seed}\n\`\`\`\n` : ''}
`;
}

/**
 * Main import function
 */
export function importFCCChallenges(fccDir: string, outputDir: string) {
  console.log(`Importing FCC challenges from ${fccDir}...`);
  
  // This is a template - actual implementation would:
  // 1. Scan fcc/ directory for markdown files
  // 2. Parse each file
  // 3. Convert to FreeRustCamp format
  // 4. Write to output directory
  
  console.log('FCC import tool template created.');
  console.log('This tool will convert FCC markdown challenges to FreeRustCamp format.');
}

// Export for use as CLI tool
if (import.meta.main) {
  const fccDir = process.argv[2] || './fcc';
  const outputDir = process.argv[3] || './src/content/section1';
  importFCCChallenges(fccDir, outputDir);
}
