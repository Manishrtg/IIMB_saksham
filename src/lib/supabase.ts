import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type School = {
  id: string;
  name: string;
  address: string;
  district: string;
  taluk: string;
  state: string;
  student_count: number;
  teacher_count: number;
  latitude: number;
  longitude: number;
  project_code: string;
  status: 'pipeline' | 'ongoing' | 'completed';
  total_cost: number;
  amount_raised: number;
  work_start_date: string | null;
  expected_completion_date: string | null;
  actual_completion_date: string | null;
  principal_quote: string | null;
  need_assessment: string | null;
  ngo_partner_id: string | null;
  created_at: string;
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
