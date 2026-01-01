import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

/**
 * Example query hook - Fetch data from Supabase
 * Replace with your actual table and data structure
 */
export function useExampleData() {
  return useQuery({
    queryKey: ["example-data"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("your_table_name") // Replace with your table name
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

/**
 * Example query hook with parameters
 */
export function useExampleDataById(id: string) {
  return useQuery({
    queryKey: ["example-data", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("your_table_name") // Replace with your table name
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id, // Only run query if id is provided
  });
}

/**
 * Example mutation hook - Create new data
 */
export function useCreateExample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newData: any) => {
      const { data, error } = await supabase
        .from("your_table_name") // Replace with your table name
        .insert(newData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch queries after successful mutation
      queryClient.invalidateQueries({ queryKey: ["example-data"] });
    },
  });
}

/**
 * Example mutation hook - Update existing data
 */
export function useUpdateExample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { data, error } = await supabase
        .from("your_table_name") // Replace with your table name
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      // Invalidate specific query
      queryClient.invalidateQueries({ queryKey: ["example-data", data.id] });
      // Invalidate list query
      queryClient.invalidateQueries({ queryKey: ["example-data"] });
    },
  });
}

/**
 * Example mutation hook - Delete data
 */
export function useDeleteExample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("your_table_name") // Replace with your table name
        .delete()
        .eq("id", id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      // Invalidate queries after successful deletion
      queryClient.invalidateQueries({ queryKey: ["example-data"] });
    },
  });
}

/**
 * Example query with search/filter
 */
export function useSearchExamples(searchTerm: string) {
  return useQuery({
    queryKey: ["example-data", "search", searchTerm],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("your_table_name") // Replace with your table name
        .select("*")
        .ilike("name", `%${searchTerm}%`) // Replace 'name' with your column
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: searchTerm.length > 0, // Only search if there's a search term
  });
}

/**
 * Example query with pagination
 */
export function usePaginatedExamples(page: number, pageSize: number = 10) {
  return useQuery({
    queryKey: ["example-data", "paginated", page, pageSize],
    queryFn: async () => {
      const from = page * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await supabase
        .from("your_table_name") // Replace with your table name
        .select("*", { count: "exact" })
        .range(from, to)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { data, count };
    },
  });
}
