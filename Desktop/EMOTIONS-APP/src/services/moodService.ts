import { createClient } from '@supabase/supabase-js';
import { 
  calculateStressLevel, 
  calculateConsistency, 
  getMoodScore, 
  calculateMoodTrend 
} from '../utils/mood-calculations';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface MoodEntry {
  id?: number;
  user_id?: string;
  emotion: string;
  mood_score: number;
  notes?: string;
  created_at?: string;
  assessment_data?: AssessmentResponse[];
}

export interface AssessmentResponse {
  question_id: number;
  question_type: string;
  score: number;
}

export interface UserMetrics {
  stress_level: number;
  consistency: number;
  mood_trend: 'improving' | 'declining' | 'stable';
  total_entries: number;
  latest_mood_score?: number;
  latest_emotion?: string;
}

export const moodService = {
  // Add a new mood entry
  async addMoodEntry(userId: string, entry: MoodEntry): Promise<MoodEntry | null> {
    // Calculate mood score if not provided
    if (!entry.mood_score && entry.emotion && entry.assessment_data) {
      const assessmentScore = entry.assessment_data.reduce((sum, item) => sum + item.score, 0) / 
                            entry.assessment_data.length;
      entry.mood_score = getMoodScore(entry.emotion, assessmentScore);
    }
    
    const { data, error } = await supabase
      .from('mood_entries')
      .insert({
        user_id: userId,
        emotion: entry.emotion,
        mood_score: entry.mood_score,
        notes: entry.notes || '',
        assessment_data: entry.assessment_data || []
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error adding mood entry:', error);
      return null;
    }
    
    // Update user metrics after adding the entry
    await this.updateUserMetrics(userId);
    
    return data;
  },

  // Get all mood entries for a user
  async getUserMoodEntries(userId: string, days: number = 30): Promise<MoodEntry[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching mood entries:', error);
      return [];
    }
    
    return data || [];
  },

  // Update user metrics using our calculation utilities
  async updateUserMetrics(userId: string): Promise<UserMetrics | null> {
    // Get recent entries
    const entries = await this.getUserMoodEntries(userId, 90); // Get last 90 days for analysis
    
    if (entries.length === 0) {
      // If no entries, set metrics to zero to indicate no data
      const { error } = await supabase
        .from('user_assessment_metrics')
        .upsert({
          user_id: userId,
          stress_level: 0,
          consistency: 0,
          mood_trend: 'stable',
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        console.error('Error updating user metrics:', error);
      }
      
      return {
        stress_level: 0,
        consistency: 0,
        mood_trend: 'stable',
        total_entries: 0,
        latest_mood_score: undefined,
        latest_emotion: undefined
      };
    }
    
    // Extract all assessment data for stress level calculation
    const allAssessmentData = entries.flatMap(e => e.assessment_data || []);
    
    // Calculate metrics
    const stressLevel = calculateStressLevel(allAssessmentData);
    const consistency = calculateConsistency(entries);
    const moodTrend = calculateMoodTrend(entries);
    
    // Update metrics in database
    const { error } = await supabase
      .from('user_assessment_metrics')
      .upsert({
        user_id: userId,
        stress_level: stressLevel,
        consistency: consistency,
        mood_trend: moodTrend,
        updated_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Error updating user metrics:', error);
      return null;
    }
    
    return {
      stress_level: stressLevel,
      consistency: consistency,
      mood_trend: moodTrend,
      total_entries: entries.length,
      latest_mood_score: entries[0]?.mood_score,
      latest_emotion: entries[0]?.emotion
    };
  },

  // Get user metrics from database
  async getUserMetrics(userId: string): Promise<UserMetrics | null> {
    const { data, error } = await supabase
      .from('user_mood_dashboard')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error || !data) {
      console.error('Error fetching user metrics:', error);
      return null;
    }
    
    return {
      stress_level: data.stress_level || 0,
      consistency: data.consistency || 0,
      mood_trend: data.mood_trend || 'stable',
      total_entries: data.total_entries || 0,
      latest_mood_score: data.latest_mood_score,
      latest_emotion: data.latest_emotion
    };
  },

  // Get assessment questions
  async getAssessmentQuestions(): Promise<any[]> {
    const { data, error } = await supabase
      .from('assessment_questions')
      .select('*')
      .order('id');
    
    if (error) {
      console.error('Error fetching assessment questions:', error);
      return [];
    }
    
    return data || [];
  },

  // Get mood trends over time
  async getMoodTrends(userId: string, timeframe: number = 90): Promise<any> {
    const entries = await this.getUserMoodEntries(userId, timeframe);
    
    // Group entries by week
    const weeklyData: Record<string, number[]> = {};
    entries.forEach(entry => {
      const date = new Date(entry.created_at || '');
      const weekNumber = getWeekNumber(date);
      const weekKey = `Week ${weekNumber}`;
      
      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = [];
      }
      
      weeklyData[weekKey].push(entry.mood_score);
    });
    
    // Calculate average mood score per week
    const trends = Object.entries(weeklyData).map(([week, scores]) => {
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      return {
        week,
        average_score: parseFloat(average.toFixed(2)),
        entries_count: scores.length
      };
    });
    
    return trends;
  }
};

// Helper function to get week number
function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
} 