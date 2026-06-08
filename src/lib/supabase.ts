// src/lib/supabase.ts    ← recommended location (or src/utils/supabase.ts)

import { createClient } from '@supabase/supabase-js';

// Optional: if you later want Realtime, Auth helpers, etc.
import type { Database } from '@/types/supabase';  // ← we'll generate this later

// Get env variables (Vite requires VITE_ prefix)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Better error handling + dev-friendly message
if (!supabaseUrl || !supabaseAnonKey) {
  if (import.meta.env.DEV) {
    console.error(
      'Missing Supabase environment variables!\n' +
      'Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env.local file.'
    );
  }
  throw new Error('Missing Supabase environment variables');
}

// Create the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  // Optional: good defaults for most apps
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  // realtime: { params: { eventsPerSecond: 10 } },  // uncomment if using Realtime
});

// ────────────────────────────────────────────────
// TypeScript types matching your database schema
// (you can later replace these with generated types)
// ────────────────────────────────────────────────

export type School = {
  id: string;
  name: string;
  address: string;
  district: string;
  taluk: string;
  state: string;
  student_count: number;
  teacher_count: number;
  latitude: number | null;
  longitude: number | null;
  project_code: string;
  status: 'pipeline' | 'ongoing' | 'completed';
  total_cost: number;
  amount_raised: number;
  work_start_date: string | null;           // ISO date string or null
  expected_completion_date: string | null;
  actual_completion_date: string | null;
  principal_quote: string | null;
  need_assessment: string | null;
  ngo_partner_id: string | null;
  created_at: string;                       // timestamptz → ISO string
  updated_at: string;
};

export type CostItem = {
  id: string;
  school_id: string;
  category: string;
  description: string | null;
  amount: number;
  created_at: string;
};

export type SchoolPhoto = {
  id: string;
  school_id: string;
  photo_url: string;
  caption: string | null;
  photo_type: 'before' | 'during' | 'after';
  uploaded_at: string;
};

export type Donation = {
  id: string;
  school_id: string | null;
  donor_name: string | null;
  is_anonymous: boolean;
  amount: number;
  donation_type: 'specific_school' | 'cause' | 'general';
  cause_category: string | null;
  donation_date: string;
  created_at: string;
};

export type NgoPartner = {
  id: string;
  name: string;
  registration_number: string;
  pan: string | null;
  areas_of_operation: string[];
  contact_person: string;
  email: string;
  phone: string;
  is_verified: boolean;
  certificate_urls: string[];
  work_photos: string[];
  created_at: string;
};

export type CsrPartner = {
  id: string;
  company_name: string;
  csr_registration_number: string | null;
  contact_person: string;
  email: string;
  phone: string;
  preferred_states: string[];
  budget_range: string | null;
  receive_proposals: boolean;
  created_at: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
  category: 'leadership' | 'core_team' | 'faculty' | 'field_coordinator';
  display_order: number;
  created_at: string;
};

export type Event = {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  event_type: 'upcoming' | 'past';
  created_at: string;
};

export type MediaCoverage = {
  id: string;
  title: string;
  publication_name: string;
  publication_logo_url: string | null;
  article_url: string | null;
  published_date: string | null;
  created_at: string;
};

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  author: string | null;
  cover_image_url: string | null;
  published_at: string;
  created_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
};

// Optional: union type for all main content
export type DatabaseTable =
  | School
  | CostItem
  | SchoolPhoto
  | Donation
  | NgoPartner
  | CsrPartner
  | TeamMember
  | Event
  | MediaCoverage
  | BlogPost;