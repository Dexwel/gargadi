-- Gargadi initial schema. All data seeded by scripts/seed.ts is SIMULATED.
CREATE TABLE IF NOT EXISTS communities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  lga TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  is_simulated BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS risk_zones (
  id SERIAL PRIMARY KEY,
  community_id INT NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK (kind IN ('flood','disease')),
  level TEXT NOT NULL CHECK (level IN ('low','medium','high')),
  name TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  radius_m INT NOT NULL
);

CREATE TABLE IF NOT EXISTS households (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  phone TEXT NOT NULL UNIQUE,
  community_id INT NOT NULL REFERENCES communities(id),
  language TEXT NOT NULL CHECK (language IN ('en','ha','kr')),
  format TEXT NOT NULL CHECK (format IN ('text','audio')),
  channel TEXT NOT NULL CHECK (channel IN ('sms','whatsapp')),
  consent_at TIMESTAMPTZ NOT NULL,
  consent_version TEXT NOT NULL,
  delete_token_hash TEXT NOT NULL,
  is_simulated BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS volunteers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  community_id INT REFERENCES communities(id),
  is_simulated BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS alerts (
  id SERIAL PRIMARY KEY,
  risk_type TEXT NOT NULL CHECK (risk_type IN ('flood','malaria')),
  level TEXT NOT NULL CHECK (level IN ('medium','high')),
  community_id INT REFERENCES communities(id),
  message_override TEXT,
  status TEXT NOT NULL CHECK (status IN ('scheduled','sent','failed')),
  scheduled_for TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  recipients INT NOT NULL DEFAULT 0,
  sender_mode TEXT NOT NULL DEFAULT 'mock',
  is_simulated BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  window_start TIMESTAMPTZ NOT NULL,
  count INT NOT NULL
);
