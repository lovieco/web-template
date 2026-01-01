import { createFileRoute, Link } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/examples/virtual")({
  component: VirtualExampleComponent,
});

// Generate large dataset
const generateItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `This is the description for item ${i + 1}. It contains some sample text to demonstrate virtualization.`,
    timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }));

function VirtualExampleComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">TanStack Virtual Example</h1>
        <p className="text-muted-foreground text-xl">
          Efficiently render large lists with virtual scrolling
        </p>
      </div>

      <div className="mb-6 grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Virtual List (10,000 Items)</CardTitle>
            <CardDescription>
              Only visible items are rendered for optimal performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VirtualList items={generateItems(10000)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold">Without Virtualization</h3>
                <p className="text-sm text-muted-foreground">
                  Rendering 10,000 DOM elements would cause significant
                  performance issues, slow scrolling, and high memory usage.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">With Virtualization</h3>
                <p className="text-sm text-muted-foreground">
                  Only ~20 items are rendered at any time, regardless of the
                  total list size. Smooth scrolling and minimal memory usage.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features Demonstrated</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✅ Virtual scrolling for large lists</li>
              <li>✅ Dynamic item heights</li>
              <li>✅ Smooth scrolling performance</li>
              <li>✅ Minimal DOM elements</li>
              <li>✅ Low memory footprint</li>
              <li>✅ Works with any list size</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Use Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>📋 Long lists of items (products, users, messages)</li>
              <li>📊 Large data tables</li>
              <li>💬 Chat message history</li>
              <li>📰 News feeds and timelines</li>
              <li>📁 File browsers</li>
              <li>🔍 Search results with many items</li>
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

// Virtual List Component
function VirtualList({
  items,
}: {
  items: Array<{
    id: number;
    title: string;
    description: string;
    timestamp: string;
  }>;
}) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      className="h-[600px] overflow-auto rounded-lg border"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const item = items[virtualItem.index];
          return (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
              className="border-b p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {item.description}
                  </p>
                </div>
                <span className="text-muted-foreground ml-4 text-xs">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
