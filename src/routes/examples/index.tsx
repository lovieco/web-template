import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/examples/")({
  component: ExamplesIndexComponent,
});

function ExamplesIndexComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Examples</h1>
        <p className="text-muted-foreground text-xl">
          Explore examples demonstrating the features of this template
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Supabase Integration</CardTitle>
            <CardDescription>
              Database queries, authentication, and real-time subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/examples/supabase">View Example</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>TanStack Query</CardTitle>
            <CardDescription>
              Data fetching, caching, and mutations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/examples/query">View Example</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>TanStack Table</CardTitle>
            <CardDescription>
              Powerful data tables with sorting, filtering, and pagination
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/examples/table">View Example</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>TanStack Form</CardTitle>
            <CardDescription>
              Type-safe forms with validation using Zod
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/examples/form">View Example</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>TanStack Virtual</CardTitle>
            <CardDescription>
              Virtual scrolling for large lists
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/examples/virtual">View Example</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>State Management</CardTitle>
            <CardDescription>
              Global state management with Zustand
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/examples/state">View Example</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Button asChild variant="outline">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
