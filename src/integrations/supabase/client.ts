// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lzcpwldubvdrvjkzwtva.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6Y3B3bGR1YnZkcnZqa3p3dHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNDI2ODksImV4cCI6MjA1NjcxODY4OX0.P-7E6j2svNsosmYraZ3R5q0pO1sjmK7_OKyntreJeBE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);