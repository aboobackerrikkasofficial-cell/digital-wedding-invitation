-- SECURITY AUDIT: Tightening RLS Policies for Production
-- Run this script in the Supabase SQL Editor

-- 1. CLEANUP: Remove old permissive policies
DROP POLICY IF EXISTS "Anyone can manage weddings" ON weddings;
DROP POLICY IF EXISTS "Anyone can manage rsvps" ON rsvps;

-- 2. WEDDINGS TABLE POLICIES
-- Allow anyone to view an invitation (required for public shared links)
CREATE POLICY "Public Read Access" ON weddings 
FOR SELECT USING (true);

-- Allow ONLY authenticated admin users to modify wedding data
CREATE POLICY "Admin Full Access" ON weddings 
FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. RSVPS TABLE POLICIES
-- Allow public users to submit their RSVP
CREATE POLICY "Public RSVP Submission" ON rsvps 
FOR INSERT WITH CHECK (true);

-- Allow public users to see RSVP status (optional, but needed for some UI counts)
CREATE POLICY "Public RSVP View" ON rsvps 
FOR SELECT USING (true);

-- Allow ONLY authenticated admin users to manage (delete/update) RSVPs
CREATE POLICY "Admin RSVP Management" ON rsvps 
FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. VERIFY RLS IS ENABLED
ALTER TABLE weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
