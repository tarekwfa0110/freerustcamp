# Content: Adding and Editing Challenges

How curriculum data is defined today and how to add or change challenges and steps. The app uses **TypeScript** only; markdown is for a future migration.

## Where content lives (current)

- **Sections and challenge list:** `src/data/challenges/index.ts` — `sections` array and exports `getChallenge`, `getSectionById`, etc.
- **Section 1 challenges:** `src/data/challenges/section1.ts` — array of practice/certification projects.

To add a new section: add an entry to `sections` in `index.ts` and a new file (e.g. `section2.ts`) with that section’s challenges. To add a challenge to Section 1: add an object to the Section 1 array in `section1.ts` and ensure its `id` is unique and referenced in the section’s `challenges` array.

## Data model (types)

Defined in `src/types/challenge.ts`.

### Practice project

- **id**, **title**, **section**, **type: 'practice'**, **estimated_time**, **difficulty**
- **concepts_taught**, **project_overview**, **why_this_project**, **prerequisites**
- **steps**: array of `ProjectStep`
- **completion_message**; optional **extensions**, **preview** (modal before step 1)

### ProjectStep

- **step** (number, unique within challenge), **title**, **instruction**, **test** (string[]), **what_you_learned**
- Optional: **explanation**, **task**, **starterCode**, **validation** (data-driven rules)

### Certification project

- Same top-level fields as practice except **type: 'certification'**; **concepts** → **description**; **requirements** (functional, technical, quality); **tests**, **evaluation**; no steps.

### Validation (data-driven)

In `step.validation` (see `src/types/validation.ts`): **rules** array of validation objects (e.g. `terminal_command`, `code_contains`, `code_matches`, `function_exists`, `struct_exists`), each with **hints** and optional **message**. If `step.validation` is present, `data-driven-validator.ts` runs it; otherwise `step-validator.ts` uses hardcoded logic for that project/step.

## Writing guidelines (condensed)

- **One clear action per step;** instructions start with verbs; 1–3 sentences.
- **Explanations** in a collapsible “Learn more” (use **explanation** and **what_you_learned**).
- **Starter code** via **starterCode** when needed; otherwise a single generic fallback is used.
- **Validation:** Prefer **validation** rules in step data over adding hardcoded branches in `step-validator.ts`.
- **Step numbers:** Unique; no duplicates. Renumber if you insert/remove steps.

## Adding a new step (practice project)

1. Add an object to the project’s **steps** array in `section1.ts` (or the section file).
2. Set **step** (unique number), **title**, **instruction**, **test** (short descriptions), **what_you_learned**.
3. Optionally set **explanation**, **task**, **starterCode**, **validation** (see `validation.ts` and existing steps for examples).
4. Ensure no other step in that challenge has the same **step** number.

## Future: Markdown content

When markdown is enabled (see `src/lib/LOADERS_README.md`), content can live in `src/content/sectionN/*.md` with frontmatter and step sections. The app does not use markdown at runtime today; curriculum is TypeScript only.
