import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Web Template</h1>
        <p className="text-muted-foreground text-xl">
          A modern React template with Supabase and the complete TanStack suite
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>🗄️ Supabase</CardTitle>
            <CardDescription>Database & Authentication</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              PostgreSQL database with real-time subscriptions, authentication,
              and storage.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/examples/supabase">View Example</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🧭 TanStack Router</CardTitle>
            <CardDescription>Type-Safe Routing</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              File-based routing with type safety, loaders, and search params
              validation.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/about">View Example</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🔄 TanStack Query</CardTitle>
            <CardDescription>Data Fetching & Caching</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              Powerful data synchronization with automatic caching, background
              updates, and more.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/examples/query">View Example</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📊 TanStack Table</CardTitle>
            <CardDescription>Headless Table Library</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              Powerful tables with sorting, filtering, pagination, and column
              resizing.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/examples/table">View Example</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📝 TanStack Form</CardTitle>
            <CardDescription>Type-Safe Forms</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              Headless form library with validation, field arrays, and async
              validation.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/examples/form">View Example</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📜 TanStack Virtual</CardTitle>
            <CardDescription>Virtualization</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              Efficiently render large lists and tables with virtual scrolling.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/examples/virtual">View Example</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🐻 Zustand</CardTitle>
            <CardDescription>State Management</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              Lightweight state management with minimal boilerplate and great
              TypeScript support.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/examples/state">View Example</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🎨 shadcn/ui</CardTitle>
            <CardDescription>UI Components</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              Beautiful, accessible components built with Radix UI and Tailwind
              CSS.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/examples/components">View Components</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>⚡ Vite</CardTitle>
            <CardDescription>Build Tool</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              Lightning-fast development with instant HMR and optimized
              production builds.
            </p>
            <Button asChild variant="outline" className="w-full">
              <a
                href="https://vitejs.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
