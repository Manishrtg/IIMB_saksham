/*
  # Saksham Government Schools Initiative - Database Schema

  ## Overview
  Creates comprehensive database structure for the Saksham website including schools, 
  projects, donations, partners, events, team members, and media.

  ## New Tables

  ### 1. schools
  - `id` (uuid, primary key)
  - `name` (text) - School name
  - `address` (text) - Full address
  - `district` (text)
  - `taluk` (text)
  - `state` (text)
  - `student_count` (integer)
  - `teacher_count` (integer)
  - `latitude` (decimal)
  - `longitude` (decimal)
  - `project_code` (text, unique) - e.g., SAK-KA-087
  - `status` (text) - pipeline, ongoing, completed
  - `total_cost` (decimal)
  - `amount_raised` (decimal)
  - `work_start_date` (date)
  - `expected_completion_date` (date)
  - `actual_completion_date` (date)
  - `principal_quote` (text)
  - `need_assessment` (text)
  - `ngo_partner_id` (uuid, foreign key)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. cost_items
  - `id` (uuid, primary key)
  - `school_id` (uuid, foreign key)
  - `category` (text) - classrooms, toilets, computers, furniture, paint, etc.
  - `description` (text)
  - `amount` (decimal)
  - `created_at` (timestamptz)

  ### 3. school_photos
  - `id` (uuid, primary key)
  - `school_id` (uuid, foreign key)
  - `photo_url` (text)
  - `caption` (text)
  - `photo_type` (text) - before, during, after
  - `uploaded_at` (timestamptz)

  ### 4. donations
  - `id` (uuid, primary key)
  - `school_id` (uuid, foreign key, nullable)
  - `donor_name` (text)
  - `is_anonymous` (boolean)
  - `amount` (decimal)
  - `donation_type` (text) - specific_school, cause, general
  - `cause_category` (text) - WASH, Digital Lab, Furniture, etc.
  - `donation_date` (timestamptz)
  - `created_at` (timestamptz)

  ### 5. ngo_partners
  - `id` (uuid, primary key)
  - `name` (text)
  - `registration_number` (text)
  - `pan` (text)
  - `areas_of_operation` (text[])
  - `contact_person` (text)
  - `email` (text)
  - `phone` (text)
  - `is_verified` (boolean)
  - `certificate_urls` (text[])
  - `work_photos` (text[])
  - `created_at` (timestamptz)

  ### 6. csr_partners
  - `id` (uuid, primary key)
  - `company_name` (text)
  - `csr_registration_number` (text)
  - `contact_person` (text)
  - `email` (text)
  - `phone` (text)
  - `preferred_states` (text[])
  - `budget_range` (text)
  - `receive_proposals` (boolean)
  - `created_at` (timestamptz)

  ### 7. team_members
  - `id` (uuid, primary key)
  - `name` (text)
  - `role` (text)
  - `bio` (text)
  - `photo_url` (text)
  - `linkedin_url` (text)
  - `category` (text) - leadership, core_team, faculty, field_coordinator
  - `display_order` (integer)
  - `created_at` (timestamptz)

  ### 8. events
  - `id` (uuid, primary key)
  - `title` (text)
  - `description` (text)
  - `event_date` (timestamptz)
  - `location` (text)
  - `event_type` (text) - upcoming, past
  - `created_at` (timestamptz)

  ### 9. media_coverage
  - `id` (uuid, primary key)
  - `title` (text)
  - `publication_name` (text)
  - `publication_logo_url` (text)
  - `article_url` (text)
  - `published_date` (date)
  - `created_at` (timestamptz)

  ### 10. blog_posts
  - `id` (uuid, primary key)
  - `title` (text)
  - `content` (text)
  - `excerpt` (text)
  - `author` (text)
  - `cover_image_url` (text)
  - `published_at` (timestamptz)
  - `created_at` (timestamptz)

  ### 11. contact_submissions
  - `id` (uuid, primary key)
  - `name` (text)
  - `email` (text)
  - `phone` (text)
  - `message` (text)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for most data (schools, donations, team, events, media, blog)
  - Restricted write access for forms (contact, partner registrations)
*/

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  district text NOT NULL,
  taluk text NOT NULL,
  state text NOT NULL DEFAULT 'Karnataka',
  student_count integer DEFAULT 0,
  teacher_count integer DEFAULT 0,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  project_code text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'pipeline',
  total_cost decimal(12, 2) DEFAULT 0,
  amount_raised decimal(12, 2) DEFAULT 0,
  work_start_date date,
  expected_completion_date date,
  actual_completion_date date,
  principal_quote text,
  need_assessment text,
  ngo_partner_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create cost_items table
CREATE TABLE IF NOT EXISTS cost_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid REFERENCES schools(id) ON DELETE CASCADE,
  category text NOT NULL,
  description text,
  amount decimal(12, 2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create school_photos table
CREATE TABLE IF NOT EXISTS school_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid REFERENCES schools(id) ON DELETE CASCADE,
  photo_url text NOT NULL,
  caption text,
  photo_type text NOT NULL,
  uploaded_at timestamptz DEFAULT now()
);

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid REFERENCES schools(id) ON DELETE SET NULL,
  donor_name text,
  is_anonymous boolean DEFAULT false,
  amount decimal(12, 2) NOT NULL,
  donation_type text NOT NULL,
  cause_category text,
  donation_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create ngo_partners table
CREATE TABLE IF NOT EXISTS ngo_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  registration_number text NOT NULL,
  pan text,
  areas_of_operation text[],
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  is_verified boolean DEFAULT false,
  certificate_urls text[],
  work_photos text[],
  created_at timestamptz DEFAULT now()
);

-- Add foreign key for ngo_partner_id
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'schools_ngo_partner_id_fkey'
  ) THEN
    ALTER TABLE schools ADD CONSTRAINT schools_ngo_partner_id_fkey 
    FOREIGN KEY (ngo_partner_id) REFERENCES ngo_partners(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Create csr_partners table
CREATE TABLE IF NOT EXISTS csr_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  csr_registration_number text,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  preferred_states text[],
  budget_range text,
  receive_proposals boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text,
  photo_url text,
  linkedin_url text,
  category text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_date timestamptz NOT NULL,
  location text,
  event_type text NOT NULL DEFAULT 'upcoming',
  created_at timestamptz DEFAULT now()
);

-- Create media_coverage table
CREATE TABLE IF NOT EXISTS media_coverage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  publication_name text NOT NULL,
  publication_logo_url text,
  article_url text,
  published_date date,
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  author text,
  cover_image_url text,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE cost_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ngo_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE csr_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_coverage ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read policies for public data
CREATE POLICY "Public can view schools"
  ON schools FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view cost items"
  ON cost_items FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view school photos"
  ON school_photos FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view donations"
  ON donations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view verified NGO partners"
  ON ngo_partners FOR SELECT
  TO public
  USING (is_verified = true);

CREATE POLICY "Public can view team members"
  ON team_members FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view events"
  ON events FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view media coverage"
  ON media_coverage FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view blog posts"
  ON blog_posts FOR SELECT
  TO public
  USING (true);

-- Insert policies for public forms
CREATE POLICY "Anyone can submit NGO partner registration"
  ON ngo_partners FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can submit CSR partner registration"
  ON csr_partners FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_schools_status ON schools(status);
CREATE INDEX IF NOT EXISTS idx_schools_district ON schools(district);
CREATE INDEX IF NOT EXISTS idx_schools_project_code ON schools(project_code);
CREATE INDEX IF NOT EXISTS idx_cost_items_school ON cost_items(school_id);
CREATE INDEX IF NOT EXISTS idx_school_photos_school ON school_photos(school_id);
CREATE INDEX IF NOT EXISTS idx_donations_school ON donations(school_id);
CREATE INDEX IF NOT EXISTS idx_donations_date ON donations(donation_date DESC);
