import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/query-client";

// Layout
import Layout from "@/components/Layout";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import ExamplesIndex from "@/pages/examples/Index";
import QueryExample from "@/pages/examples/QueryExample";
import StateExample from "@/pages/examples/StateExample";
import SupabaseExample from "@/pages/examples/SupabaseExample";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="examples" element={<ExamplesIndex />} />
            <Route path="examples/query" element={<QueryExample />} />
            <Route path="examples/state" element={<StateExample />} />
            <Route path="examples/supabase" element={<SupabaseExample />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
