# Content: Adding and Editing Challenges

How curriculum data is defined today and how to add or change challenges and steps. The app uses **TypeScript** only; markdown is for a future migration.

## Where content lives (current)

- **Sections and challenge list:** `src/data/challenges/index.ts` â€” `sections` array and exports `getChallenge`, `getSectionById`, etc.
- **Section 1 challenges:** `src/data/challenges/section1.ts` â€” array of practice/certification projects.

To add a new section: add an entry to `sections` in `index.ts` and a new file (e.g. `section2.ts`) with that section's challenges. To add a challenge to Section 1: add an object to the Section 1 array in `section1.ts` and ensure its `id` is unique and referenced in the section's `challenges` array.

## Data model (types)

Defined in `src/types/challenge.ts`.

### Practice project

- **id**, **title**, **section**, **type: 'practice'**, **estimated_time**, **difficulty**
- **concepts_taught**, **project_overview**, **why_this_project**, **prerequisites**
- **steps**: array of `ProjectStep`
- **completion_message**; optional **extensions**, **preview** (modal before step 1)

### ProjectStep

- **step** (number, unique within challenge), **title**, **instruction**, **test** (string[]), **what_you_learned**
- Optional: **explanation**, **task**, **starterCode**, **validation** (data-driven rules), **highlightLine**, **editableRegion**

Notes from Project 1 + 2:
- **Step 0** is a project intro ("Understand what you're building"). It sets context, shows examples, and has a simple "read this" task.
- **highlightLine** is used heavily to point learners to the exact edit line. Keep it 1-indexed.
- **editableRegion** is rarely used today but remains available for future FCC-style guided edits.

### Certification project

- Same top-level fields as practice except **type: 'certification'**; **concepts** â†’ **description**; **requirements** (functional, technical, quality); **tests**, **evaluation**; no steps.

### Validation (data-driven)

In `step.validation` (see `src/types/validation.ts`): **rules** array of validation objects (e.g. `terminal_command`, `code_contains`, `code_matches`, `code_reject_patterns`, `function_exists`, `struct_exists`), each with **hints** and optional **message**. If `step.validation` is present, `data-driven-validator.ts` runs it; otherwise `step-validator.ts` uses hardcoded logic for that project/step.

## Where content appears

| Field | Where | How |
|-------|--------|-----|
| **Instruction** | Instructions panel (left) | Markdown: paragraphs, bold, inline code, code blocks, lists |
| **Task** | Instructions panel, below instruction | Markdown; the specific thing the user must do |
| **Tests / checks** | Message box (below editor) | Validation messages and "Checks"; not in instruction body |
| **What you learned** | Message box | Shown when step is complete |
| **Hints** | Message box | Shown after submit (Ctrl+Enter) when validation fails |

Put teaching and the task in **instruction** and **task**. Don't put test descriptions or "what you learned" in the instruction; the app shows those in the message box.

## Step structure (per step)

1. **Explain** — Short explanation (1–3 sentences) for simple steps; longer explanations are OK when the concept is heavy. Why it matters, how it works.
2. **Example** â€” Code snippet that shows the **pattern** with names/values that are not the same as the task.
3. **Task** â€” One clear action. Last paragraph of instruction or the `task` field.

Rule: Explanation and example first; exact thing to type/implement last. Don't lead with the solution.

**Philosophy: Granular steps are encouraged.** Break down concepts into small, digestible steps. Each step should teach one concept or require one clear action. Don't combine multiple concepts into a single step. Reference Project 1 and Project 2 as the target: they use ~20–25 steps for a 1-hour project, breaking down every concept (project creation, imports, parsing, type annotations, conversions, error handling, match, Option) into individual steps. This granularity makes learning easier and reduces cognitive load.

Exception: Single-sentence steps are ok when the action is trivial and the user has already seen the pattern.

**Long explanations are allowed when the concept is heavy.** Project 2 (Option / error handling) uses multi-paragraph explanations with headings and bullets. The instruction body can be longer than 3 sentences when needed, as long as it remains scannable (short paragraphs, clear headings, concrete examples).

## Code snippets

- **Example:** Use different variable names or values than the task (e.g. `let first_item = &my_vec[0];` when the task is "store `args[1]` in `temp_str`").
- **Task:** State the exact goal (variable names, types, indices).
- Don't give the exact solution in the example so the user can copy-paste without thinking.
- **Avoid duplicate instructions:** If the example would repeat the task (common for terminal commands), skip the example block. Repeating the same command in an "Example" block and again in the task is a bad design.

## Instruction rules

- **Length:** Keep the step scannable. Short steps are preferred, but long, multi-paragraph explanations are acceptable for foundational concepts (see Project 2 Option/error handling steps).
- **Action-oriented:** The **task** must be explicit. The **instruction** can start with context or explanation; it does not need to start with a verb.
- **Terminal commands:** Explain why in the instruction, but put the exact command only in the **task**. Do not include the exact command text in the instruction or explanation.
- **Code to type:** Explain the concept and pattern in the instruction, but do not include the exact line the user must type. The exact code belongs only in the **task**.
- **Text output strings:** If a step requires printing exact output text (usage, headers, debug lines, errors), include the exact text only in the **task** as a `text` code block. Do not include the exact output text in the instruction or explanation.
- **One concept per step:** One snippet that teaches the pattern; optional bullets for terms.
- **Granularity:** Prefer more steps over fewer. It's better to have 20 small steps than 10 large ones. Each step should feel achievable and focused. See Project 1 + 2 for reference: creating a project, entering the folder, and running it are three separate steps, not one.

## Validation (data-driven)

Define rules in step data so the app can validate without hardcoded logic. See `src/types/validation.ts` and [architecture.md](architecture.md#validation).

Example (terminal command):

```ts
validation: {
  rules: [
    {
      type: 'terminal_command',
      command: 'cargo new',
      projectSpecific: 'temp_converter',
      hints: ['Open the terminal', 'Type: cargo new temp_converter', 'Press Enter'],
    },
  ],
  message: 'Run `cargo new temp_converter` in the terminal first',
}
```

Note: `projectSpecific` can be more than a folder name. Project 2 uses it to enforce argument sets (e.g., `cargo run -- 25 + 17`).

Other types: `code_contains`, `code_matches`, `code_reject_patterns`, `function_exists`, `struct_exists`, etc.

Project 1 + 2 also use a **negative rule** pattern to block stale lines:

```ts
{
  type: 'code_reject_patterns',
  patterns: ['let args = env::args();'],
  hints: ['Replace the iterator line instead of keeping it'],
}
```

Use this when a step replaces a previous line and you want to ensure the old line is gone.

### Validation Best Practices

### Key Learnings from Project 2

1. **Examples should not mirror tasks** - Use different variable names/values
2. **Validation regex must handle flexible spacing** - Use `\\s*` for optional whitespace
3. **Match arms don't need semicolons** - Must skip them in validation
4. **Format strings need careful escaping** - `{:.2}` not `{:.{2}}`
5. **Nested braces in regex** - Use `[\\s\\S]*?` instead of `[^}]*`
6. **Instruction vs Explanation vs Task** - Clear separation of concerns
7. **Real execution > simulation** - When possible, use actual Rust compilation

**Function signature validation:**
- **Never use exact string matching** for function signatures with `code_contains` when checking parameter types. Rust allows flexible spacing (e.g., `a: f64` or `a:f64`), and users may write either style.
- **Use `code_matches` with regex** instead to allow flexible whitespace. Example:

```ts
// âŒ BAD - Too strict, fails if user writes a:f64 instead of a: f64
{
  type: 'code_contains',
  patterns: ['fn add(a: f64, b: f64)'],
}

// âœ… GOOD - Flexible, accepts both a: f64 and a:f64
{
  type: 'code_matches',
  regex: 'fn\\s+add\\s*\\(\\s*a\\s*:\\s*f64\\s*,\\s*b\\s*:\\s*f64\\s*\\)',
  hints: ['Check spacing: a: f64 (space after colon) or a:f64 (no space) both work'],
}
```

**Regex pattern for function signatures:**
- Use `\\s*` (zero or more whitespace) around colons and commas to allow flexible spacing
- Use `\\s+` (one or more whitespace) for required spaces (like after `fn`)
- Escape special regex characters: `\\(`, `\\)`, `\\+`, `\\*`, etc.

**General rules:**
- Prefer `code_matches` with regex for structural checks (function signatures, type annotations)
- Use `code_contains` for simple substring checks (like checking for keywords or specific strings)
- Always provide helpful hints that mention spacing flexibility when relevant
- For replacements, use `code_reject_patterns` to prevent the old line from lingering (see Project 1 + 2)

## Adding a new step (practice project)

1. Add an object to the project's **steps** array in `section1.ts` (or the section file).
2. Set **step** (unique number), **title**, **instruction**, **test** (short descriptions), **what_you_learned**.
3. Optionally set **explanation**, **task**, **starterCode**, **validation**, **highlightLine**, **editableRegion** (see `validation.ts` and existing steps for examples).
4. Ensure no other step in that challenge has the same **step** number.

## Quality checklist

- [ ] Each step has one clear action (granular steps are encouraged).
- [ ] Example uses different names/values than the task.
- [ ] Step numbers unique per challenge.
- [ ] Validation rules or hardcoded logic for each step (no auto-pass).
- [ ] "What you learned" and hints in data, not in instruction body.
- [ ] Steps are broken down granularly (reference Project 1 + 2: ~20–25 steps for a 1-hour project is the target).
- [ ] Each concept (imports, parsing, type annotations, etc.) gets its own step when first introduced.
- [ ] No duplicate instruction blocks (avoid example text that repeats the task).

## Future: Markdown content

When markdown is enabled (see `src/lib/LOADERS_README.md`), content can live in `src/content/sectionN/*.md` with frontmatter and step sections. The app does not use markdown at runtime today; curriculum is TypeScript only.















