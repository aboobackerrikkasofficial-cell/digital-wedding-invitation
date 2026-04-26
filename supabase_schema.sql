-- Table: weddings
CREATE TABLE weddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    bride_name TEXT NOT NULL,
    groom_name TEXT NOT NULL,
    wedding_date TIMESTAMP WITH TIME ZONE NOT NULL,
    islamic_date TEXT,
    venue_name TEXT NOT NULL,
    venue_address TEXT,
    google_maps_url TEXT,
    custom_message TEXT,
    template_id TEXT DEFAULT 'default',
    font_family TEXT DEFAULT 'serif',
    primary_color TEXT DEFAULT '#d4af37',
    bg_color TEXT DEFAULT '#ffffff',
    bg_image_url TEXT,
    music_url TEXT,
    animations_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: rsvps
CREATE TABLE rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wedding_id UUID NOT NULL REFERENCES weddings(id) ON DELETE CASCADE,
    name TEXT,
    guest_count INTEGER DEFAULT 1,
    is_attending BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Policies for weddings: Anyone can read, create, or update (for demo purposes)
CREATE POLICY "Anyone can manage weddings" ON weddings FOR ALL USING (true);

-- Policies for rsvps: Anyone can insert or manage rsvps
CREATE POLICY "Anyone can manage rsvps" ON rsvps FOR ALL USING (true);
