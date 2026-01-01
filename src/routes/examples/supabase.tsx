import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/hooks/use-supabase";

export const Route = createFileRoute("/examples/supabase")({
  component: SupabaseExampleComponent,
});

function SupabaseExampleComponent() {
  const { user, loading } = useUser();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Supabase Integration</h1>
        <p className="text-muted-foreground text-xl">
          Database, authentication, and real-time features
        </p>
      </div>

      <div className="mb-6 grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Status</CardTitle>
            <CardDescription>
              Current user authentication state
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Checking authentication...</p>
            ) : user ? (
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Status:</strong>{" "}
                  <span className="text-green-600">Authenticated</span>
                </p>
                <p className="text-sm">
                  <strong>User ID:</strong> {user.id}
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm">
                  <strong>Status:</strong>{" "}
                  <span className="text-muted-foreground">Not authenticated</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Configure your Supabase project and add authentication to see
                  user details here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
            <CardDescription>
              How to configure Supabase for your project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">1. Create a Supabase Project</h3>
              <p className="text-sm text-muted-foreground">
                Go to{" "}
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  supabase.com
                </a>{" "}
                and create a new project.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">2. Get Your API Keys</h3>
              <p className="text-sm text-muted-foreground">
                Find your project URL and anon key in Project Settings → API.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">3. Configure Environment Variables</h3>
              <p className="text-sm text-muted-foreground">
                Create a <code className="rounded bg-muted px-1">.env</code>{" "}
                file with:
              </p>
              <pre className="rounded-lg bg-muted p-4 text-xs">
                {`VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key`}
              </pre>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">4. Create Database Tables</h3>
              <p className="text-sm text-muted-foreground">
                Use the Supabase SQL Editor to create your database schema.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✅ PostgreSQL database with Row Level Security</li>
              <li>✅ Authentication (email, OAuth, magic links)</li>
              <li>✅ Real-time subscriptions</li>
              <li>✅ File storage with CDN</li>
              <li>✅ Edge Functions (serverless)</li>
              <li>✅ Vector embeddings for AI</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Example Queries</CardTitle>
            <CardDescription>
              Common Supabase operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-semibold">Fetch Data</h4>
                <pre className="rounded-lg bg-muted p-3 text-xs">
                  {`const { data, error } = await supabase
  .from('table_name')
  .select('*');`}
                </pre>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold">Insert Data</h4>
                <pre className="rounded-lg bg-muted p-3 text-xs">
                  {`const { data, error } = await supabase
  .from('table_name')
  .insert({ column: 'value' });`}
                </pre>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold">Real-time Subscription</h4>
                <pre className="rounded-lg bg-muted p-3 text-xs">
                  {`supabase
  .channel('table_name')
  .on('postgres_changes', 
    { event: '*', schema: 'public' },
    (payload) => console.log(payload)
  )
  .subscribe();`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button asChild variant="outline">
        <Link to="/examples">Back to Examples</Link>
      </Button>
    </div>
  );
}
