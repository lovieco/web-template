# Web Template

A modern, production-ready web application template built with React, Vite, TypeScript, and shadcn/ui. Features the complete TanStack suite (Router, Query, Table, Form, Virtual) for type-safe routing, data fetching, tables, forms, and virtualization. Includes Supabase for database and authentication, plus automated CI/CD deployment to Cloudflare Pages.

## Features

- ⚡ **Vite** - Lightning fast build tool
- ⚛️ **React 19** - Latest React with concurrent features
- 📘 **TypeScript** - Type-safe development
- 🎨 **shadcn/ui** - Beautiful, accessible UI components
- 🎯 **Tailwind CSS v4** - Utility-first CSS framework
- 🗄️ **Supabase** - PostgreSQL database with authentication
- 🧭 **TanStack Router** - Type-safe file-based routing
- 🔄 **TanStack Query** - Data fetching and caching
- 📋 **TanStack Table** - Headless table library
- 📝 **TanStack Form** - Type-safe form management
- 📜 **TanStack Virtual** - Virtualization for large lists
- 🐻 **Zustand** - Lightweight state management
- 🧪 **Vitest** - Fast unit testing framework
- 📝 **ESLint + Prettier** - Code quality and formatting
- 🚀 **GitHub Actions** - Automated CI/CD pipeline
- ☁️ **Cloudflare Pages** - Edge deployment

## Quick Start

### Prerequisites

- Node.js 22+
- pnpm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/web-template.git
cd web-template

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Configure your Supabase credentials in .env
# VITE_SUPABASE_URL=your-project-url
# VITE_SUPABASE_ANON_KEY=your-anon-key

# Start development server
pnpm dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint errors |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:run` | Run tests once |
| `pnpm test:coverage` | Run tests with coverage |
| `pnpm typecheck` | Run TypeScript type checking |

## Project Structure

```
web-template/
├── .github/
│   └── workflows/
│       ├── ci.yml          # CI workflow (lint, test, build)
│       ├── deploy.yml      # Production deployment
│       └── preview.yml     # PR preview deployment
├── src/
│   ├── components/
│   │   └── ui/             # shadcn/ui components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── services/           # API services
│   ├── store/              # Zustand stores
│   ├── test/               # Test utilities
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── components.json         # shadcn/ui configuration
├── eslint.config.js        # ESLint configuration
├── .prettierrc             # Prettier configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── vitest.config.ts        # Vitest configuration
```

## Adding shadcn/ui Components

This template is configured to work with shadcn/ui. To add new components:

```bash
# Using the shadcn CLI
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add input
```

Or manually copy components from [ui.shadcn.com](https://ui.shadcn.com/docs/components).

## State Management

This template uses Zustand for state management. Example store:

```typescript
// src/store/counter.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create<CounterState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
      }),
      { name: "counter-storage" }
    )
  )
);
```

## API Services

Use the built-in fetch wrapper for API calls:

```typescript
import { api } from "@/services/api";

// GET request
const users = await api.get<User[]>("/api/users");

// POST request
const newUser = await api.post<User>("/api/users", { name: "John" });

// With query parameters
const filtered = await api.get<User[]>("/api/users", {
  params: { role: "admin" },
});
```

## Testing

Write tests using Vitest and React Testing Library:

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
```

## Deployment

### Cloudflare Pages Setup

1. **Create Cloudflare API Token:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
   - Create a token with "Cloudflare Pages: Edit" permission

2. **Configure GitHub Secrets:**
   Add the following secrets to your GitHub repository:
   
   | Secret | Description |
   |--------|-------------|
   | `CLOUDFLARE_API_TOKEN` | Your Cloudflare API token |
   | `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |

3. **Configure GitHub Variables (Optional):**
   
   | Variable | Description | Default |
   |----------|-------------|---------|
   | `CLOUDFLARE_PROJECT_NAME` | Cloudflare Pages project name | `web-template` |
   | `VITE_API_BASE_URL` | API base URL for production | - |

### Deployment Workflows

- **Production:** Automatically deploys to Cloudflare Pages on push to `main`
- **Preview:** Creates preview deployments for pull requests
- **Manual:** Use workflow dispatch to deploy manually

## Environment Variables

Create a `.env` file for local development:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key

# API Configuration (optional)
VITE_API_BASE_URL=https://api.example.com
```

For production, configure variables in GitHub repository settings or Cloudflare Pages dashboard.

### Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Project Settings → API
3. Add them to your `.env` file
4. Create your database schema using the SQL Editor or Table Editor

## Customization

### Changing Theme

Edit the CSS variables in `src/index.css` to customize the theme:

```css
:root {
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* ... other variables */
}
```

### Path Aliases

The template uses `@/` as an alias for the `src/` directory. Configure in:
- `tsconfig.json` - TypeScript path mapping
- `vite.config.ts` - Vite resolve alias

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
