# FreeRustCamp: Curriculum Plan

High-level curriculum structure. For the full detailed plan (all sections, all projects), see repo `docs/curriculum/CURRICULUM.md`.

## Overview

- **Total duration:** ~400 hours  
- **Target:** From “finished Rust book” to job-ready Rust developer  
- **Method:** 100% project-based learning

**Philosophy:**

1. Project-based: learn by building real applications  
2. Progressive: small projects (30 min) → large (20+ hours)  
3. Step-by-step guidance with explanations  
4. Practice projects have full steps; certification projects have requirements + tests only  

**Structure:** Sections 1–4 = core (~350 h); Section 5 = specialization (30–60 h).

## Project types

| Type | Duration | Guidance | Tests |
|------|----------|----------|--------|
| **Practice** | 30 min – 10 h | Full step-by-step instructions, explanations, starter code where needed | Per-step validation |
| **Certification** | 6–30 h | Requirements only; no steps | Full test suite |

Naming: practice = “Learn X by Building Y”; certification = “Build a X Project”.

## Section 1: Fundamentals & CLI Tools (80–100 hours)

**Objectives:** Rust syntax, ownership, borrowing, command-line apps, errors, files, collections, iterators.

### Practice projects (15–20, ~60–70 h)

**Tiny (30 min – 1 h, 5–8 steps)**  
1. Learn Variables by Building a Temperature Converter (1 h)  
2. Learn Functions by Building a Calculator (1 h)  
3. Learn Ownership by Building a Text Adventure (1.5 h)  
4. Learn Structs by Building a Student Manager (1.5 h)  
5. Learn Enums by Building a Traffic Light Simulator (1 h)  

**Small (1–3 h, 8–15 steps)**  
6. Learn Error Handling by Building a File Processor (4 h)  
7. Learn Collections by Building a Contact Manager (3 h)  
8. Learn Iterators by Building a Word Counter (2 h)  
9. Learn Borrowing by Building a Text Editor (3 h)  
10. Learn Lifetimes by Building a String Pool (2 h)  
11. Learn File I/O by Building a Note-Taking App (4 h)  
12. Learn CLI Arguments by Building a Todo List (3 h)  

**Medium (3–6 h, 12–20 steps)**  
13. Learn Regex by Building a Log Parser (5 h)  
14. Learn Serialization by Building a Config Manager (4 h)  
15. Learn Error Types by Building a Database Client (5 h)  
16. Learn Modules by Building a CLI Framework (6 h)  
17. Learn Testing by Building a Test Suite (4 h)  
18. Learn Documentation by Building a Library (3 h)  

### Certification projects (5, ~20–30 h)

1. Build a Word Frequency Counter Project (6 h)  
2. Build a Log File Analyzer Project (6 h)  
3. Build a Configuration File Parser Project (6 h)  
4. Build a File Backup Tool Project (6 h)  
5. Build a CLI Task Manager Project (6 h)  

## Sections 2–5 (summary)

- **Section 2:** Data structures & systems programming (90–110 h)  
- **Section 3:** Web & async (70–90 h)  
- **Section 4:** Advanced systems & performance (80–100 h)  
- **Section 5:** Specialization paths (30–60 h)  

Full breakdowns, learning objectives, and project lists: **docs/curriculum.md**.

## Implemented so far

The app currently serves **Section 1** content from TypeScript (`src/data/challenges/section1.ts`). Implemented projects include at least the Temperature Converter (practice) and the curriculum list; more are added as section1.ts is updated.
