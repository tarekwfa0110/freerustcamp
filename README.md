# FreeRustCamp

An interactive online learning platform for Rust programming, modeled after freeCodeCamp's proven educational methodology.

## Tech Stack

- **Bun** - Package manager and runtime (required)
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

- [Bun](https://bun.sh) installed (required)
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

## Project Structure

```
freerustcamp/
+-- src/
¦   +-- routes/        # TanStack Router routes
¦   +-- components/    # React components
¦   +-- lib/           # Utilities and validators
¦   +-- types/         # TypeScript types
¦   +-- data/          # Challenge data
+-- public/            # Static assets
+-- docs/              # Documentation
+-- package.json       # Dependencies and scripts
```

## Development

The app runs on `http://localhost:5173` by default.

## Contributing

See `CONTRIBUTING.md`.

## License

MIT
