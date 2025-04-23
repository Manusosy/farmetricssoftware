-- Create assessment_questions table
CREATE TABLE IF NOT EXISTS assessment_questions (
  id SERIAL PRIMARY KEY,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL, -- e.g., 'stress', 'anxiety', 'general'
  max_points INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create mood_entries table
CREATE TABLE IF NOT EXISTS mood_entries (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  emotion TEXT,
  mood_score INTEGER CHECK (mood_score BETWEEN 1 AND 10),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  assessment_data JSONB DEFAULT '[]'::JSONB
);

-- Create user_assessment_metrics table
CREATE TABLE IF NOT EXISTS user_assessment_metrics (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  stress_level DECIMAL(4,2), -- scaled value (0-10)
  consistency DECIMAL(4,2), -- scaled value (0-10)
  mood_trend TEXT CHECK (mood_trend IN ('improving', 'declining', 'stable')),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create mood_metrics_history table for tracking changes
CREATE TABLE IF NOT EXISTS mood_metrics_history (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stress_level DECIMAL(4,2),
  consistency DECIMAL(4,2),
  mood_trend TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS mood_entries_user_id_idx ON mood_entries(user_id);
CREATE INDEX IF NOT EXISTS mood_entries_created_at_idx ON mood_entries(created_at);
CREATE INDEX IF NOT EXISTS user_metrics_user_id_idx ON user_assessment_metrics(user_id);

-- Create function to update user metrics when new entries are added
CREATE OR REPLACE FUNCTION update_user_metrics()
RETURNS TRIGGER AS $$
BEGIN
  -- Store previous metrics in history table
  INSERT INTO mood_metrics_history (
    user_id, 
    stress_level, 
    consistency,
    mood_trend
  )
  SELECT 
    user_id, 
    stress_level, 
    consistency,
    mood_trend
  FROM user_assessment_metrics
  WHERE user_id = NEW.user_id;

  -- Update or insert new metrics
  INSERT INTO user_assessment_metrics (
    user_id,
    stress_level,
    consistency,
    mood_trend
  )
  VALUES (
    NEW.user_id,
    -- We use NULL here and let application logic handle the calculations
    NULL,
    NULL,
    NULL
  )
  ON CONFLICT (user_id) DO UPDATE SET
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update metrics on new mood entry
CREATE TRIGGER mood_entry_added
AFTER INSERT ON mood_entries
FOR EACH ROW
EXECUTE FUNCTION update_user_metrics();

-- Create view for dashboard to easily access the latest mood data
CREATE OR REPLACE VIEW user_mood_dashboard AS
SELECT 
  u.id as user_id,
  u.email,
  m.stress_level,
  m.consistency,
  m.mood_trend,
  (
    SELECT count(*) 
    FROM mood_entries me 
    WHERE me.user_id = u.id
  ) as total_entries,
  (
    SELECT mood_score 
    FROM mood_entries me 
    WHERE me.user_id = u.id 
    ORDER BY created_at DESC 
    LIMIT 1
  ) as latest_mood_score,
  (
    SELECT emotion 
    FROM mood_entries me 
    WHERE me.user_id = u.id 
    ORDER BY created_at DESC 
    LIMIT 1
  ) as latest_emotion,
  m.updated_at
FROM auth.users u
LEFT JOIN user_assessment_metrics m ON u.id = m.user_id; 