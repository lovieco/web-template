# Web Template - Modern React Application Boilerplate

**Project Type:** React Single Page Application (SPA) Template
**Primary Language:** TypeScript (strict mode enabled)
**Build Tool:** Vite 6.x
**Package Manager:** pnpm 10+
**Node Version:** 22+
**Deployment Target:** Cloudflare Pages (Edge Network)

## Project Overview

This is a production-ready web application template featuring a complete modern React stack with type-safe routing, data fetching, UI components, and automated deployment. The template is optimized for developer experience, type safety, and production performance.

**Key Architecture Decisions:**
- File-based routing using TanStack Router for type-safe navigation
- Supabase as backend-as-a-service (PostgreSQL + Auth + Storage)
- Component library from shadcn/ui (not npm package, copied into codebase)
- Zustand for lightweight client-side state management
- TanStack Query for server state management and caching
- Cloudflare Pages for edge deployment with zero-config CDN

## Technology Stack

### Core Framework & Build
- **React 19.x** (`react`, `react-dom`) - UI library with concurrent rendering features
- **Vite 6.x** (`vite`) - Build tool and dev server with HMR
- **TypeScript 5.x** (`typescript`) - Static type checking, configured with strict mode

### UI & Styling
- **shadcn/ui** - Radix UI-based components (source code in `src/components/ui/`)
- **Tailwind CSS v4** (`@tailwindcss/vite`) - Utility-first CSS, integrated via Vite plugin
- **Radix UI** (`@radix-ui/react-*`) - Accessible component primitives
- **Lucide React** (`lucide-react`) - Icon library

### Routing & Data Fetching
- **TanStack Router** (`@tanstack/react-router`) - Type-safe file-based routing with route generation
- **TanStack Query** (`@tanstack/react-query`) - Async state management, caching, and data synchronization
- **TanStack Table** (`@tanstack/react-table`) - Headless table logic for complex data grids
- **TanStack Form** (`@tanstack/react-form`) - Type-safe form state management
- **TanStack Virtual** (`@tanstack/react-virtual`) - Virtualizing large lists and grids

### Backend & Database
- **Supabase** (`@supabase/supabase-js`) - PostgreSQL database, authentication, row-level security
  - Configuration: `src/lib/supabase.ts`
  - Environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

### State Management
- **Zustand** (`zustand`) - Lightweight state management with middleware support
  - Store location: `src/store/`
  - Supports: devtools, persistence, immer

### Testing
- **Vitest** (`vitest`) - Unit testing framework (Vite-native, Jest compatible)
- **React Testing Library** (`@testing-library/react`) - Component testing utilities
- **jsdom** (`jsdom`) - DOM implementation for Node.js testing
- **Configuration:** `vitest.config.ts`

### Code Quality
- **ESLint 9.x** (`eslint`) - Linting with flat config format (`eslint.config.js`)
- **Prettier 3.x** (`prettier`) - Code formatting (`.prettierrc`)
- **TypeScript ESLint** (`typescript-eslint`) - TypeScript-specific linting rules

### CI/CD & Deployment
- **GitHub Actions** - Automated workflows in `.github/workflows/`
  - `ci.yml` - Lint, test, type-check, and build validation
  - `deploy.yml` - Production deployment to Cloudflare Pages
  - `preview.yml` - Preview deployments for pull requests
- **Wrangler** (`wrangler`) - Cloudflare Pages deployment CLI

## Architecture Overview

### Data Flow
1. **Client State**: Zustand stores (`src/store/`) manage UI state, user preferences, and ephemeral data
2. **Server State**: TanStack Query manages API data, caching, and synchronization with Supabase
3. **Routing**: TanStack Router provides type-safe navigation with file-based route generation
4. **UI Components**: shadcn/ui components in `src/components/ui/` provide accessible, styled primitives
5. **Backend**: Supabase handles database queries, authentication, and real-time subscriptions

### Key Patterns

**Route Organization (File-Based):**
```
src/routes/
├── __root.tsx          # Layout wrapper for all routes
├── index.tsx           # Maps to "/"
├── about.tsx           # Maps to "/about"
└── posts/
    ├── index.tsx       # Maps to "/posts"
    └── $postId.tsx     # Maps to "/posts/:postId" (dynamic segment)
```

**Component Structure:**
```typescript
// UI components are copied from shadcn/ui into src/components/ui/
import { Button } from "@/components/ui/button"

// Custom components go in src/components/
import { Header } from "@/components/Header"
```

**State Management Pattern:**
```typescript
// Global state: src/store/storeName.ts using Zustand
import { useCounterStore } from "@/store/counter"

// Server state: TanStack Query hooks
import { useQuery } from "@tanstack/react-query"

// Local state: React useState/useReducer
```

**Data Fetching Pattern:**
```typescript
// Use TanStack Query for server data
const { data, isLoading } = useQuery({
  queryKey: ['users', id],
  queryFn: () => api.get(`/users/${id}`)
})

// Supabase queries return promises compatible with TanStack Query
const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: async () => {
    const { data } = await supabase.from('todos').select('*')
    return data
  }
})
```

### Path Aliases
The project uses `@/` as an alias for `src/`:
```typescript
// These are equivalent:
import { Button } from "@/components/ui/button"
import { Button } from "../../components/ui/button"
```

**Configuration locations:**
- TypeScript: `tsconfig.json` → `compilerOptions.paths`
- Vite: `vite.config.ts` → `resolve.alias`

## Table of Contents

- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Common Development Tasks](#common-development-tasks)
  - [Adding shadcn/ui Components](#adding-shadcnui-components)
  - [Creating New Routes](#creating-new-routes)
  - [Creating Zustand Stores](#creating-zustand-stores)
  - [Working with APIs](#working-with-apis)
  - [Testing](#testing)
- [Cookbook - Common Recipes](#cookbook---common-recipes)
  - [Authentication Flow with Supabase](#authentication-flow-with-supabase)
  - [Data Table with Filtering & Pagination](#data-table-with-filtering--pagination)
  - [Forms with Validation](#forms-with-validation)
  - [Real-time Data with Supabase](#real-time-data-with-supabase)
  - [Infinite Scroll with TanStack Query](#infinite-scroll-with-tanstack-query)
  - [File Upload to Supabase Storage](#file-upload-to-supabase-storage)
  - [Toast Notifications System](#toast-notifications-system)
  - [Dark Mode Implementation](#dark-mode-implementation)
- [Advanced Patterns](#advanced-patterns)
  - [Custom Hooks](#custom-hooks)
  - [Error Boundaries](#error-boundaries)
  - [Suspense & Lazy Loading](#suspense--lazy-loading)
  - [Higher-Order Components (HOCs)](#higher-order-components-hocs)
  - [Compound Components Pattern](#compound-components-pattern)
  - [Optimistic Updates with TanStack Query](#optimistic-updates-with-tanstack-query)
  - [Custom Middleware Patterns](#custom-middleware-patterns)
  - [Type-Safe Event Emitter](#type-safe-event-emitter)
- [Integration Guides](#integration-guides)
  - [Stripe Payment Integration](#stripe-payment-integration)
  - [Analytics Integration (Posthog)](#analytics-integration-posthog)
  - [Error Tracking (Sentry)](#error-tracking-sentry)
  - [Email Service (Resend)](#email-service-resend)
  - [Search Integration (Algolia)](#search-integration-algolia)
  - [Image Optimization (Cloudinary)](#image-optimization-cloudinary)
  - [Feature Flags (LaunchDarkly)](#feature-flags-launchdarkly)
  - [Authentication Providers (Auth0)](#authentication-providers-auth0)
  - [Monitoring (Datadog RUM)](#monitoring-datadog-rum)
- [Deployment](#deployment)
  - [CI/CD Pipeline Overview](#cicd-pipeline-overview)
  - [Cloudflare Pages Setup](#cloudflare-pages-setup)
  - [Manual Deployment with Wrangler](#manual-deployment-with-wrangler)
- [Environment Configuration](#environment-configuration)
  - [Environment Variables](#environment-variables)
  - [Supabase Setup Guide](#supabase-setup-guide)
- [Customization](#customization)
  - [Theme Customization](#theme-customization)
  - [Adding Custom Tailwind Classes](#adding-custom-tailwind-classes)
  - [Path Aliases Configuration](#path-aliases-configuration)
- [Architecture Decisions](#architecture-decisions)
  - [Why TanStack Router over React Router](#why-tanstack-router-over-react-router)
  - [Why Supabase over Firebase/Custom Backend](#why-supabase-over-firebasecustom-backend)
  - [Why Zustand over Redux/Context](#why-zustand-over-reduxcontext)
  - [Why TanStack Query over SWR/Apollo](#why-tanstack-query-over-swrapollo)
  - [Why shadcn/ui over Component Libraries](#why-shadcnui-over-component-libraries)
  - [Why Vitest over Jest](#why-vitest-over-jest)
  - [Why Cloudflare Pages over Vercel/Netlify](#why-cloudflare-pages-over-vercelnetlify)
  - [When to Avoid This Stack](#when-to-avoid-this-stack)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)
  - [Project Organization](#project-organization)
  - [Performance Optimization](#performance-optimization)
  - [Security Best Practices](#security-best-practices)
- [Quick Reference](#quick-reference)
  - [Essential Commands](#essential-commands)
  - [Key File Locations](#key-file-locations)
  - [Import Patterns](#import-patterns)
  - [Common Code Patterns](#common-code-patterns)
- [Technology Documentation](#technology-documentation)
- [Contributing](#contributing)
- [License](#license)

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
│   └── workflows/                    # GitHub Actions CI/CD pipelines
│       ├── ci.yml                    # Runs on PRs: pnpm lint, test, typecheck, build
│       ├── deploy.yml                # Runs on push to main: deploys to Cloudflare Pages production
│       └── preview.yml               # Runs on PRs: creates preview deployment with unique URL
│
├── src/                              # Source code directory (TypeScript/TSX)
│   ├── components/                   # React components
│   │   └── ui/                       # shadcn/ui components (copied, not imported from npm)
│   │       ├── button.tsx            # Button component (Radix UI based)
│   │       ├── card.tsx              # Card layout component
│   │       └── ...                   # Other UI primitives (add via `pnpm dlx shadcn@latest add`)
│   │
│   ├── hooks/                        # Custom React hooks directory
│   │   └── (place custom hooks here)
│   │
│   ├── lib/                          # Shared utilities and configurations
│   │   ├── utils.ts                  # Helper functions (cn, clsx, tailwind-merge)
│   │   └── supabase.ts               # Supabase client initialization
│   │
│   ├── services/                     # API service layer
│   │   └── api.ts                    # Fetch wrapper with error handling
│   │
│   ├── store/                        # Zustand state stores
│   │   └── counter.ts                # Example store with devtools and persist middleware
│   │
│   ├── test/                         # Testing utilities
│   │   └── test-utils.tsx            # Custom render function with providers
│   │
│   ├── routes/                       # TanStack Router file-based routes
│   │   ├── __root.tsx                # Root route layout
│   │   └── index.tsx                 # Home page route (/)
│   │
│   ├── App.tsx                       # Main App component (router setup)
│   ├── main.tsx                      # Application entry point (ReactDOM.render)
│   ├── index.css                     # Global styles and Tailwind directives
│   └── routeTree.gen.ts              # Auto-generated by TanStack Router (do not edit)
│
├── public/                           # Static assets (served as-is)
│
├── components.json                   # shadcn/ui CLI configuration
├── eslint.config.js                  # ESLint 9 flat config format
├── .prettierrc                       # Prettier formatting rules
├── tsconfig.json                     # TypeScript compiler options (strict mode)
├── tsconfig.node.json                # TypeScript config for Node.js (Vite config files)
├── vite.config.ts                    # Vite build and dev server configuration
├── vitest.config.ts                  # Vitest testing framework configuration
├── tailwind.config.js                # Tailwind CSS v4 configuration
├── .env.example                      # Example environment variables template
├── .env                              # Local environment variables (git-ignored)
├── package.json                      # Dependencies and npm scripts
└── pnpm-lock.yaml                    # Lock file for pnpm package manager
```

### Key File Purposes

**Configuration Files:**
- `vite.config.ts` - Defines build settings, plugins (@tanstack/router-plugin, @tailwindcss/vite), path aliases (@/)
- `tsconfig.json` - TypeScript strict mode, path aliases, JSX transform
- `eslint.config.js` - ESLint rules using flat config with TypeScript support
- `components.json` - Tells shadcn/ui CLI where to place components (src/components/ui)

**Entry Points:**
- `src/main.tsx` - ReactDOM.createRoot and app initialization
- `src/App.tsx` - Router setup with TanStack Router
- `src/routes/__root.tsx` - Root layout wrapper for all routes
- `index.html` - HTML entry point that loads src/main.tsx

## Common Development Tasks

### Adding shadcn/ui Components

**Method 1: Using CLI (Recommended)**
```bash
# Add single component
pnpm dlx shadcn@latest add button

# Add multiple components
pnpm dlx shadcn@latest add card dialog input select

# Components are added to: src/components/ui/
```

**Method 2: Manual Copy**
1. Visit [ui.shadcn.com](https://ui.shadcn.com/docs/components)
2. Copy component code to `src/components/ui/[component-name].tsx`
3. Install any required Radix UI dependencies
4. Update imports in `src/components/ui/` if needed

**How it works:**
- shadcn/ui is NOT an npm package - components are copied into your codebase
- Each component is a self-contained file you can modify
- Components use Radix UI primitives for accessibility
- Styling uses Tailwind CSS with CSS variables for theming
- Configuration: `components.json` tells the CLI where to place files

### Creating New Routes

**File-based routing with TanStack Router:**

1. Create file in `src/routes/`:
```typescript
// src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return <div>About page</div>
}
```

2. Router automatically generates route types in `src/routeTree.gen.ts`
3. Navigate using type-safe Link component:
```typescript
import { Link } from '@tanstack/react-router'

<Link to="/about">About</Link>
```

**Dynamic routes:**
```typescript
// src/routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  component: Post,
})

function Post() {
  const { postId } = Route.useParams() // Type-safe params
  return <div>Post {postId}</div>
}
```

### Creating Zustand Stores

**Create a new store in `src/store/[storeName].ts`:**

```typescript
// src/store/user.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// 1. Define the state interface
interface UserState {
  // State properties
  user: User | null
  preferences: UserPreferences

  // Actions (functions that modify state)
  setUser: (user: User | null) => void
  updatePreferences: (prefs: Partial<UserPreferences>) => void
  logout: () => void
}

// 2. Create the store
export const useUserStore = create<UserState>()(
  devtools(                          // Redux DevTools integration
    persist(                         // Persist to localStorage
      (set, get) => ({
        // Initial state
        user: null,
        preferences: { theme: 'light', language: 'en' },

        // Actions
        setUser: (user) => set({ user }, false, 'setUser'),
        updatePreferences: (prefs) =>
          set(
            (state) => ({
              preferences: { ...state.preferences, ...prefs }
            }),
            false,
            'updatePreferences'
          ),
        logout: () => set({ user: null }, false, 'logout'),
      }),
      {
        name: 'user-storage',        // localStorage key
        partialize: (state) => ({    // Only persist these fields
          user: state.user,
          preferences: state.preferences,
        }),
      }
    )
  )
)

// 3. Use in components
function Profile() {
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)

  // Or select multiple properties
  const { user, preferences } = useUserStore()

  return <button onClick={logout}>Logout {user?.name}</button>
}
```

**Zustand middleware:**
- `devtools()` - Connect to Redux DevTools browser extension
- `persist()` - Save state to localStorage/sessionStorage
- `immer()` - Use immer for immutable state updates (install separately)

### Working with APIs

**The API service layer (`src/services/api.ts`):**

```typescript
import { api } from '@/services/api'

// GET request with type safety
const users = await api.get<User[]>('/api/users')

// POST with body
const newUser = await api.post<User>('/api/users', {
  name: 'John Doe',
  email: 'john@example.com',
})

// PUT/PATCH for updates
const updated = await api.put<User>(`/api/users/${id}`, updates)

// DELETE
await api.delete(`/api/users/${id}`)

// Query parameters
const filtered = await api.get<User[]>('/api/users', {
  params: { role: 'admin', active: true },
})
// Results in: /api/users?role=admin&active=true
```

**Integration with TanStack Query:**

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'

// Fetch data with caching
function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get<User[]>('/api/users'),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <ul>{data.map(user => <li key={user.id}>{user.name}</li>)}</ul>
}

// Mutations with optimistic updates
function CreateUser() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newUser: NewUser) => api.post<User>('/api/users', newUser),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return (
    <button onClick={() => mutation.mutate({ name: 'New User' })}>
      Create User
    </button>
  )
}
```

**Supabase Integration:**

```typescript
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

// Query Supabase with TanStack Query
function TodoList() {
  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
  })

  return <ul>{data?.map(todo => <li key={todo.id}>{todo.title}</li>)}</ul>
}

// Real-time subscriptions
useEffect(() => {
  const channel = supabase
    .channel('todos')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'todos'
    }, () => {
      // Refetch data on changes
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    })
    .subscribe()

  return () => { channel.unsubscribe() }
}, [])
```

## Cookbook - Common Recipes

This section provides production-ready code examples for common implementation patterns.

### Authentication Flow with Supabase

**Complete authentication implementation with protected routes:**

```typescript
// src/lib/auth.ts
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset`,
  })
  if (error) throw error
}

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}

// OAuth providers
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  if (error) throw error
  return data
}
```

**Auth store with Zustand:**

```typescript
// src/store/auth.ts
import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),

  initialize: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    set({ session, user: session?.user ?? null, loading: false })

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null })
    })
  },
}))
```

**Protected route component:**

```typescript
// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth'

export function ProtectedRoute() {
  const { user, loading } = useAuthStore()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}
```

**Login page:**

```typescript
// src/routes/login.tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { signIn, signInWithGoogle } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      navigate({ to: '/dashboard' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        {error && <p className="text-destructive">{error}</p>}

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" className="w-full">Sign In</Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
      </form>
    </div>
  )
}
```

### Data Table with Filtering & Pagination

**Complete TanStack Table implementation:**

```typescript
// src/components/DataTable.tsx
import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  })

  return (
    <div className="space-y-4">
      {/* Global search */}
      <Input
        placeholder="Search all columns..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />

      {/* Table */}
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 text-left">
                    {header.isPlaceholder ? null : (
                      <div
                        className="flex items-center gap-2 cursor-pointer select-none"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} row(s) total
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
```

**Column definitions with actions:**

```typescript
// src/routes/users.tsx
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'

type User = {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    cell: (info) => (
      <span className="capitalize">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: (info) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">Edit</Button>
        <Button size="sm" variant="destructive">Delete</Button>
      </div>
    ),
  }),
]

function UsersPage() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await supabase.from('users').select('*')
      return data as User[]
    },
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  )
}
```

### Forms with Validation

**TanStack Form with Zod validation:**

```typescript
// src/components/UserForm.tsx
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
})

type UserFormData = z.infer<typeof userSchema>

interface UserFormProps {
  initialData?: Partial<UserFormData>
  onSubmit: (data: UserFormData) => Promise<void>
}

export function UserForm({ initialData, onSubmit }: UserFormProps) {
  const form = useForm({
    defaultValues: {
      name: initialData?.name ?? '',
      email: initialData?.email ?? '',
      age: initialData?.age ?? 18,
      bio: initialData?.bio ?? '',
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value)
    },
    validatorAdapter: zodValidator(),
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="space-y-4"
    >
      <form.Field
        name="name"
        validators={{
          onChange: userSchema.shape.name,
        }}
      >
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Name</Label>
            <Input
              id={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors && (
              <p className="text-sm text-destructive">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="email"
        validators={{
          onChange: userSchema.shape.email,
        }}
      >
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Email</Label>
            <Input
              id={field.name}
              type="email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors && (
              <p className="text-sm text-destructive">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="age"
        validators={{
          onChange: userSchema.shape.age,
        }}
      >
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Age</Label>
            <Input
              id={field.name}
              type="number"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(parseInt(e.target.value))}
            />
            {field.state.meta.errors && (
              <p className="text-sm text-destructive">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
```

### Real-time Data with Supabase

**Real-time subscription with TanStack Query:**

```typescript
// src/hooks/useRealtimeTodos.ts
import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

type Todo = {
  id: string
  title: string
  completed: boolean
  user_id: string
  created_at: string
}

export function useRealtimeTodos(userId: string) {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['todos', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as Todo[]
    },
  })

  useEffect(() => {
    const channel = supabase
      .channel(`todos:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'todos',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            queryClient.setQueryData<Todo[]>(['todos', userId], (old = []) => [
              payload.new as Todo,
              ...old,
            ])
          } else if (payload.eventType === 'UPDATE') {
            queryClient.setQueryData<Todo[]>(['todos', userId], (old = []) =>
              old.map((todo) =>
                todo.id === payload.new.id ? (payload.new as Todo) : todo
              )
            )
          } else if (payload.eventType === 'DELETE') {
            queryClient.setQueryData<Todo[]>(['todos', userId], (old = []) =>
              old.filter((todo) => todo.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [userId, queryClient])

  return { data, isLoading }
}
```

### Infinite Scroll with TanStack Query

**Infinite query implementation:**

```typescript
// src/routes/feed.tsx
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Post = {
  id: string
  title: string
  content: string
  created_at: string
}

const POSTS_PER_PAGE = 20

function FeedPage() {
  const { ref, inView } = useInView()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 0 }) => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .range(pageParam, pageParam + POSTS_PER_PAGE - 1)

      if (error) throw error
      return data as Post[]
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < POSTS_PER_PAGE) return undefined
      return allPages.length * POSTS_PER_PAGE
    },
    initialPageParam: 0,
  })

  // Automatically fetch more when scrolling to bottom
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Feed</h1>

      <div className="space-y-4">
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.map((post) => (
              <div key={post.id} className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-muted-foreground">{post.content}</p>
                <time className="text-sm text-muted-foreground">
                  {new Date(post.created_at).toLocaleDateString()}
                </time>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Loading indicator / trigger element */}
      <div ref={ref} className="py-4 text-center">
        {isFetchingNextPage ? (
          <p>Loading more...</p>
        ) : hasNextPage ? (
          <p className="text-muted-foreground">Scroll for more</p>
        ) : (
          <p className="text-muted-foreground">No more posts</p>
        )}
      </div>
    </div>
  )
}
```

### File Upload to Supabase Storage

**File upload component with progress:**

```typescript
// src/components/FileUpload.tsx
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface FileUploadProps {
  bucket: string
  path?: string
  onUploadComplete?: (url: string) => void
  accept?: string
  maxSizeMB?: number
}

export function FileUpload({
  bucket,
  path = '',
  onUploadComplete,
  accept = 'image/*',
  maxSizeMB = 5,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`)
      return
    }

    // Show preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }

    setError(null)
    setUploading(true)
    setProgress(0)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = path ? `${path}/${fileName}` : fileName

      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100
            setProgress(percent)
          },
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)

      onUploadComplete?.(publicUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold"
      />

      {preview && (
        <img src={preview} alt="Preview" className="max-w-xs rounded-lg" />
      )}

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground">
            Uploading... {Math.round(progress)}%
          </p>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
```

### Toast Notifications System

**Toast store with Zustand:**

```typescript
// src/store/toast.ts
import { create } from 'zustand'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastState {
  toasts: Toast[]
  addToast: (message: string, type: ToastType, duration?: number) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  addToast: (message, type, duration = 3000) => {
    const id = Math.random().toString(36).substring(2)

    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }],
    }))

    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }))
      }, duration)
    }
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))

// Helper functions
export const toast = {
  success: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, 'success', duration),
  error: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, 'error', duration),
  warning: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, 'warning', duration),
  info: (message: string, duration?: number) =>
    useToastStore.getState().addToast(message, 'info', duration),
}
```

**Toast component:**

```typescript
// src/components/Toast.tsx
import { useToastStore } from '@/store/toast'
import { cn } from '@/lib/utils'

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'min-w-[300px] rounded-lg p-4 shadow-lg animate-in slide-in-from-right',
            {
              'bg-green-500 text-white': toast.type === 'success',
              'bg-red-500 text-white': toast.type === 'error',
              'bg-yellow-500 text-white': toast.type === 'warning',
              'bg-blue-500 text-white': toast.type === 'info',
            }
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <p>{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white hover:opacity-80"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// Usage in App.tsx
import { ToastContainer } from '@/components/Toast'

function App() {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  )
}

// Usage in components
import { toast } from '@/store/toast'

function MyComponent() {
  const handleSave = async () => {
    try {
      await saveData()
      toast.success('Data saved successfully!')
    } catch (error) {
      toast.error('Failed to save data')
    }
  }
}
```

### Dark Mode Implementation

**Theme store with system preference detection:**

```typescript
// src/store/theme.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
  updateResolvedTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: 'light',

      setTheme: (theme) => {
        set({ theme })
        get().updateResolvedTheme()
      },

      updateResolvedTheme: () => {
        const { theme } = get()
        let resolved: 'light' | 'dark'

        if (theme === 'system') {
          resolved = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
        } else {
          resolved = theme
        }

        set({ resolvedTheme: resolved })

        // Update DOM
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(resolved)
      },
    }),
    {
      name: 'theme-storage',
    }
  )
)

// Initialize on app start
if (typeof window !== 'undefined') {
  useThemeStore.getState().updateResolvedTheme()

  // Listen for system theme changes
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      if (useThemeStore.getState().theme === 'system') {
        useThemeStore.getState().updateResolvedTheme()
      }
    })
}
```

**Theme toggle component:**

```typescript
// src/components/ThemeToggle.tsx
import { useThemeStore } from '@/store/theme'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, Sun, Monitor } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

**Dark mode CSS in `src/index.css`:**

```css
@theme {
  /* Light mode colors (default) */
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.205 0 0);

  /* Dark mode colors */
  .dark {
    --color-background: oklch(0.15 0 0);
    --color-foreground: oklch(0.985 0 0);
  }
}
```

### Testing

**Test file location:** Place tests next to source files with `.test.tsx` or `.test.ts` extension

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx        # Test file
```

**Component testing with React Testing Library:**

```typescript
// src/components/UserProfile.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@/test/test-utils'
import { UserProfile } from './UserProfile'

describe('UserProfile', () => {
  it('renders user information', () => {
    render(<UserProfile user={{ name: 'John', email: 'john@example.com' }} />)

    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('handles button clicks', async () => {
    const handleClick = vi.fn()
    render(<UserProfile onEditClick={handleClick} />)

    const button = screen.getByRole('button', { name: /edit/i })
    button.click()

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading state', () => {
    render(<UserProfile isLoading={true} />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })
})
```

**Testing with TanStack Query:**

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'

// Create test wrapper
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },  // Don't retry in tests
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

// Test custom hook with TanStack Query
it('fetches user data', async () => {
  const { result } = renderHook(() => useUser('123'), {
    wrapper: createWrapper(),
  })

  expect(result.current.isLoading).toBe(true)

  await waitFor(() => expect(result.current.isSuccess).toBe(true))

  expect(result.current.data).toEqual({ id: '123', name: 'John' })
})
```

**Testing Zustand stores:**

```typescript
import { renderHook, act } from '@testing-library/react'
import { useCounterStore } from '@/store/counter'

describe('Counter Store', () => {
  beforeEach(() => {
    // Reset store before each test
    useCounterStore.setState({ count: 0 })
  })

  it('increments count', () => {
    const { result } = renderHook(() => useCounterStore())

    expect(result.current.count).toBe(0)

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
```

**Run tests:**
```bash
pnpm test              # Watch mode (re-runs on file changes)
pnpm test:run          # Run once
pnpm test:coverage     # Generate coverage report in coverage/
```

## Advanced Patterns

This section covers sophisticated React patterns and techniques for building robust applications.

### Custom Hooks

**useDebounce - Delay rapid value changes:**

```typescript
// src/hooks/useDebounce.ts
import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Usage: Search input
function SearchInput() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const { data } = useQuery({
    queryKey: ['search', debouncedSearch],
    queryFn: () => api.get(`/search?q=${debouncedSearch}`),
    enabled: debouncedSearch.length > 0,
  })

  return <Input value={search} onChange={(e) => setSearch(e.target.value)} />
}
```

**useLocalStorage - Sync state with localStorage:**

```typescript
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

// Usage
function Settings() {
  const [notifications, setNotifications] = useLocalStorage('notifications', true)
  return (
    <input
      type="checkbox"
      checked={notifications}
      onChange={(e) => setNotifications(e.target.checked)}
    />
  )
}
```

**useMediaQuery - Responsive breakpoint detection:**

```typescript
// src/hooks/useMediaQuery.ts
import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

// Usage
function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <div>
      {isMobile && <MobileMenu />}
      {isDesktop && <DesktopMenu />}
    </div>
  )
}
```

**useIntersectionObserver - Visibility detection:**

```typescript
// src/hooks/useIntersectionObserver.ts
import { useEffect, useRef, useState } from 'react'

interface Options extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver(
  options: Options = {}
): [React.RefObject<HTMLDivElement>, boolean] {
  const { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false } = options

  const ref = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (freezeOnceVisible && isIntersecting) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, root, rootMargin, freezeOnceVisible, isIntersecting])

  return [ref, isIntersecting]
}

// Usage: Lazy load images
function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [ref, isVisible] = useIntersectionObserver({
    freezeOnceVisible: true,
  })

  return (
    <div ref={ref}>
      {isVisible ? <img src={src} alt={alt} /> : <div className="h-48 bg-gray-200" />}
    </div>
  )
}
```

### Error Boundaries

**React Error Boundary component:**

```typescript
// src/components/ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-destructive">
                Something went wrong
              </h1>
              <p className="text-muted-foreground mt-2">
                {this.state.error?.message}
              </p>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
              >
                Try again
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}

// Usage in App.tsx
function App() {
  return (
    <ErrorBoundary onError={(error) => console.error('App error:', error)}>
      <Router />
    </ErrorBoundary>
  )
}
```

**Using react-error-boundary library:**

```typescript
// Install: pnpm add react-error-boundary
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
      onError={(error) => {
        // Log to error reporting service
        console.error('Error:', error)
      }}
    >
      <Router />
    </ErrorBoundary>
  )
}

// Manually trigger error boundary
function MyComponent() {
  const handleError = useErrorHandler()

  const fetchData = async () => {
    try {
      await api.get('/data')
    } catch (error) {
      handleError(error)
    }
  }
}
```

### Suspense & Lazy Loading

**Route-based code splitting:**

```typescript
// src/App.tsx
import { lazy, Suspense } from 'react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// Lazy load heavy components
const Dashboard = lazy(() => import('./routes/dashboard'))
const Settings = lazy(() => import('./routes/settings'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}
```

**Component-level lazy loading with fallback:**

```typescript
// src/routes/dashboard.tsx
import { lazy, Suspense } from 'react'

const ExpensiveChart = lazy(() => import('@/components/ExpensiveChart'))

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <Suspense fallback={<div>Loading chart...</div>}>
        <ExpensiveChart data={data} />
      </Suspense>
    </div>
  )
}
```

### Higher-Order Components (HOCs)

**Authentication HOC:**

```typescript
// src/hocs/withAuth.tsx
import { ComponentType } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth'

export function withAuth<P extends object>(Component: ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useAuthStore()
    const navigate = useNavigate()

    if (loading) {
      return <div>Loading...</div>
    }

    if (!user) {
      navigate({ to: '/login' })
      return null
    }

    return <Component {...props} />
  }
}

// Usage
const ProtectedDashboard = withAuth(Dashboard)
```

**Logging HOC:**

```typescript
// src/hocs/withLogging.tsx
import { ComponentType, useEffect } from 'react'

export function withLogging<P extends object>(
  Component: ComponentType<P>,
  componentName: string
) {
  return function LoggedComponent(props: P) {
    useEffect(() => {
      console.log(`${componentName} mounted`)
      return () => console.log(`${componentName} unmounted`)
    }, [])

    useEffect(() => {
      console.log(`${componentName} props:`, props)
    }, [props])

    return <Component {...props} />
  }
}

// Usage
const LoggedButton = withLogging(Button, 'Button')
```

### Compound Components Pattern

**Type-safe compound components:**

```typescript
// src/components/Accordion.tsx
import { createContext, useContext, useState, ReactNode } from 'react'

interface AccordionContextValue {
  openItem: string | null
  toggleItem: (value: string) => void
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined)

function useAccordionContext() {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be used within Accordion')
  }
  return context
}

interface AccordionProps {
  children: ReactNode
  defaultOpen?: string
}

export function Accordion({ children, defaultOpen }: AccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(defaultOpen || null)

  const toggleItem = (value: string) => {
    setOpenItem(openItem === value ? null : value)
  }

  return (
    <AccordionContext.Provider value={{ openItem, toggleItem }}>
      <div className="space-y-2">{children}</div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  value: string
  children: ReactNode
}

Accordion.Item = function AccordionItem({ value, children }: AccordionItemProps) {
  return <div className="border rounded-lg">{children}</div>
}

interface AccordionTriggerProps {
  value: string
  children: ReactNode
}

Accordion.Trigger = function AccordionTrigger({ value, children }: AccordionTriggerProps) {
  const { openItem, toggleItem } = useAccordionContext()
  const isOpen = openItem === value

  return (
    <button
      onClick={() => toggleItem(value)}
      className="w-full px-4 py-2 text-left font-medium"
    >
      {children}
      <span className="float-right">{isOpen ? '−' : '+'}</span>
    </button>
  )
}

interface AccordionContentProps {
  value: string
  children: ReactNode
}

Accordion.Content = function AccordionContent({ value, children }: AccordionContentProps) {
  const { openItem } = useAccordionContext()
  const isOpen = openItem === value

  if (!isOpen) return null

  return <div className="px-4 py-2">{children}</div>
}

// Usage
function FAQ() {
  return (
    <Accordion defaultOpen="item1">
      <Accordion.Item value="item1">
        <Accordion.Trigger value="item1">What is React?</Accordion.Trigger>
        <Accordion.Content value="item1">
          React is a JavaScript library for building user interfaces.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="item2">
        <Accordion.Trigger value="item2">What is TypeScript?</Accordion.Trigger>
        <Accordion.Content value="item2">
          TypeScript is a typed superset of JavaScript.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  )
}
```

### Optimistic Updates with TanStack Query

**Optimistic UI updates with rollback:**

```typescript
// src/hooks/useTodoMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { toast } from '@/store/toast'

type Todo = {
  id: string
  title: string
  completed: boolean
}

export function useTodoMutations(userId: string) {
  const queryClient = useQueryClient()

  const toggleTodo = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const { data, error } = await supabase
        .from('todos')
        .update({ completed })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Todo
    },

    onMutate: async ({ id, completed }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos', userId] })

      // Snapshot previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos', userId])

      // Optimistically update
      queryClient.setQueryData<Todo[]>(['todos', userId], (old = []) =>
        old.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
      )

      // Return context with snapshot
      return { previousTodos }
    },

    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos', userId], context.previousTodos)
      }
      toast.error('Failed to update todo')
    },

    onSuccess: () => {
      toast.success('Todo updated')
    },

    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['todos', userId] })
    },
  })

  return { toggleTodo }
}

// Usage
function TodoItem({ todo }: { todo: Todo }) {
  const { toggleTodo } = useTodoMutations(todo.user_id)

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) =>
          toggleTodo.mutate({ id: todo.id, completed: e.target.checked })
        }
      />
      <span>{todo.title}</span>
    </div>
  )
}
```

### Custom Middleware Patterns

**Zustand logging middleware:**

```typescript
// src/store/middleware/logger.ts
import { StateCreator, StoreMutatorIdentifier } from 'zustand'

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>

export const logger: Logger = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...args) => {
    console.log(`[${name}] before:`, get())
    set(...args)
    console.log(`[${name}] after:`, get())
  }

  return f(loggedSet, get, store)
}

// Usage
import { create } from 'zustand'
import { logger } from './middleware/logger'

const useStore = create<State>()(
  logger(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    'CounterStore'
  )
)
```

**API auth header middleware:**

```typescript
// src/services/api.ts
import { getSession } from '@/lib/auth'

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Auth middleware: Add token to headers
    const session = await getSession()
    const headers = {
      'Content-Type': 'application/json',
      ...(session?.access_token && {
        Authorization: `Bearer ${session.access_token}`,
      }),
      ...options.headers,
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  }

  async get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const api = new ApiClient(import.meta.env.VITE_API_BASE_URL)
```

### Type-Safe Event Emitter

**Custom event system with TypeScript:**

```typescript
// src/lib/eventEmitter.ts
type EventMap = Record<string, any>

type EventKey<T extends EventMap> = string & keyof T
type EventHandler<T> = (payload: T) => void

export class TypedEventEmitter<T extends EventMap> {
  private events = new Map<keyof T, Set<EventHandler<any>>>()

  on<K extends EventKey<T>>(event: K, handler: EventHandler<T[K]>) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set())
    }
    this.events.get(event)!.add(handler)

    return () => this.off(event, handler)
  }

  off<K extends EventKey<T>>(event: K, handler: EventHandler<T[K]>) {
    this.events.get(event)?.delete(handler)
  }

  emit<K extends EventKey<T>>(event: K, payload: T[K]) {
    this.events.get(event)?.forEach((handler) => handler(payload))
  }

  once<K extends EventKey<T>>(event: K, handler: EventHandler<T[K]>) {
    const wrappedHandler = (payload: T[K]) => {
      handler(payload)
      this.off(event, wrappedHandler)
    }
    return this.on(event, wrappedHandler)
  }
}

// Define your events
interface AppEvents {
  'user:login': { userId: string; email: string }
  'user:logout': { userId: string }
  'notification:new': { message: string; type: 'info' | 'success' | 'error' }
}

// Create typed emitter
export const appEvents = new TypedEventEmitter<AppEvents>()

// Usage
appEvents.on('user:login', ({ userId, email }) => {
  console.log(`User ${email} logged in`)
})

appEvents.emit('user:login', {
  userId: '123',
  email: 'user@example.com',
})

// React hook
import { useEffect } from 'react'

function useAppEvent<K extends EventKey<AppEvents>>(
  event: K,
  handler: EventHandler<AppEvents[K]>
) {
  useEffect(() => {
    return appEvents.on(event, handler)
  }, [event, handler])
}

// Component usage
function NotificationListener() {
  useAppEvent('notification:new', ({ message, type }) => {
    toast[type](message)
  })

  return null
}
```

## Integration Guides

Step-by-step guides for integrating popular third-party services.

### Stripe Payment Integration

**Setup and initialization:**

```bash
pnpm add @stripe/stripe-js @stripe/react-stripe-js
```

```typescript
// src/lib/stripe.ts
import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
```

**Payment form component:**

```typescript
// src/components/CheckoutForm.tsx
import { useState } from 'react'
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'

export function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
    })

    if (error) {
      setError(error.message || 'Payment failed')
    }

    setProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-destructive">{error}</p>}
      <Button type="submit" disabled={!stripe || processing}>
        {processing ? 'Processing...' : 'Pay now'}
      </Button>
    </form>
  )
}
```

**Supabase Edge Function for webhooks:**

```typescript
// supabase/functions/stripe-webhook/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@14.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
})

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')!
  const body = await req.text()

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!
    )

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object
      // Update database with successful payment
      console.log('Payment succeeded:', paymentIntent.id)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(err.message, { status: 400 })
  }
})
```

### Analytics Integration (Posthog)

**Setup:**

```bash
pnpm add posthog-js
```

```typescript
// src/lib/analytics.ts
import posthog from 'posthog-js'

export function initAnalytics() {
  if (typeof window !== 'undefined') {
    posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
      api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
      loaded: (posthog) => {
        if (import.meta.env.DEV) posthog.debug()
      },
    })
  }
}

// Initialize in src/main.tsx
import { initAnalytics } from '@/lib/analytics'

initAnalytics()
```

**Event tracking:**

```typescript
// src/lib/analytics.ts
import posthog from 'posthog-js'

export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    posthog.capture(event, properties)
  },

  identify: (userId: string, properties?: Record<string, any>) => {
    posthog.identify(userId, properties)
  },

  reset: () => {
    posthog.reset()
  },

  page: () => {
    posthog.capture('$pageview')
  },
}

// Usage in components
import { analytics } from '@/lib/analytics'

function ProductPage({ product }: { product: Product }) {
  useEffect(() => {
    analytics.track('Product Viewed', {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
    })
  }, [product])

  const handlePurchase = () => {
    analytics.track('Product Purchased', {
      product_id: product.id,
      price: product.price,
    })
  }
}
```

### Error Tracking (Sentry)

**Setup:**

```bash
pnpm add @sentry/react
```

```typescript
// src/lib/sentry.ts
import * as Sentry from '@sentry/react'

export function initSentry() {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: import.meta.env.MODE,
  })
}

// Initialize in src/main.tsx
import { initSentry } from '@/lib/sentry'

initSentry()
```

**Error boundary integration:**

```typescript
// src/App.tsx
import * as Sentry from '@sentry/react'

function App() {
  return (
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
      <Router />
    </Sentry.ErrorBoundary>
  )
}

// Manual error capture
import * as Sentry from '@sentry/react'

try {
  await riskyOperation()
} catch (error) {
  Sentry.captureException(error, {
    contexts: {
      user: { id: user.id, email: user.email },
    },
    tags: {
      section: 'checkout',
    },
  })
}
```

**Source maps upload in CI:**

```yaml
# .github/workflows/deploy.yml
- name: Upload source maps to Sentry
  run: |
    pnpm dlx @sentry/cli releases new ${{ github.sha }}
    pnpm dlx @sentry/cli releases files ${{ github.sha }} upload-sourcemaps ./dist
    pnpm dlx @sentry/cli releases finalize ${{ github.sha }}
  env:
    SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
    SENTRY_ORG: your-org
    SENTRY_PROJECT: your-project
```

### Email Service (Resend)

**Supabase Edge Function for sending emails:**

```bash
pnpm add resend
```

```typescript
// supabase/functions/send-email/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'npm:resend@2.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

serve(async (req) => {
  const { to, subject, html } = await req.json()

  try {
    const data = await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to,
      subject,
      html,
    })

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
```

**Call from client:**

```typescript
// src/lib/email.ts
import { supabase } from '@/lib/supabase'

export async function sendEmail(to: string, subject: string, html: string) {
  const { data, error } = await supabase.functions.invoke('send-email', {
    body: { to, subject, html },
  })

  if (error) throw error
  return data
}

// Usage
await sendEmail(
  user.email,
  'Welcome to our app!',
  '<h1>Welcome!</h1><p>Thanks for signing up.</p>'
)
```

### Search Integration (Algolia)

**Setup:**

```bash
pnpm add algoliasearch react-instantsearch
```

```typescript
// src/lib/algolia.ts
import algoliasearch from 'algoliasearch/lite'

export const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_KEY
)
```

**Search component:**

```typescript
// src/components/Search.tsx
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch'
import { searchClient } from '@/lib/algolia'

function Hit({ hit }: { hit: any }) {
  return (
    <article>
      <h3>
        <Highlight attribute="title" hit={hit} />
      </h3>
      <p>
        <Highlight attribute="description" hit={hit} />
      </p>
    </article>
  )
}

export function Search() {
  return (
    <InstantSearch searchClient={searchClient} indexName="products">
      <SearchBox placeholder="Search products..." />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  )
}
```

### Image Optimization (Cloudinary)

**Setup:**

```bash
pnpm add cloudinary
```

```typescript
// src/lib/cloudinary.ts
import { Cloudinary } from '@cloudinary/url-gen'

export const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
})

export function getOptimizedImage(publicId: string, width: number) {
  return cld
    .image(publicId)
    .format('auto')
    .quality('auto')
    .resize(`w_${width}`)
    .toURL()
}
```

**Upload widget:**

```typescript
// src/components/CloudinaryUpload.tsx
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    cloudinary: any
  }
}

interface CloudinaryUploadProps {
  onUpload: (url: string) => void
}

export function CloudinaryUpload({ onUpload }: CloudinaryUploadProps) {
  const widgetRef = useRef<any>()

  useEffect(() => {
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          onUpload(result.info.secure_url)
        }
      }
    )
  }, [onUpload])

  return (
    <button onClick={() => widgetRef.current.open()}>
      Upload Image
    </button>
  )
}
```

### Feature Flags (LaunchDarkly)

**Setup:**

```bash
pnpm add launchdarkly-react-client-sdk
```

```typescript
// src/App.tsx
import { withLDProvider } from 'launchdarkly-react-client-sdk'

function App() {
  return <Router />
}

export default withLDProvider({
  clientSideID: import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID,
  user: {
    key: 'anonymous',
    anonymous: true,
  },
})(App)
```

**Use feature flags:**

```typescript
// src/components/NewFeature.tsx
import { useFlags } from 'launchdarkly-react-client-sdk'

export function NewFeature() {
  const { newFeatureEnabled } = useFlags()

  if (!newFeatureEnabled) {
    return <OldFeature />
  }

  return <div>New feature is enabled!</div>
}
```

### Authentication Providers (Auth0)

**Setup:**

```bash
pnpm add @auth0/auth0-react
```

```typescript
// src/main.tsx
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
)
```

**Use auth:**

```typescript
// src/components/LoginButton.tsx
import { useAuth0 } from '@auth0/auth0-react'

export function LoginButton() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <div>Loading...</div>

  if (isAuthenticated) {
    return (
      <div>
        <span>Welcome, {user?.name}</span>
        <button onClick={() => logout()}>Logout</button>
      </div>
    )
  }

  return <button onClick={() => loginWithRedirect()}>Login</button>
}
```

### Monitoring (Datadog RUM)

**Setup:**

```bash
pnpm add @datadog/browser-rum
```

```typescript
// src/lib/datadog.ts
import { datadogRum } from '@datadog/browser-rum'

export function initDatadog() {
  datadogRum.init({
    applicationId: import.meta.env.VITE_DATADOG_APP_ID,
    clientToken: import.meta.env.VITE_DATADOG_CLIENT_TOKEN,
    site: 'datadoghq.com',
    service: 'web-template',
    env: import.meta.env.MODE,
    version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
  })

  datadogRum.startSessionReplayRecording()
}

// Initialize in src/main.tsx
import { initDatadog } from '@/lib/datadog'

if (import.meta.env.PROD) {
  initDatadog()
}
```

**Custom metrics:**

```typescript
// src/lib/datadog.ts
import { datadogRum } from '@datadog/browser-rum'

export const metrics = {
  track: (name: string, value?: number, tags?: Record<string, string>) => {
    datadogRum.addAction(name, { value, ...tags })
  },

  timing: (name: string, duration: number) => {
    datadogRum.addTiming(name, duration)
  },

  error: (error: Error, context?: Record<string, any>) => {
    datadogRum.addError(error, context)
  },
}

// Usage
metrics.track('checkout_completed', 1, { payment_method: 'card' })
metrics.timing('api_response', 250)
```

## Deployment

### CI/CD Pipeline Overview

This template includes three GitHub Actions workflows:

1. **CI Workflow** (`.github/workflows/ci.yml`)
   - Triggers: Pull requests, pushes to main
   - Steps: Install deps → Lint → Type-check → Test → Build
   - Purpose: Validate code quality before merging

2. **Production Deployment** (`.github/workflows/deploy.yml`)
   - Triggers: Push to `main` branch
   - Steps: Build → Deploy to Cloudflare Pages (production)
   - URL: Your production domain

3. **Preview Deployment** (`.github/workflows/preview.yml`)
   - Triggers: Pull requests
   - Steps: Build → Deploy to Cloudflare Pages (preview)
   - URL: Unique preview URL per PR

### Cloudflare Pages Setup

**Step 1: Get Cloudflare Account ID**
```bash
# Method 1: From Dashboard URL
# URL format: https://dash.cloudflare.com/[ACCOUNT_ID]/pages
# Your account ID is the alphanumeric string in the URL

# Method 2: Using Wrangler CLI
pnpm dlx wrangler whoami
```

**Step 2: Create Cloudflare API Token**
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use "Edit Cloudflare Workers" template OR create custom token:
   - **Permissions:**
     - Account → Cloudflare Pages → Edit
   - **Account Resources:**
     - Include → Your Account
4. Copy the generated token (shown only once)

**Step 3: Configure GitHub Repository Secrets**

Go to your GitHub repo → Settings → Secrets and variables → Actions → New repository secret

**Required Secrets:**

| Secret Name | Value | Where to Find |
|------------|-------|---------------|
| `CLOUDFLARE_API_TOKEN` | API token from Step 2 | Cloudflare Dashboard → API Tokens |
| `CLOUDFLARE_ACCOUNT_ID` | Your account ID | From URL or `wrangler whoami` |

**Step 4: Configure GitHub Variables (Optional)**

Go to GitHub repo → Settings → Secrets and variables → Actions → Variables tab

| Variable Name | Description | Default Value |
|--------------|-------------|---------------|
| `CLOUDFLARE_PROJECT_NAME` | Pages project name | `web-template` |
| `VITE_SUPABASE_URL` | Production Supabase URL | (set if different from dev) |
| `VITE_SUPABASE_ANON_KEY` | Production Supabase key | (set if different from dev) |
| `VITE_API_BASE_URL` | Production API URL | - |

**Step 5: First Deployment**

```bash
# Push to main branch to trigger production deployment
git add .
git commit -m "Initial deployment"
git push origin main

# Or create a PR to trigger preview deployment
git checkout -b feature/my-feature
git push origin feature/my-feature
# Open PR on GitHub
```

**Step 6: View Deployments**

- **Production:** Check GitHub Actions tab for deploy.yml workflow
- **Preview:** PR will show deployment status and preview URL
- **Cloudflare Dashboard:** Visit Cloudflare Pages to see all deployments

### Manual Deployment with Wrangler

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy to Cloudflare Pages
pnpm build
pnpm dlx wrangler pages deploy dist --project-name=web-template

# Deploy with environment variables
pnpm dlx wrangler pages deploy dist \
  --project-name=web-template \
  --env=production \
  --var VITE_API_BASE_URL=https://api.example.com
```

### Deployment Build Configuration

**Cloudflare Pages automatically detects:**
- **Build command:** `pnpm build`
- **Build output directory:** `dist`
- **Node version:** From `.nvmrc` or `package.json#engines`

**Custom build settings** (if needed):
```toml
# wrangler.toml (optional)
name = "web-template"
compatibility_date = "2024-01-01"

[build]
command = "pnpm build"

[build.upload]
dir = "dist"
```

## Environment Configuration

### Environment Variables

**File: `.env` (local development, git-ignored)**

```env
# Supabase Configuration (Required)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# API Configuration (Optional)
VITE_API_BASE_URL=https://api.example.com
```

**IMPORTANT:**
- All environment variables exposed to the client must be prefixed with `VITE_`
- Create `.env` from `.env.example`: `cp .env.example .env`
- Never commit `.env` to git (it's in `.gitignore`)
- For production, set variables in Cloudflare Pages dashboard or GitHub secrets

**Access in code:**
```typescript
// Vite exposes env vars through import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const apiUrl = import.meta.env.VITE_API_BASE_URL

// TypeScript types for env vars
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_API_BASE_URL?: string
}
```

### Supabase Setup Guide

**1. Create Supabase Project**
- Visit [supabase.com](https://supabase.com) and create account
- Click "New Project"
- Choose organization, name, database password, region
- Wait for project to provision (2-3 minutes)

**2. Get API Credentials**
- Go to Project Settings → API
- Copy:
  - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
  - **anon public key** (safe to use in client-side code)
- Add to `.env` file

**3. Configure Authentication (Optional)**
- Go to Authentication → Providers
- Enable providers (Email, Google, GitHub, etc.)
- Configure redirect URLs:
  - Local: `http://localhost:5173/**`
  - Production: `https://yourdomain.com/**`

**4. Create Database Schema**

```sql
-- Example: Create a todos table
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own todos
CREATE POLICY "Users can view their own todos"
  ON todos FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own todos
CREATE POLICY "Users can create todos"
  ON todos FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

**5. Initialize Supabase Client**

The template includes a pre-configured client at `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

**6. Use in Components**

```typescript
import { supabase } from '@/lib/supabase'

// Query data
const { data, error } = await supabase
  .from('todos')
  .select('*')
  .eq('completed', false)

// Insert data
const { data, error } = await supabase
  .from('todos')
  .insert({ title: 'New todo', user_id: user.id })

// Authentication
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
})
```

## Customization

### Theme Customization

The template uses CSS variables for theming with Tailwind CSS v4. All theme tokens are defined in `src/index.css`:

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  /* Color tokens using OKLCH color space */
  --color-primary: oklch(0.205 0 0);                    /* Dark color for primary elements */
  --color-primary-foreground: oklch(0.985 0 0);         /* Light text on primary */

  --color-secondary: oklch(0.95 0 0);                   /* Secondary background */
  --color-secondary-foreground: oklch(0.205 0 0);       /* Text on secondary */

  --color-accent: oklch(0.95 0 0);                      /* Accent elements */
  --color-accent-foreground: oklch(0.205 0 0);          /* Text on accent */

  --color-destructive: oklch(0.576 0.215 27.325);       /* Error/danger */
  --color-destructive-foreground: oklch(0.985 0 0);     /* Text on destructive */

  /* ... more color variables */

  /* Spacing, typography, shadows, etc. */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}
```

**How to customize:**

1. **Change colors:** Modify OKLCH values in `@theme` block
2. **Add new colors:** Define new CSS variables and use in components
3. **Use in code:**
   ```tsx
   // Tailwind classes automatically use theme variables
   <button className="bg-primary text-primary-foreground">
     Click me
   </button>
   ```

**Generate color palettes:**
- Use [oklch.com](https://oklch.com) to generate OKLCH colors
- Convert hex/rgb to OKLCH for better color manipulation

### Adding Custom Tailwind Classes

```typescript
// tailwind.config.js
export default {
  theme: {
    extend: {
      // Add custom spacing
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      // Add custom fonts
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
    },
  },
}
```

### Path Aliases Configuration

The template uses `@/` to reference `src/` directory:

**TypeScript configuration (`tsconfig.json`):**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Vite configuration (`vite.config.ts`):**
```typescript
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Adding more aliases:**
```typescript
// vite.config.ts
alias: {
  '@': path.resolve(__dirname, './src'),
  '@components': path.resolve(__dirname, './src/components'),
  '@lib': path.resolve(__dirname, './src/lib'),
}

// tsconfig.json
"paths": {
  "@/*": ["./src/*"],
  "@components/*": ["./src/components/*"],
  "@lib/*": ["./src/lib/*"]
}
```

## Architecture Decisions

Understanding the rationale behind technology choices in this template.

### Why TanStack Router over React Router

**Type Safety Advantages:**
- Full TypeScript support with generated types for routes
- Type-safe params, search params, and navigation
- Compile-time route validation prevents broken links
- Auto-completion for route paths in IDE

**File-Based Routing:**
- Convention over configuration reduces boilerplate
- Automatic route generation with `routeTree.gen.ts`
- Clear project structure mirrors URL structure
- Easy to understand and maintain

**Performance:**
- Built-in code splitting per route
- Optimized bundle size with tree-shaking
- Prefetching support for faster navigation
- Minimal runtime overhead

**Developer Experience:**
- Excellent documentation and examples
- Active maintenance and community
- Modern API design (hooks-based)
- Built for modern React (concurrent features)

**When to use React Router instead:**
- You need a more mature ecosystem
- Your team is already familiar with React Router
- You have existing React Router code to migrate
- You prefer manual route configuration

### Why Supabase over Firebase/Custom Backend

**PostgreSQL vs NoSQL:**
- Relational data model with foreign keys and joins
- ACID transactions for data integrity
- Complex queries with SQL (more flexible than Firestore)
- Better for structured data with relationships

**Row Level Security (RLS):**
- Database-level security policies
- Fine-grained access control per row
- No need for Cloud Functions for basic auth rules
- Security enforced even if client is compromised

**Developer Experience:**
- SQL editor for direct database access
- Auto-generated TypeScript types from schema
- Built-in authentication with multiple providers
- Real-time subscriptions without additional setup
- Storage for files with CDN

**Cost Considerations:**
- More predictable pricing than Firebase
- Generous free tier (500MB database, 1GB file storage)
- No egress charges for reasonable usage
- Self-hostable for complete control

**Migration Path:**
- Standard PostgreSQL (easy to migrate elsewhere)
- Export data to SQL or CSV
- No vendor lock-in with proprietary APIs

**When to use Firebase instead:**
- You need mobile SDKs (iOS/Android)
- You want Google Cloud Integration
- Your data is hierarchical/document-based
- You need Firebase's ML Kit or other services

**When to build custom backend:**
- Very specific business logic requirements
- Need full control over infrastructure
- Existing backend team and infrastructure
- Custom caching or processing requirements

### Why Zustand over Redux/Context

**Bundle Size:**
- Zustand: ~1KB minified + gzipped
- Redux Toolkit: ~14KB
- Context API: Built-in but requires more boilerplate

**Developer Experience:**
- Minimal boilerplate (no actions, reducers, dispatchers)
- Hooks-based API (feels like React)
- No Provider wrapper needed
- Easy to learn and understand

**Performance:**
- Selective subscriptions (no unnecessary re-renders)
- No context propagation overhead
- Direct store access outside React
- Better than Context for frequent updates

**Middleware Ecosystem:**
- Built-in: persist, devtools, immer
- Easy to create custom middleware
- Composable middleware pattern

**When to use Redux instead:**
- Large team needs strict patterns
- Complex state with many actions
- Need Redux DevTools time-travel debugging
- Existing Redux ecosystem (middleware, libraries)

**When to use Context instead:**
- Very simple state (theme, locale)
- Rarely changes
- Only need for component tree subset
- Want to avoid external dependencies

### Why TanStack Query over SWR/Apollo

**Feature Set:**
- Most comprehensive: caching, pagination, infinite scroll, optimistic updates
- Parallel and dependent queries
- Mutations with automatic refetch
- Query cancellation and retry logic

**DevTools:**
- Best-in-class DevTools for debugging
- Query inspector shows cache state
- Time-travel debugging
- Performance monitoring

**Caching Strategy:**
- Sophisticated cache invalidation
- Automatic background refetching
- Stale-while-revalidate pattern
- Memory management with garbage collection

**TypeScript Support:**
- Full type inference for queries and mutations
- Generic types for data, error, variables
- No code generation needed (unlike Apollo)

**Bundle Size:**
- ~12KB for core (reasonable for features)
- Tree-shakeable
- No GraphQL overhead if not needed

**When to use SWR instead:**
- You want something simpler
- Smaller bundle size priority (4KB)
- Only need basic data fetching
- Prefer Vercel ecosystem

**When to use Apollo instead:**
- You're using GraphQL exclusively
- Need GraphQL-specific features (fragments, normalized cache)
- Want GraphQL code generation
- Team experienced with Apollo

### Why shadcn/ui over Component Libraries

**Copy vs Dependency:**
- Components copied into your codebase (full control)
- No version conflicts or breaking changes
- Customize without forking or wrapping
- See exactly what code you're using

**Customization:**
- Modify components directly in your project
- Change styles without fighting specificity
- Add features without complex APIs
- No "escape hatches" needed

**Bundle Size:**
- Only pay for what you use
- No unused components in bundle
- Tree-shaking at component level
- Typically smaller than full libraries

**Maintenance:**
- You own the code (responsibility and control)
- Update components individually
- No forced upgrades
- Can keep old components while adopting new ones

**When to use Chakra UI/MUI instead:**
- Need pre-built complex components (DataGrid, DatePicker)
- Want comprehensive theming system out of the box
- Team prefers external dependencies
- Don't want to maintain UI code

**When to use Ant Design instead:**
- Building admin/enterprise applications
- Need battle-tested components
- Want opinionated design system
- Prefer more features over customization

### Why Vitest over Jest

**Vite Integration:**
- Uses same config as Vite (no duplication)
- Instant hot module reload for tests
- Same transformation pipeline
- No complex Jest + Vite setup

**Speed:**
- 10-20x faster than Jest in many cases
- Native ESM support (no transformation overhead)
- Smart test re-runs
- Parallel test execution by default

**Developer Experience:**
- Compatible with Jest API (easy migration)
- Better error messages and diffs
- Watch mode with instant feedback
- UI mode for visual test debugging

**Configuration:**
- Single config file (vite.config.ts)
- Works out of the box with TypeScript
- No Babel configuration needed

**When to use Jest instead:**
- You have existing Jest tests
- Need specific Jest plugins
- Team highly experienced with Jest
- Need Jest-specific features (snapshotting)

### Why Cloudflare Pages over Vercel/Netlify

**Edge Network:**
- Global CDN with 300+ locations
- Consistently fast worldwide
- No cold starts for static sites
- Automatic SSL and DDoS protection

**Pricing:**
- Unlimited bandwidth on free tier
- Unlimited requests
- No per-seat pricing
- More predictable costs at scale

**Features:**
- Edge Functions (Cloudflare Workers)
- Built-in analytics (privacy-friendly)
- Direct access to Cloudflare's ecosystem
- KV storage, R2, Durable Objects

**Performance:**
- Faster edge network than competitors
- Better Asia/Pacific coverage
- Lower latency globally

**When to use Vercel instead:**
- Using Next.js (best support)
- Need Vercel-specific features (ISR, Middleware)
- Want analytics and monitoring included
- Prefer Vercel DX and dashboard

**When to use Netlify instead:**
- Need Netlify Forms or Identity
- Using Netlify CMS
- Want split testing built-in
- Prefer Netlify's plugin ecosystem

### Monorepo vs Single Package

**Use Monorepo When:**
- Sharing code between frontend and backend
- Multiple apps with shared components
- Need to version packages together
- Team collaborating on related projects

**Tools:**
- **Turborepo**: Fast, simple, good caching
- **Nx**: Powerful, opinionated, great for large teams
- **pnpm workspaces**: Simple, built into pnpm

**Single Package (This Template):**
- Simple project structure
- Faster initial setup
- Easier to understand and maintain
- No monorepo complexity overhead
- Best for single SPA projects

### When to Avoid This Stack

**Server-Side Rendering Required:**
- SEO-critical content
- Dynamic Open Graph tags
- Fast first paint is critical
→ **Use Next.js or Remix** instead

**Native Mobile App:**
- Need iOS/Android apps
- Native device APIs
- App store distribution
→ **Use React Native or Flutter** instead

**Large Team with Strict Standards:**
- Need enforced patterns
- Complex state management
- Many developers
→ **Consider Redux, NX, more structure**

**Complex Real-Time Requirements:**
- Collaborative editing (Google Docs-like)
- Real-time gaming
- Complex synchronization
→ **Consider specialized solutions** (Yjs, Liveblocks, Socket.io)

**Static Site Generator Needs:**
- Blog or documentation site
- No dynamic content
- Build-time rendering
→ **Use Astro, VitePress, or 11ty** instead

## Troubleshooting

### Common Issues and Solutions

**1. Module not found errors after adding shadcn/ui component**
```bash
# Error: Cannot find module '@radix-ui/react-dialog'
# Solution: Install the missing peer dependency
pnpm install @radix-ui/react-dialog
```

**2. TanStack Router types not updating**
```bash
# Solution: Regenerate route tree
pnpm exec tsr generate

# Or restart dev server (it auto-generates on startup)
pnpm dev
```

**3. Environment variables not working**
```bash
# Error: import.meta.env.VITE_SUPABASE_URL is undefined
# Solution: Ensure variables are prefixed with VITE_
# Wrong: SUPABASE_URL=...
# Correct: VITE_SUPABASE_URL=...

# Restart dev server after changing .env
pnpm dev
```

**4. Supabase connection fails**
```bash
# Check if credentials are correct
console.log(import.meta.env.VITE_SUPABASE_URL)
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY)

# Verify project is not paused in Supabase dashboard
# Check if URL has correct format: https://[project-id].supabase.co
```

**5. Build fails with TypeScript errors**
```bash
# Run type-check to see all errors
pnpm typecheck

# Common fix: Regenerate route tree
pnpm exec tsr generate

# Check for unused imports or variables
pnpm lint:fix
```

**6. Tests failing with "Cannot find module" errors**
```bash
# Ensure vitest.config.ts has correct path aliases
# Should match vite.config.ts aliases

# vitest.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

**7. Cloudflare Pages deployment fails**
```bash
# Check build locally first
pnpm build

# Verify GitHub secrets are set correctly
# CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID

# Check workflow logs in GitHub Actions tab
```

**8. Hot Module Replacement (HMR) not working**
```bash
# Restart dev server
# Check if port 5173 is already in use
lsof -ti:5173 | xargs kill -9
pnpm dev
```

## Best Practices

### Project Organization

**File naming conventions:**
- Components: PascalCase (`UserProfile.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Routes: kebab-case (`user-profile.tsx`)
- Tests: Same as source file + `.test` (`UserProfile.test.tsx`)

**Component organization:**
```
src/components/
├── ui/                    # shadcn/ui primitives (Button, Card, etc.)
├── layout/                # Layout components (Header, Footer, Sidebar)
├── features/              # Feature-specific components
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   └── todos/
│       ├── TodoList.tsx
│       └── TodoItem.tsx
└── shared/                # Shared components (Loading, ErrorBoundary)
```

**State management guidelines:**
- **Local state:** Use `useState` for component-specific state
- **Global UI state:** Use Zustand (theme, sidebar open/closed)
- **Server state:** Use TanStack Query (API data, caching)
- **Form state:** Use TanStack Form or controlled inputs
- **URL state:** Use TanStack Router (search params, path params)

### Performance Optimization

**Code splitting:**
```typescript
// Lazy load routes for smaller initial bundle
import { lazy } from 'react'

const Dashboard = lazy(() => import('./routes/dashboard'))

// TanStack Router supports automatic code splitting
export const Route = createFileRoute('/dashboard')({
  component: lazy(() => import('@/components/Dashboard')),
})
```

**Virtualization for large lists:**
```typescript
import { useVirtualizer } from '@tanstack/react-virtual'

function LargeList({ items }) {
  const parentRef = useRef(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  })

  return (
    <div ref={parentRef} className="h-[400px] overflow-auto">
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div key={virtualItem.key} data-index={virtualItem.index}>
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  )
}
```

**Optimize TanStack Query:**
```typescript
// Set stale time to reduce refetches
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000, // 5 minutes
})

// Prefetch data on hover
const queryClient = useQueryClient()

<Link
  to="/users/$userId"
  onMouseEnter={() => {
    queryClient.prefetchQuery({
      queryKey: ['user', userId],
      queryFn: () => fetchUser(userId),
    })
  }}
>
  View User
</Link>
```

### Security Best Practices

**1. Environment Variables:**
- Never commit `.env` files
- Use Supabase anon key (not service role key) in client code
- Validate all user inputs

**2. Supabase Row Level Security:**
```sql
-- Enable RLS on all tables
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Only allow users to access their own data
CREATE POLICY "Users can only access their own todos"
  ON todos
  USING (auth.uid() = user_id);
```

**3. API Security:**
```typescript
// Validate inputs
function createTodo(title: string) {
  if (!title || title.trim().length === 0) {
    throw new Error('Title is required')
  }
  if (title.length > 200) {
    throw new Error('Title too long')
  }
  // Make API call
}

// Handle errors properly
try {
  const data = await api.post('/todos', { title })
} catch (error) {
  if (error instanceof ApiError) {
    // Handle specific error
    showToast(error.message)
  } else {
    // Handle unknown error
    console.error(error)
    showToast('An unexpected error occurred')
  }
}
```

**4. XSS Prevention:**
```typescript
// React automatically escapes content
<div>{userInput}</div>  // Safe

// Be careful with dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />  // Unsafe!

// Use a sanitization library if needed
import DOMPurify from 'dompurify'
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Code contribution guidelines:**
- Follow existing code style (enforced by ESLint + Prettier)
- Add tests for new features
- Update documentation for API changes
- Keep commits atomic and well-described
- Run `pnpm lint && pnpm typecheck && pnpm test:run` before submitting

## Quick Reference

### Essential Commands

```bash
# Development
pnpm dev                    # Start dev server at http://localhost:5173
pnpm build                  # Build for production (output: dist/)
pnpm preview                # Preview production build

# Code Quality
pnpm lint                   # Check ESLint errors
pnpm lint:fix               # Auto-fix ESLint errors
pnpm format                 # Format with Prettier
pnpm format:check           # Check formatting
pnpm typecheck              # Run TypeScript compiler check

# Testing
pnpm test                   # Run tests in watch mode
pnpm test:run               # Run tests once
pnpm test:coverage          # Generate coverage report

# Dependencies
pnpm install                # Install all dependencies
pnpm add [package]          # Add dependency
pnpm add -D [package]       # Add dev dependency
pnpm remove [package]       # Remove dependency

# shadcn/ui
pnpm dlx shadcn@latest add [component]  # Add UI component

# TanStack Router
pnpm exec tsr generate      # Regenerate route tree
pnpm exec tsr watch         # Watch mode (auto-generate)

# Deployment
pnpm dlx wrangler pages deploy dist  # Deploy to Cloudflare Pages
```

### Key File Locations

| Purpose | File Path | Description |
|---------|-----------|-------------|
| App entry | `src/main.tsx` | ReactDOM render |
| Root component | `src/App.tsx` | Router setup |
| Root route | `src/routes/__root.tsx` | Layout wrapper |
| Route files | `src/routes/*.tsx` | File-based routing |
| UI components | `src/components/ui/` | shadcn/ui components |
| Custom hooks | `src/hooks/` | React hooks |
| Zustand stores | `src/store/` | Global state |
| API services | `src/services/` | API calls |
| Utils | `src/lib/` | Helper functions |
| Supabase client | `src/lib/supabase.ts` | DB connection |
| Global styles | `src/index.css` | Tailwind + theme |
| Test utils | `src/test/test-utils.tsx` | Testing helpers |
| Vite config | `vite.config.ts` | Build configuration |
| TypeScript config | `tsconfig.json` | Compiler options |
| ESLint config | `eslint.config.js` | Linting rules |
| Vitest config | `vitest.config.ts` | Test configuration |

### Import Patterns

```typescript
// React
import { useState, useEffect, useRef } from 'react'

// TanStack Router
import { createFileRoute, Link, useNavigate, useParams } from '@tanstack/react-router'

// TanStack Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Zustand
import { create } from 'zustand'
import { useStoreNameStore } from '@/store/storeName'

// shadcn/ui components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

// Supabase
import { supabase } from '@/lib/supabase'

// API service
import { api } from '@/services/api'

// Utils
import { cn } from '@/lib/utils'
```

### Common Code Patterns

**Create a new page:**
```typescript
// src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">About</h1>
    </div>
  )
}
```

**Create dynamic route:**
```typescript
// src/routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  component: Post,
})

function Post() {
  const { postId } = Route.useParams()
  return <div>Post {postId}</div>
}
```

**Fetch data with TanStack Query:**
```typescript
import { useQuery } from '@tanstack/react-query'

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase.from('users').select('*')
      if (error) throw error
      return data
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data?.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}
```

**Create mutation:**
```typescript
const mutation = useMutation({
  mutationFn: (newUser) => api.post('/users', newUser),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})

<button onClick={() => mutation.mutate({ name: 'John' })}>
  Create User
</button>
```

**Create Zustand store:**
```typescript
// src/store/user.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user: User | null
  setUser: (user: User) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: 'user-storage' }
  )
)
```

**Type-safe navigation:**
```typescript
import { Link, useNavigate } from '@tanstack/react-router'

// Using Link
<Link to="/posts/$postId" params={{ postId: '123' }}>
  View Post
</Link>

// Using navigate
const navigate = useNavigate()
navigate({ to: '/posts/$postId', params: { postId: '123' } })
```

## Technology Documentation

### Official Documentation Links

- **React:** [react.dev](https://react.dev)
- **TypeScript:** [typescriptlang.org](https://www.typescriptlang.org/docs/)
- **Vite:** [vite.dev](https://vite.dev)
- **TanStack Router:** [tanstack.com/router](https://tanstack.com/router/latest)
- **TanStack Query:** [tanstack.com/query](https://tanstack.com/query/latest)
- **TanStack Table:** [tanstack.com/table](https://tanstack.com/table/latest)
- **TanStack Form:** [tanstack.com/form](https://tanstack.com/form/latest)
- **TanStack Virtual:** [tanstack.com/virtual](https://tanstack.com/virtual/latest)
- **Supabase:** [supabase.com/docs](https://supabase.com/docs)
- **Zustand:** [github.com/pmndrs/zustand](https://github.com/pmndrs/zustand)
- **shadcn/ui:** [ui.shadcn.com](https://ui.shadcn.com)
- **Tailwind CSS:** [tailwindcss.com](https://tailwindcss.com)
- **Vitest:** [vitest.dev](https://vitest.dev)
- **Cloudflare Pages:** [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Template Version:** 1.0.0
**Last Updated:** February 2026
**Maintained by:** [Your Name/Organization]

For questions, issues, or contributions, visit the [GitHub repository](https://github.com/YOUR_USERNAME/web-template).
