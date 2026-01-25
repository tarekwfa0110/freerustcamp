# FreeRustCamp UI Design Prompt for v0/Lovable

## Project Overview
Create a complete UI-only (no functionality) for **FreeRustCamp** - an interactive online learning platform for Rust programming, modeled after freeCodeCamp's educational methodology. The platform teaches Rust through hands-on challenges, practice projects, and certification projects.

## Design Theme: Rusty & Industrial
- **Color Palette**: 
  - Primary: Rust orange (#B7410E, #C95D1A, #D2691E)
  - Secondary: Dark metallic grays (#2C2C2C, #3A3A3A, #4A4A4A)
  - Accents: Weathered browns (#8B4513, #A0522D)
  - Background: Dark charcoal (#1A1A1A) or light cream (#F5F5DC) - choose one direction
  - Text: High contrast (white/cream on dark, dark on light)
  - Success: Rusty green (#6B8E23)
  - Error: Deep rust red (#8B0000)

- **Visual Style**: 
  - Industrial/mechanical aesthetic with subtle weathered textures
  - Clean, functional design (not cluttered)
  - Subtle metal/rust texture overlays on key elements
  - Sharp, geometric shapes with slight rounded corners
  - Use subtle shadows and depth to create hierarchy

- **Typography**: 
  - Headings: Bold, industrial font (consider fonts like "Orbitron", "Rajdhani", or "Exo 2")
  - Body: Clean, readable sans-serif (avoid generic fonts like Inter/Roboto)
  - Code: Monospace font for code editor and code snippets

## Required Pages/Screens

### 1. Landing/Home Page
- Hero section with platform name and tagline
- Brief overview of what FreeRustCamp offers
- Stats/numbers (e.g., "350+ hours of content", "5 sections", "200+ challenges")
- Call-to-action buttons (Start Learning, Browse Curriculum)
- Preview of curriculum sections

### 2. Dashboard/Progress Page
- Welcome message with user name (placeholder: "Learner")
- Progress overview cards:
  - Total progress percentage
  - Current section progress
  - Days active streak
  - Total time spent
  - Challenges completed
  - Projects completed
- Quick access to:
  - Continue current challenge/project
  - Recently viewed items
  - Upcoming challenges
- Visual progress indicators (progress bars, circular progress)

### 3. Curriculum Browser
- Left sidebar navigation with 5 main sections:
  1. Fundamentals & CLI Tools
  2. Data Structures & Systems Programming
  3. Concurrency, Async & Networking
  4. Web Development & APIs
  5. Advanced Topics & Capstone
- Each section expandable showing:
  - Micro-challenges (with difficulty badges, time estimates)
  - Practice projects
  - Certification projects
- Section progress indicators
- Filter/search capabilities (UI only)
- Challenge/project cards showing:
  - Title
  - Difficulty level (Beginner/Intermediate/Advanced)
  - Estimated time
  - Completion status (Not Started/In Progress/Completed)
  - Lock/unlock status

### 4. Challenge View (Micro-Challenge)
- Split layout:
  - Left side (60%): Code editor area
    - Monaco Editor interface (dark theme, rust-colored accents)
    - Line numbers visible
    - Syntax highlighting
    - Editor toolbar (Run, Submit, Reset, Format)
  - Right side (40%): Instructions panel
    - Challenge title and difficulty badge
    - Explanation text
    - Task description
    - Starter code preview (read-only)
    - Test cases list (with pass/fail indicators - visual only)
    - Hints section (collapsible)
- Top bar: Challenge navigation (Previous/Next), breadcrumbs
- Bottom bar: Test results panel (expandable)

### 5. Project View (Practice/Certification Project)
- Similar to Challenge View but with:
  - Project description
  - User stories/requirements list
  - Milestones checklist
  - More comprehensive test suite display
  - File structure/navigation (if multi-file)
  - Reference solution toggle (UI only, no actual solution)

### 6. Test Results Panel
- Test execution status (Running/Passed/Failed)
- List of tests with:
  - Test name
  - Status icon (✓ pass, ✗ fail, ⏳ running)
  - Error messages (if failed)
  - Execution time
- Summary statistics (X/Y tests passed)
- Retry/View Details buttons

### 7. Profile/Settings Page
- User profile information
- Display preferences (theme, editor settings)
- Progress statistics breakdown
- Certificates/achievements section
- Account settings

### 8. Certificates/Achievements Page
- Grid of earned certificates
- Achievement badges
- Progress toward next achievements
- Section completion certificates

## Component Requirements

### Navigation
- Top navigation bar with:
  - Logo/brand name
  - Main nav items (Home, Curriculum, Dashboard, Profile)
  - User avatar/menu dropdown
- Sidebar navigation (when in curriculum/challenges)
- Breadcrumbs for deep navigation

### Cards
- Challenge/Project cards with:
  - Hover effects
  - Status indicators
  - Difficulty badges
  - Time estimates
  - Lock/unlock icons

### Buttons
- Primary: Rust orange with hover effects
- Secondary: Dark gray with rust accents
- Success: Rusty green
- Danger: Deep rust red
- All buttons should have clear hover/active states

### Progress Indicators
- Progress bars (rust-themed)
- Circular progress indicators
- Completion checkmarks
- Section progress visualization

### Code Editor UI
- Monaco Editor interface styling
- Dark theme with rust accents
- Toolbar buttons
- Line number styling
- Minimap (optional)

### Badges
- Difficulty badges (Beginner/Intermediate/Advanced)
- Completion badges
- Achievement badges
- Lock/unlock indicators

## Layout & Responsiveness
- Desktop-first design (primary focus)
- Responsive breakpoints for tablet/mobile
- Grid-based layouts for card displays
- Flexible sidebar that can collapse on smaller screens

## Interactive Elements (Visual Only)
- Hover states on all interactive elements
- Loading states (spinners, skeletons)
- Empty states (no challenges, no progress, etc.)
- Error states (visual error messages)
- Success animations (subtle, not distracting)

## Specific UI Details

### Challenge/Project Status Colors
- Not Started: Gray
- In Progress: Rust orange
- Completed: Rusty green
- Locked: Dark gray with lock icon

### Difficulty Badges
- Beginner: Light rust orange
- Intermediate: Medium rust orange
- Advanced: Deep rust red

### Section Progress
- Visual progress bars per section
- Percentage completion
- Challenge count (e.g., "15/60 completed")

## Technical Notes (for UI only)
- Use placeholder data throughout
- No actual functionality needed
- All buttons/links are visual only
- Code editor is just the Monaco UI, no actual code execution
- Tests show pass/fail states but are static/mock data
- Progress data is placeholder
- All navigation is visual (no routing needed)

## Design Principles
1. **Clean & Functional**: Every element serves a purpose, no clutter
2. **Rusty Theme**: Consistent rust/orange color scheme throughout
3. **Industrial Aesthetic**: Mechanical, weathered feel without being overwhelming
4. **Clear Hierarchy**: Important information stands out
5. **Accessible**: Good contrast, readable fonts, clear interactive elements
6. **Professional**: Looks like a production learning platform

## Deliverables
Create all pages listed above with:
- Complete layouts
- All UI components
- Consistent styling throughout
- Rusty/industrial theme applied
- Responsive design considerations
- Interactive states (hover, active, etc.)
- Placeholder content where needed

---

**Note**: This is UI-only. No backend integration, no actual code execution, no real data. Just beautiful, functional-looking interfaces that capture the FreeRustCamp learning experience with a distinctive rusty, industrial aesthetic.
