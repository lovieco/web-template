import { createClient } from "@supabase/supabase-js";

// Environment variables for Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file."
  );
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Database types (example - update based on your schema)
export interface Database {
  public: {
    Tables: {
      // Add your table types here
      // Example:
      // users: {
      //   Row: {
      //     id: string;
      //     email: string;
      //     created_at: string;
      //   };
      //   Insert: {
      //     id?: string;
      //     email: string;
      //     created_at?: string;
      //   };
      //   Update: {
      //     id?: string;
      //     email?: string;
      //     created_at?: string;
      //   };
      // };
    };
  };
}
