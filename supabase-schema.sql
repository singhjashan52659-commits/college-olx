-- Supabase SQL Schema for College OLX

-- 1. Colleges Table
CREATE TABLE IF NOT EXISTS colleges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  domain TEXT,
  badge TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Products / Listings Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  category TEXT NOT NULL,
  condition TEXT NOT NULL,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  college_id TEXT REFERENCES colleges(id) ON DELETE CASCADE,
  college_name TEXT NOT NULL,
  hostel_location TEXT,
  seller_name TEXT NOT NULL,
  seller_contact TEXT NOT NULL,
  seller_email TEXT,
  is_negotiable BOOLEAN DEFAULT TRUE,
  is_sold BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Row Level Security (RLS)
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to colleges
CREATE POLICY "Allow public read on colleges" ON colleges
  FOR SELECT USING (true);

-- Allow public read access to products
CREATE POLICY "Allow public read on products" ON products
  FOR SELECT USING (true);

-- Allow authenticated or public insert on products (can be restricted to logged-in users)
CREATE POLICY "Allow insert on products" ON products
  FOR INSERT WITH CHECK (true);
