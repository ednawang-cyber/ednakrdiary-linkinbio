import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Server-side client for admin operations
export const supabaseAdmin = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
};

// Database types
export interface Course {
  id: string;
  name: string;
  day: string;
  level: string;
  time: string;
  availableSpots: number;
  description: string;
  registrationLink: string;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  created_at: string;
  updated_at: string;
}
