import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">About This Template</h1>
        <p className="text-muted-foreground text-xl">
          A production-ready React template with modern tooling
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tech Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <strong>React 19</strong> - Latest React with concurrent
                features
              </li>
              <li>
                <strong>TypeScript</strong> - Type-safe development
              </li>
              <li>
                <strong>Vite</strong> - Lightning-fast build tool
              </li>
              <li>
                <strong>Tailwind CSS v4</strong> - Utility-first CSS framework
              </li>
              <li>
                <strong>shadcn/ui</strong> - Beautiful UI components
              </li>
              <li>
                <strong>Supabase</strong> - Database and authentication
              </li>
              <li>
                <strong>TanStack Query</strong> - Data fetching and caching
              </li>
              <li>
                <strong>React Router v7</strong> - Client-side routing
              </li>
              <li>
                <strong>Zustand</strong> - State management
              </li>
              <li>
                <strong>Vitest</strong> - Fast unit testing
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>✅ Production-ready setup</li>
              <li>✅ TypeScript with strict mode</li>
              <li>✅ ESLint + Prettier configuration</li>
              <li>✅ Comprehensive testing setup</li>
              <li>✅ CI/CD with GitHub Actions</li>
              <li>✅ Cloudflare Pages deployment</li>
              <li>✅ Database integration with Supabase</li>
              <li>✅ Data fetching with TanStack Query</li>
              <li>✅ Client-side routing</li>
              <li>✅ Component library with shadcn/ui</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/lovieco/web-template"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
