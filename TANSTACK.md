# TanStack Suite Guide

This template includes the complete TanStack suite of libraries for building modern, type-safe React applications.

## Overview

The TanStack suite provides powerful, headless utilities that give you complete control over your UI while handling complex logic:

- **TanStack Router** - Type-safe, file-based routing
- **TanStack Query** - Data fetching and caching
- **TanStack Table** - Headless table library
- **TanStack Form** - Type-safe form management
- **TanStack Virtual** - Virtualization for large lists

All TanStack libraries are:
- ✅ **Headless** - Full control over UI/styling
- ✅ **Type-safe** - First-class TypeScript support
- ✅ **Framework-agnostic** - Core logic works anywhere
- ✅ **Lightweight** - Small bundle sizes
- ✅ **Well-documented** - Comprehensive docs and examples

---

## TanStack Router

### What is it?

Type-safe, file-based routing with built-in code splitting, loaders, and search params validation.

### Key Features

- File-based routing (like Next.js)
- Type-safe navigation and params
- Built-in code splitting
- Route loaders for data fetching
- Search params validation
- Nested layouts
- DevTools for debugging

### File Structure

```
src/routes/
├── __root.tsx          # Root layout
├── index.tsx           # Home page (/)
├── about.tsx           # About page (/about)
└── users/
    ├── index.tsx       # Users list (/users)
    └── $id.tsx         # User detail (/users/:id)
```

### Basic Usage

```typescript
// src/routes/users/$id.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$id')({
  component: UserComponent,
  loader: async ({ params }) => {
    // Fetch user data
    const user = await fetchUser(params.id)
    return { user }
  },
})

function UserComponent() {
  const { user } = Route.useLoaderData()
  return <div>{user.name}</div>
}
```

### Navigation

```typescript
import { Link, useNavigate } from '@tanstack/react-router'

// Declarative
<Link to="/users/$id" params={{ id: '123' }}>View User</Link>

// Programmatic
const navigate = useNavigate()
navigate({ to: '/users/$id', params: { id: '123' } })
```

### Search Params

```typescript
export const Route = createFileRoute('/search')({
  validateSearch: (search) => ({
    query: (search.query as string) || '',
    page: Number(search.page) || 1,
  }),
})

function SearchComponent() {
  const { query, page } = Route.useSearch()
  // Use validated search params
}
```

---

## TanStack Query

### What is it?

Powerful data synchronization library with automatic caching, background updates, and request deduplication.

### Key Features

- Automatic caching
- Background refetching
- Request deduplication
- Optimistic updates
- Pagination & infinite scroll
- Mutations with rollback
- DevTools

### Configuration

```typescript
// src/lib/query-client.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10,   // 10 minutes
      retry: 3,
    },
  },
})
```

### Queries

```typescript
import { useQuery } from '@tanstack/react-query'

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users')
      return res.json()
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return <div>{data.map(user => ...)}</div>
}
```

### Mutations

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'

function CreateUser() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: (newUser) => fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
    }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return (
    <button onClick={() => mutation.mutate({ name: 'John' })}>
      Create User
    </button>
  )
}
```

### With Supabase

```typescript
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
      if (error) throw error
      return data
    },
  })
}
```

---

## TanStack Table

### What is it?

Headless table library with sorting, filtering, pagination, and column resizing.

### Key Features

- Sorting (single & multi-column)
- Filtering (column & global)
- Pagination
- Column resizing
- Row selection
- Virtualization support
- Fully customizable UI

### Basic Usage

```typescript
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table'

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
]

function DataTable({ data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

### Sorting

```typescript
const [sorting, setSorting] = useState([])

const table = useReactTable({
  data,
  columns,
  state: { sorting },
  onSortingChange: setSorting,
  getSortedRowModel: getSortedRowModel(),
})

// In header
<th onClick={header.column.getToggleSortingHandler()}>
  {header.column.columnDef.header}
  {{
    asc: ' 🔼',
    desc: ' 🔽',
  }[header.column.getIsSorted()] ?? null}
</th>
```

### Filtering

```typescript
const [globalFilter, setGlobalFilter] = useState('')

const table = useReactTable({
  data,
  columns,
  state: { globalFilter },
  onGlobalFilterChange: setGlobalFilter,
  getFilteredRowModel: getFilteredRowModel(),
})
```

---

## TanStack Form

### What is it?

Type-safe form library with validation, field arrays, and async validation.

### Key Features

- Type-safe field definitions
- Validation (sync & async)
- Field arrays
- Cross-field validation
- Optimistic updates
- Framework adapters (Zod, Yup, etc.)

### Basic Usage

```typescript
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      await login(value)
    },
    validatorAdapter: zodValidator(),
  })

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      form.handleSubmit()
    }}>
      <form.Field
        name="email"
        validators={{
          onChange: schema.shape.email,
        }}
      >
        {(field) => (
          <div>
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors && (
              <span>{field.state.meta.errors.join(', ')}</span>
            )}
          </div>
        )}
      </form.Field>
      
      <button type="submit">Submit</button>
    </form>
  )
}
```

### Cross-Field Validation

```typescript
<form.Field
  name="confirmPassword"
  validators={{
    onChangeListenTo: ['password'],
    onChange: ({ value, fieldApi }) => {
      if (value !== fieldApi.form.getFieldValue('password')) {
        return "Passwords don't match"
      }
      return undefined
    },
  }}
>
  {(field) => <input {...field} />}
</form.Field>
```

---

## TanStack Virtual

### What is it?

Virtualization library for efficiently rendering large lists and tables.

### Key Features

- Virtual scrolling
- Dynamic item sizes
- Horizontal & vertical
- Smooth scrolling
- Minimal DOM elements
- Works with any list size

### Basic Usage

```typescript
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

function VirtualList({ items }) {
  const parentRef = useRef(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  })

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Dynamic Heights

```typescript
const virtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 100, // Estimate
  // Items will measure themselves
})
```

---

## Integration Examples

### Router + Query

```typescript
// Route with data loading
export const Route = createFileRoute('/users/$id')({
  component: UserComponent,
  loader: async ({ params }) => {
    // Prefetch query
    await queryClient.ensureQueryData({
      queryKey: ['user', params.id],
      queryFn: () => fetchUser(params.id),
    })
  },
})

function UserComponent() {
  const { id } = Route.useParams()
  const { data: user } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
  })
  return <div>{user.name}</div>
}
```

### Table + Virtual

```typescript
// Virtualized table for large datasets
function VirtualTable({ data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const { rows } = table.getRowModel()
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  })

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      {/* Render virtual rows */}
    </div>
  )
}
```

### Form + Query Mutation

```typescript
function CreateUserForm() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const form = useForm({
    defaultValues: { name: '', email: '' },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value)
    },
  })

  return <form>{/* Form fields */}</form>
}
```

---

## Resources

- **TanStack Router**: https://tanstack.com/router
- **TanStack Query**: https://tanstack.com/query
- **TanStack Table**: https://tanstack.com/table
- **TanStack Form**: https://tanstack.com/form
- **TanStack Virtual**: https://tanstack.com/virtual

## Examples

See the `/examples` route in the application for live demonstrations of all TanStack libraries.
