
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../integrations/supabase/types';

// Use the Supabase client from integrations
import { supabase as supabaseClient } from '../integrations/supabase/client';

// Export the supabase instance for use across the app
export const supabase = supabaseClient;

export type MoodEntry = {
  id?: string;
  user_id: string;
  mood: string;
  note?: string;
  created_at?: string;
};

export type LearningResource = {
  id?: string;
  title: string;
  description: string;
  category: string;
  timeToRead: string;
  content?: string;
  videoUrl?: string;
};
