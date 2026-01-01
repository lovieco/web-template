import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Layout() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <nav className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold">
            Web Template
          </Link>
          <div className="flex gap-2">
            <Button
              asChild
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
            >
              <Link to="/">Home</Link>
            </Button>
            <Button
              asChild
              variant={isActive("/about") ? "default" : "ghost"}
              size="sm"
            >
              <Link to="/about">About</Link>
            </Button>
            <Button
              asChild
              variant={
                location.pathname.startsWith("/examples") ? "default" : "ghost"
              }
              size="sm"
            >
              <Link to="/examples">Examples</Link>
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
            Built with React, Vite, TypeScript, Supabase, TanStack Query, and
            React Router
          </p>
        </div>
      </footer>
    </div>
  );
}
