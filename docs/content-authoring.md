# Content Authoring

How to write challenges for FreeRustCamp. Aligned with the app: instructions panel, message box (checks, hints, what you learned).

## Where content appears

| Field | Where | How |
|-------|--------|-----|
| **Instruction** | Instructions panel (left) | Markdown: paragraphs, bold, inline code, code blocks, lists |
| **Task** | Instructions panel, below instruction | Markdown; the specific thing the user must do |
| **Tests / checks** | Message box (below editor) | Validation messages and “Checks”; not in instruction body |
| **What you learned** | Message box | Shown when step is complete |
| **Hints** | Message box | Shown after submit (Ctrl+Enter) when validation fails |

Put teaching and the task in **instruction** and **task**. Don’t put test descriptions or “what you learned” in the instruction; the app shows those in the message box.

## Step structure (per step)

1. **Explain** — Short explanation (1–3 sentences). Why it matters, how it works.
2. **Example** — Code snippet that shows the **pattern** with **different** names/values from the task.
3. **Task** — One clear action. Last paragraph of instruction or the `task` field.

Rule: Explanation and example first; exact thing to type/implement last. Don't lead with the solution.

**Philosophy: Granular steps are encouraged.** Break down concepts into small, digestible steps. Each step should teach one concept or require one clear action. Don't combine multiple concepts into a single step. Reference Project 1 (Temperature Converter) as the target: it has 23 steps for a 1-hour project, breaking down every concept (project creation, imports, parsing, type annotations, conversions, error handling) into individual steps. This granularity makes learning easier and reduces cognitive load.

Exception: Single-sentence steps are ok when the action is trivial and the user has already seen the pattern.

## Code snippets

- **Example:** Use different variable names or values than the task (e.g. `let first_item = &my_vec[0];` when the task is “store `args[1]` in `temp_str`”).
- **Task:** State the exact goal (variable names, types, indices).
- Don’t give the exact solution in the example so the user can copy-paste without thinking.

## Instruction rules

- **Length:** 1–3 sentences for intro; keep the step scannable (linter warns if >5 sentences).
- **Action-oriented:** Start with verbs (create, add, set, implement).
- **One concept per step:** One snippet that teaches the pattern; optional bullets for terms.
- **Granularity:** Prefer more steps over fewer. It's better to have 20 small steps than 10 large ones. Each step should feel achievable and focused. See Project 1 for reference: creating a project, entering the folder, and running it are three separate steps, not one.

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

Other types: `code_contains`, `code_matches`, `function_exists`, `struct_exists`, etc.

## Where to edit content

- **Current:** Edit `src/data/challenges/section1.ts`. Each challenge has `steps[]` with `instruction`, `task`, `test`, `what_you_learned`, optional `explanation`, `starterCode`, `validation`.
- **Future:** Markdown in `src/content/sectionX/*.md` when markdown loader is enabled (see `src/lib/LOADERS_README.md`).

## Quality checklist

- [ ] Each step has one clear action (granular steps are encouraged).
- [ ] Example uses different names/values than the task.
- [ ] Step numbers unique per challenge.
- [ ] Validation rules or hardcoded logic for each step (no auto-pass).
- [ ] "What you learned" and hints in data, not in instruction body.
- [ ] Steps are broken down granularly (reference Project 1: ~20–25 steps for a 1-hour project is the target).
- [ ] Each concept (imports, parsing, type annotations, etc.) gets its own step when first introduced.
