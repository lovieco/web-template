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

function App() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Web Template</CardTitle>
          <CardDescription>
            React + Vite + TypeScript + shadcn/ui + Zustand
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Counter Demo (Zustand)</h3>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={decrement}>
                -
              </Button>
              <span className="w-12 text-center text-2xl font-bold">
                {count}
              </span>
              <Button variant="outline" size="icon" onClick={increment}>
                +
              </Button>
              <Button variant="secondary" onClick={reset}>
                Reset
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Input Component</h3>
            <Input placeholder="Type something..." />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Button Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
