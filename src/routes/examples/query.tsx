import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Example API fetch function
async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

export const Route = createFileRoute("/examples/query")({
  component: QueryExampleComponent,
});

function QueryExampleComponent() {
  const [enabled, setEnabled] = useState(true);

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    enabled: enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">TanStack Query Example</h1>
        <p className="text-muted-foreground text-xl">
          Demonstrating data fetching, caching, and state management
        </p>
      </div>

      <div className="mb-6 grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Query Controls</CardTitle>
            <CardDescription>
              Interact with the query to see TanStack Query in action
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={() => refetch()} disabled={isFetching}>
                {isFetching ? "Refetching..." : "Refetch Data"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setEnabled(!enabled)}
              >
                {enabled ? "Disable Query" : "Enable Query"}
              </Button>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Status:</strong>{" "}
                {isLoading
                  ? "Loading..."
                  : isError
                    ? "Error"
                    : "Success"}
              </p>
              <p>
                <strong>Enabled:</strong> {enabled ? "Yes" : "No"}
              </p>
              <p>
                <strong>Fetching:</strong> {isFetching ? "Yes" : "No"}
              </p>
              <p>
                <strong>Cached:</strong>{" "}
                {data && !isFetching ? "Yes" : "No"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Query Results</CardTitle>
            <CardDescription>
              Data fetched from JSONPlaceholder API
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && <p>Loading posts...</p>}

            {isError && (
              <div className="text-destructive">
                <p className="font-semibold">Error:</p>
                <p>{error.message}</p>
              </div>
            )}

            {data && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Showing first 5 of {data.length} posts
                </p>
                <div className="space-y-4">
                  {data.slice(0, 5).map((post: any) => (
                    <div
                      key={post.id}
                      className="rounded-lg border p-4"
                    >
                      <h3 className="mb-2 font-semibold">{post.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {post.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features Demonstrated</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✅ Automatic caching of query results</li>
              <li>✅ Loading and error states</li>
              <li>✅ Manual refetch capability</li>
              <li>✅ Enable/disable queries dynamically</li>
              <li>✅ Background refetching</li>
              <li>✅ Stale-while-revalidate pattern</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Button asChild variant="outline">
        <Link to="/examples">Back to Examples</Link>
      </Button>
    </div>
  );
}
