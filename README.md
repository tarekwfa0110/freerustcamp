# FreeRustCamp

An interactive online learning platform for Rust programming, modeled after freeCodeCamp's proven educational methodology.

## Tech Stack

- **Bun** - Package manager and runtime (preferred over npm)
- **Vite** - Build tool and dev server
- **React 18** - UI framework
- **TypeScript** - Type safety
- **TanStack Router** - Routing
- **TanStack Query** - Data fetching and state management
- **TanStack Table** - Table components
- **Monaco Editor** - Code editor
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed (recommended)
- Rust toolchain installed (for running Rust code)

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

### Using npm (portable)

The project is portable and works with npm as well:

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Project Structure

```
freerustcamp/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities and helpers
│   ├── types/          # TypeScript type definitions
│   ├── data/           # Challenge and curriculum data
│   └── App.tsx         # Main app component
├── public/             # Static assets
├── CURRICULUM.md       # Complete curriculum plan
└── package.json        # Dependencies and scripts
```

## Development

The app runs on `http://localhost:5173` by default.

## License

MIT
