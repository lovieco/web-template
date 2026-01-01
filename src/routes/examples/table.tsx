import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/examples/table")({
  component: TableExampleComponent,
});

// Sample data type
type Person = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  status: "active" | "inactive";
};

// Sample data
const sampleData: Person[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  firstName: ["John", "Jane", "Bob", "Alice", "Charlie"][i % 5],
  lastName: ["Doe", "Smith", "Johnson", "Williams", "Brown"][i % 5],
  age: 20 + (i % 50),
  email: `user${i + 1}@example.com`,
  status: i % 3 === 0 ? "inactive" : "active",
}));

// Column definitions
const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 60,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "age",
    header: "Age",
    size: 80,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const status = info.getValue() as string;
      return (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

function TableExampleComponent() {
  const [data] = useState(() => [...sampleData]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">TanStack Table Example</h1>
        <p className="text-muted-foreground text-xl">
          Powerful data tables with sorting, filtering, and pagination
        </p>
      </div>

      <div className="mb-6 grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Interactive Data Table</CardTitle>
            <CardDescription>
              Click column headers to sort, use search to filter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Global Filter */}
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search all columns..."
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="max-w-sm"
              />
              <span className="text-sm text-muted-foreground">
                {table.getFilteredRowModel().rows.length} results
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full">
                <thead className="bg-muted">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-4 py-3 text-left text-sm font-medium"
                          style={{ width: header.getSize() }}
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              className={
                                header.column.getCanSort()
                                  ? "flex cursor-pointer select-none items-center gap-2"
                                  : ""
                              }
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: " 🔼",
                                desc: " 🔽",
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-t hover:bg-muted/50"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3 text-sm">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  First
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  Last
                </Button>
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
              <li>✅ Column sorting (click headers)</li>
              <li>✅ Global search filtering</li>
              <li>✅ Pagination with page controls</li>
              <li>✅ Custom cell rendering (status badges)</li>
              <li>✅ Responsive table layout</li>
              <li>✅ Type-safe column definitions</li>
              <li>✅ Headless UI (full styling control)</li>
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
