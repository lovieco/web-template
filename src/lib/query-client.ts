import { QueryClient } from "@tanstack/react-query";

/**
 * Configure TanStack Query client with sensible defaults
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: How long data is considered fresh (5 minutes)
      staleTime: 1000 * 60 * 5,
      // Cache time: How long inactive data stays in cache (10 minutes)
      gcTime: 1000 * 60 * 10,
      // Retry failed requests 3 times with exponential backoff
      retry: 3,
      // Don't refetch on window focus in development
      refetchOnWindowFocus: import.meta.env.PROD,
      // Refetch on reconnect
      refetchOnReconnect: true,
      // Refetch on mount if data is stale
      refetchOnMount: true,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
});
