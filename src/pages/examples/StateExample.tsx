import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCounterStore } from "@/store/counter";

export default function StateExample() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">State Management Example</h1>
        <p className="text-muted-foreground text-xl">
          Demonstrating global state management with Zustand
        </p>
      </div>

      <div className="mb-6 grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Counter Demo (Zustand)</CardTitle>
            <CardDescription>
              Global state persisted to localStorage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="icon" onClick={decrement}>
                -
              </Button>
              <span className="w-20 text-center text-4xl font-bold">
                {count}
              </span>
              <Button variant="outline" size="icon" onClick={increment}>
                +
              </Button>
            </div>
            <div className="flex justify-center">
              <Button variant="secondary" onClick={reset}>
                Reset Counter
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features Demonstrated</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✅ Global state management with Zustand</li>
              <li>✅ State persistence to localStorage</li>
              <li>✅ DevTools integration for debugging</li>
              <li>✅ Minimal boilerplate</li>
              <li>✅ TypeScript support</li>
              <li>✅ No context providers needed</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Try It Out</CardTitle>
            <CardDescription>
              The counter state persists across page refreshes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              Try incrementing the counter, then refresh the page. The count
              will be preserved thanks to Zustand's persist middleware.
            </p>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Other Components</h3>
              <Input placeholder="Type something..." />
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Default</Button>
                <Button size="sm" variant="secondary">
                  Secondary
                </Button>
                <Button size="sm" variant="outline">
                  Outline
                </Button>
                <Button size="sm" variant="ghost">
                  Ghost
                </Button>
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
