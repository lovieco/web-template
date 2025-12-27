import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Custom providers wrapper for testing
 * Add your providers here (e.g., ThemeProvider, QueryClientProvider)
 */
function AllTheProviders({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

/**
 * Custom render function that wraps components with providers
 */
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllTheProviders, ...options }),
  };
}

// Re-export everything from testing-library
export * from "@testing-library/react";

// Override render method
export { customRender as render };
