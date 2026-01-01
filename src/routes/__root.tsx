import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Button } from "@/components/ui/button";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <nav className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold">
            Web Template
          </Link>
          <div className="flex gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link
                to="/"
                activeProps={{
                  className: "bg-accent",
                }}
              >
                Home
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link
                to="/about"
                activeProps={{
                  className: "bg-accent",
                }}
              >
                About
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link
                to="/examples"
                activeProps={{
                  className: "bg-accent",
                }}
              >
                Examples
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            Built with React, Vite, TypeScript, Supabase, and TanStack
            (Router, Query, Table, Form, Virtual)
          </p>
        </div>
      </footer>

      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
