import { useState, useEffect, useCallback, useRef } from "react";
import { api, ApiError } from "@/services/api";

interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | Error | null;
}

interface UseFetchOptions {
  immediate?: boolean;
  params?: Record<string, string | number | boolean | undefined>;
}

/**
 * Custom hook for fetching data with loading and error states
 */
export function useFetch<T>(
  endpoint: string,
  options: UseFetchOptions = {}
): UseFetchState<T> & { refetch: () => Promise<void> } {
  const { immediate = true, params } = options;
  const hasFetched = useRef(false);

  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await api.get<T>(endpoint, { params });
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }, [endpoint, params]);

  useEffect(() => {
    if (immediate && !hasFetched.current) {
      hasFetched.current = true;
      void fetchData();
    }
  }, [immediate, fetchData]);

  return { ...state, refetch: fetchData };
}

export default useFetch;
