// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jqadklytgskfhzgnuals.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxYWRrbHl0Z3NrZmh6Z251YWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NjIxNjYsImV4cCI6MjA1MTMzODE2Nn0.Ly7WMfM6-caIhpdGW-C8o9ypxAv_sb0HSRPj9g772lw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);