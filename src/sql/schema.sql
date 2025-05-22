
-- Create moods table
CREATE TABLE IF NOT EXISTS moods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood TEXT NOT NULL CHECK (mood IN ('great', 'good', 'okay', 'bad', 'awful')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT user_mood_day UNIQUE (user_id, DATE(created_at))
);

-- Create learning_resources table
CREATE TABLE IF NOT EXISTS learning_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  time_to_read TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up RLS policies
ALTER TABLE moods ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_resources ENABLE ROW LEVEL SECURITY;

-- Create policy for moods
CREATE POLICY "Users can view and modify only their own moods"
  ON moods
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policy for learning_resources (public read access)
CREATE POLICY "Learning resources are publicly viewable"
  ON learning_resources
  FOR SELECT
  USING (true);

-- Create policy for learning_resources (admin-only write access)
CREATE POLICY "Only admins can modify learning resources"
  ON learning_resources
  USING (auth.uid() IN (SELECT user_id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

-- Create admin_users table for role-based access
CREATE TABLE IF NOT EXISTS admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial learning resources
INSERT INTO learning_resources (title, description, category, time_to_read, content)
VALUES 
('Understanding Stress', 'Learn about how stress affects your body and mind', 'stress', '5 min', 'Stress is a natural physical and mental reaction to life experiences. Everyone expresses stress from time to time. Anything from everyday responsibilities like work and family to serious life events such as a new diagnosis, war, or the death of a loved one can trigger stress. For immediate, short-term situations, stress can be beneficial to your health. It can help you cope with potentially serious situations. Your body responds to stress by releasing hormones that increase your heart and breathing rates and ready your muscles to respond. Yet if your stress response doesn't stop firing, and these stress levels stay elevated far longer than is necessary for survival, it can take a toll on your health. Chronic stress can cause a variety of symptoms and affect your overall well-being.'),
('Coping with Trauma', 'Techniques for processing and coping with traumatic events', 'trauma', '8 min', 'Trauma is an emotional response to a terrible event like an accident, rape, or natural disaster. Immediately after the event, shock and denial are typical. Longer term reactions include unpredictable emotions, flashbacks, strained relationships, and even physical symptoms like headaches or nausea. While these feelings are normal, some people have difficulty moving on with their lives. Psychologists can help these individuals find constructive ways of managing their emotions.'),
('Sleep Hygiene', 'Improve your sleep quality with these evidence-based tips', 'sleep', '4 min', 'Sleep hygiene is about having both a bedroom environment and daily routines that promote consistent, uninterrupted sleep. Keeping a stable sleep schedule, making your bedroom comfortable and free of disruptions, following a relaxing pre-bed routine, and building healthy habits during the day can all contribute to ideal sleep hygiene.'),
('Mindfulness Basics', 'Introduction to mindfulness practices for first responders', 'mindfulness', '6 min', 'Mindfulness is the basic human ability to be fully present, aware of where we are and what we're doing, and not overly reactive or overwhelmed by what's going on around us. While mindfulness is something we all naturally possess, it's more readily available to us when we practice on a daily basis. Whenever you bring awareness to what you're directly experiencing via your senses, or to your state of mind via your thoughts and emotions, you're being mindful. And there's growing research showing that when you train your brain to be mindful, you're actually remodeling the physical structure of your brain.'),
('Communication Skills', 'Effective communication during stressful situations', 'skills', '7 min', 'Effective communication is about more than just exchanging information. It's about understanding the emotion and intentions behind the information. As well as being able to clearly convey a message, you need to also listen in a way that gains the full meaning of what's being said and makes the other person feel heard and understood. Especially in high-stress situations, clear communication becomes even more critical. First responders often need to communicate clearly and effectively in emergency situations where emotions are running high.');
