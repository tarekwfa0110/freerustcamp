import matter from 'gray-matter';
import { Challenge, PracticeProject, CertificationProject, ProjectStep } from '@/types/challenge';

interface StepSection {
  step: number;
  title: string;
  content: string;
  explanation?: string;
  task?: string;
  starterCode?: string;
  test?: string[];
  whatYouLearned?: string;
}

const REQUIRED_FRONTMATTER_FIELDS = ['id', 'title', 'section', 'estimated_time', 'difficulty'] as const;

function validateFrontmatter(frontmatter: Record<string, unknown>, context?: string): void {
  for (const field of REQUIRED_FRONTMATTER_FIELDS) {
    const value = frontmatter[field];
    if (value === undefined || value === null || value === '') {
      const snippet = context ?? JSON.stringify(frontmatter, null, 2);
      throw new Error(
        `Markdown challenge frontmatter missing required field "${field}". ` +
        `Frontmatter: ${snippet}`
      );
    }
  }
}

/**
 * Parse a markdown challenge (with YAML frontmatter) into a structured Challenge object.
 *
 * Accepts markdown containing YAML frontmatter describing a challenge and returns either a
 * CertificationProject or a PracticeProject representation depending on the frontmatter `type`.
 *
 * @param markdown - Markdown text including YAML frontmatter and body content (project description and/or steps)
 * @returns A `Challenge` object: a `CertificationProject` when `frontmatter.type === 'certification'`, otherwise a `PracticeProject`
 * @throws Error - If required frontmatter fields are missing or empty
 */
export function parseMarkdownChallenge(markdown: string): Challenge {
  const { data: frontmatter, content } = matter(markdown);
  validateFrontmatter(frontmatter as Record<string, unknown>, JSON.stringify(frontmatter, null, 2));

  // Handle certification projects
  if (frontmatter.type === 'certification') {
    return {
      id: frontmatter.id,
      title: frontmatter.title,
      section: frontmatter.section,
      type: 'certification',
      estimated_time: frontmatter.estimated_time,
      difficulty: frontmatter.difficulty,
      concepts: frontmatter.concepts || [],
      description: content.trim(),
      requirements: frontmatter.requirements || { functional: [], technical: [] },
      example_output: frontmatter.example_output,
      tests: frontmatter.tests || [],
      evaluation: frontmatter.evaluation || [],
    } as CertificationProject;
  }
  
  // Handle practice projects
  const stepSections = extractSteps(content);
  
  // Extract overview and why sections
  const overview = extractSection(content, '# Project Overview', '##');
  const whyProject = extractSection(content, '## Why This Project?', '##');
  
  const steps: ProjectStep[] = stepSections.map(section => ({
    id: `step-${section.step}`,
    step: section.step,
    title: section.title,
    instruction: section.content,
    explanation: section.explanation,
    task: section.task,
    starterCode: section.starterCode,
    test: section.test || [],
    what_you_learned: section.whatYouLearned || '',
  }));
  
  return {
    id: frontmatter.id,
    title: frontmatter.title,
    section: frontmatter.section,
    type: 'practice',
    estimated_time: frontmatter.estimated_time,
    difficulty: frontmatter.difficulty,
    concepts_taught: frontmatter.concepts_taught || [],
    project_overview: overview,
    why_this_project: whyProject,
    prerequisites: frontmatter.prerequisites || [],
    order: steps.map(step => step.id),
    steps,
    completion_message: frontmatter.completion_message || '',
    extensions: frontmatter.extensions || '',
  } as PracticeProject;
}

function extractSteps(content: string): StepSection[] {
  const steps: StepSection[] = [];
  const stepRegex = /## Step (\d+): (.+?)$/gm;
  
  let match;
  const stepMatches: Array<{ index: number; step: number; title: string }> = [];
  
  while ((match = stepRegex.exec(content)) !== null) {
    stepMatches.push({
      index: match.index,
      step: parseInt(match[1]),
      title: match[2].trim(),
    });
  }
  
  // Extract content between step headers
  for (let i = 0; i < stepMatches.length; i++) {
    const current = stepMatches[i];
    const next = stepMatches[i + 1];
    
    const start = current.index + content.substring(current.index).indexOf('\n');
    const end = next ? next.index : content.length;
    const stepContent = content.substring(start, end).trim();
    
    // Extract all sections
    const explanationMatch = stepContent.match(/### Explanation:\s*\n(.+?)(?=\*\*Task:\*\*|\*\*Starter Code:\*\*|\*\*Tests:\*\*|\*\*What You Learned:\*\*|$)/s);
    const taskMatch = stepContent.match(/\*\*Task:\*\*\s*\n(.+?)(?=\*\*Starter Code:\*\*|\*\*Tests:\*\*|\*\*What You Learned:\*\*|$)/s);
    const starterCodeMatch = stepContent.match(/\*\*Starter Code:\*\*\s*\n```rust\n(.+?)\n```/s);
    const testsMatch = stepContent.match(/\*\*Tests:\*\*\s*\n(.+?)(?=\*\*What You Learned:\*\*|$)/s);
    const whatLearnedMatch = stepContent.match(/\*\*What You Learned:\*\*\s*\n(.+?)$/s);
    
    // Extract main instruction (everything before special sections)
    let mainContent = stepContent;
    if (explanationMatch) mainContent = mainContent.replace(/### Explanation:.+/s, '');
    if (taskMatch) mainContent = mainContent.replace(/\*\*Task:\*\*.+/s, '');
    if (starterCodeMatch) mainContent = mainContent.replace(/\*\*Starter Code:\*\*.+/s, '');
    if (testsMatch) mainContent = mainContent.replace(/\*\*Tests:\*\*.+/s, '');
    if (whatLearnedMatch) mainContent = mainContent.replace(/\*\*What You Learned:\*\*.+/s, '');
    mainContent = mainContent.trim();
    
    // Parse tests (list items)
    const testItems: string[] = [];
    if (testsMatch) {
      const testText = testsMatch[1];
      const testLines = testText.split('\n').filter(line => line.trim().startsWith('-'));
      testItems.push(...testLines.map(line => line.replace(/^-\s*/, '').trim()));
    }
    
    steps.push({
      step: current.step,
      title: current.title,
      content: mainContent,
      explanation: explanationMatch ? explanationMatch[1].trim() : undefined,
      task: taskMatch ? taskMatch[1].trim() : undefined,
      starterCode: starterCodeMatch ? starterCodeMatch[1].trim() : undefined,
      test: testItems.length > 0 ? testItems : undefined,
      whatYouLearned: whatLearnedMatch ? whatLearnedMatch[1].trim() : undefined,
    });
  }
  
  return steps;
}

function extractSection(content: string, startMarker: string, endMarker: string): string {
  const startIndex = content.indexOf(startMarker);
  if (startIndex === -1) return '';
  
  const contentAfterStart = content.substring(startIndex + startMarker.length);
  const endIndex = contentAfterStart.indexOf(endMarker);
  
  const section = endIndex === -1 
    ? contentAfterStart 
    : contentAfterStart.substring(0, endIndex);
  
  return section.trim();
}