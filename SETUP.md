# Setup Guide

This guide will walk you through setting up the web template with all its features.

## Prerequisites

- Node.js 22 or higher
- pnpm 10 or higher
- A Supabase account (free tier available)
- Git

## Initial Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/lovieco/web-template.git
cd web-template

# Install dependencies
pnpm install
```

### 2. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env
```

Edit `.env` and configure your environment variables:

```env
# Supabase Configuration (required for database features)
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key

# API Configuration (optional)
VITE_API_BASE_URL=https://api.example.com
```

### 3. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## Supabase Setup

### Creating a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - **Name**: Your project name
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
4. Wait for the project to be created (takes ~2 minutes)

### Getting Your API Keys

1. Go to your project dashboard
2. Click on "Project Settings" (gear icon in the sidebar)
3. Navigate to "API" section
4. Copy the following values:
   - **Project URL**: This is your `VITE_SUPABASE_URL`
   - **anon/public key**: This is your `VITE_SUPABASE_ANON_KEY`
5. Add these to your `.env` file

### Creating Your Database Schema

You have several options for creating your database schema:

#### Option 1: Using the Table Editor (Recommended for beginners)

1. Go to "Table Editor" in the Supabase dashboard
2. Click "New Table"
3. Define your table structure with columns and types
4. Enable Row Level Security (RLS) for security

#### Option 2: Using the SQL Editor

1. Go to "SQL Editor" in the Supabase dashboard
2. Create a new query
3. Write your SQL schema:

```sql
-- Example: Create a simple todos table
create table todos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table todos enable row level security;

-- Create policies
create policy "Users can view their own todos"
  on todos for select
  using (auth.uid() = user_id);

create policy "Users can insert their own todos"
  on todos for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own todos"
  on todos for update
  using (auth.uid() = user_id);

create policy "Users can delete their own todos"
  on todos for delete
  using (auth.uid() = user_id);
```

### Setting Up Authentication

Supabase provides built-in authentication. To enable it:

1. Go to "Authentication" in the Supabase dashboard
2. Configure your authentication providers:
   - **Email**: Enabled by default
   - **OAuth**: Configure providers like Google, GitHub, etc.
   - **Magic Links**: Email-based passwordless authentication
3. Configure email templates under "Email Templates"
4. Set up redirect URLs under "URL Configuration"

## Using the Template Features

### Routing with React Router

The template uses React Router v7 for client-side routing. Routes are defined in `src/App.tsx`:

```typescript
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="examples" element={<ExamplesIndex />} />
    {/* Add your routes here */}
  </Route>
</Routes>
```

To add a new route:

1. Create a new page component in `src/pages/`
2. Import it in `src/App.tsx`
3. Add a new `<Route>` element

### Data Fetching with TanStack Query

TanStack Query is configured in `src/lib/query-client.ts`. Example usage:

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*');
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* Render your data */}</div>;
}
```

See `src/hooks/use-queries.ts` for more examples.

### State Management with Zustand

Global state is managed with Zustand. Example store in `src/store/counter.ts`:

```typescript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface MyState {
  value: string;
  setValue: (value: string) => void;
}

export const useMyStore = create<MyState>()(
  devtools(
    persist(
      (set) => ({
        value: '',
        setValue: (value) => set({ value }),
      }),
      { name: 'my-storage' }
    )
  )
);
```

### Database Operations

Example hooks are provided in `src/hooks/use-queries.ts`. Update them with your table names:

```typescript
// Fetch data
export function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

// Create data
export function useCreateTodo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newTodo: { title: string }) => {
      const { data, error } = await supabase
        .from('todos')
        .insert(newTodo)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}
```

## Deployment

### Cloudflare Pages Setup

1. Create a Cloudflare account at [cloudflare.com](https://cloudflare.com)
2. Get your Account ID from the Cloudflare dashboard
3. Create an API token with "Cloudflare Pages: Edit" permission
4. Add secrets to your GitHub repository:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
5. Push to the `main` branch to trigger automatic deployment

### Adding Environment Variables to Production

In Cloudflare Pages dashboard:

1. Go to your project
2. Navigate to "Settings" → "Environment variables"
3. Add your production environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - Any other `VITE_*` variables

## Testing

Run tests with:

```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test:run

# Run tests with coverage
pnpm test:coverage
```

## Code Quality

```bash
# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check

# Type check
pnpm typecheck
```

## Troubleshooting

### Supabase Connection Issues

If you're having trouble connecting to Supabase:

1. Verify your `.env` file has the correct values
2. Check that your Supabase project is active
3. Ensure your API keys are correct (no extra spaces)
4. Restart your development server after changing `.env`

### Build Errors

If you encounter build errors:

1. Clear the build cache: `rm -rf dist node_modules/.vite`
2. Reinstall dependencies: `pnpm install`
3. Run type checking: `pnpm typecheck`

### Authentication Issues

If authentication isn't working:

1. Check your Supabase authentication settings
2. Verify redirect URLs are configured correctly
3. Check browser console for errors
4. Ensure RLS policies are set up correctly

## Next Steps

1. Customize the theme in `src/index.css`
2. Create your database schema in Supabase
3. Build your pages in `src/pages/`
4. Add your API routes and queries
5. Deploy to Cloudflare Pages

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query)
- [React Router Documentation](https://reactrouter.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
