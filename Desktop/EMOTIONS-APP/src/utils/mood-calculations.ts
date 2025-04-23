import { MoodEntry, AssessmentResponse } from '../services/moodService';

// Map emotions to base scores
const emotionScores: Record<string, number> = {
  'happy': 8,
  'joyful': 9,
  'content': 7,
  'calm': 6,
  'neutral': 5,
  'tired': 4,
  'sad': 3,
  'anxious': 2,
  'angry': 1
};

/**
 * Calculate a mood score based on emotion and assessment data
 * @param emotion User selected emotion
 * @param assessmentScore Average assessment score (0-10)
 * @returns Combined mood score (0-10)
 */
export function getMoodScore(emotion: string, assessmentScore: number): number {
  const baseScore = emotionScores[emotion.toLowerCase()] || 5; // default to neutral
  
  // Combine base emotion score with assessment score
  const combinedScore = (baseScore * 0.6) + (assessmentScore * 0.4);
  
  // Ensure score is between 0-10
  return Math.max(0, Math.min(10, combinedScore));
}

/**
 * Calculate user stress level based on assessment responses
 * @param assessmentData Collection of assessment responses
 * @returns Stress level score (0-10)
 */
export function calculateStressLevel(assessmentData: AssessmentResponse[]): number {
  // Filter for stress-related questions (assuming question types are tagged)
  const stressResponses = assessmentData.filter(response => 
    response.question_type === 'stress' || 
    response.question_type === 'anxiety'
  );
  
  if (stressResponses.length === 0) {
    return 0; // Return 0 to indicate no data available
  }
  
  // Calculate average of stress-related scores
  const totalScore = stressResponses.reduce((sum, response) => sum + response.score, 0);
  const averageScore = totalScore / stressResponses.length;
  
  // Convert to 0-10 scale
  // Map the average score to stress level (higher score = higher stress)
  // Assuming scores range from 1-5, normalize to 0-10 scale
  const normalizedScore = (averageScore / 5) * 10;
  
  return Math.max(0, Math.min(10, normalizedScore));
}

/**
 * Calculate user's mood consistency over time
 * @param entries Array of mood entries
 * @returns Consistency score (0-10) where higher is more consistent
 */
export function calculateConsistency(entries: MoodEntry[]): number {
  if (entries.length < 3) {
    return 0; // Not enough data for meaningful calculation
  }
  
  // Calculate daily entry rate (entries per day) over the past 30 days
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  // Filter entries from the last 30 days
  const recentEntries = entries.filter(entry => {
    const entryDate = new Date(entry.created_at || '');
    return entryDate >= thirtyDaysAgo;
  });
  
  if (recentEntries.length === 0) {
    return 0; // No recent entries
  }
  
  // Calculate consistency based on standard deviation of time between entries
  // Lower standard deviation means more consistent entry timing
  
  // Get unique dates of entries (one entry per day max for consistency calculation)
  const uniqueDates = new Set();
  recentEntries.forEach(entry => {
    const date = new Date(entry.created_at || '');
    uniqueDates.add(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
  });
  
  // Calculate consistency as percentage of days with entries
  const daysWithEntries = uniqueDates.size;
  const totalDays = 30;
  
  // Convert to 0-10 scale
  const consistency = (daysWithEntries / totalDays) * 10;
  
  return Math.max(0, Math.min(10, consistency));
}

/**
 * Calculate mood trend based on recent entries
 * @param entries Array of mood entries in chronological order (newest first)
 * @returns Trend direction: 'improving', 'declining', or 'stable'
 */
export function calculateMoodTrend(entries: MoodEntry[]): 'improving' | 'declining' | 'stable' {
  if (entries.length < 5) {
    return 'stable'; // Not enough data
  }
  
  // Reverse to get chronological order (oldest first)
  const chronological = [...entries].reverse();
  
  // Get weekly averages to smooth out daily fluctuations
  const weeklyAverages: number[] = [];
  let currentWeek: number[] = [];
  let currentWeekNumber = -1;
  
  chronological.forEach(entry => {
    const date = new Date(entry.created_at || '');
    const weekNumber = getWeekNumber(date);
    
    if (currentWeekNumber === -1) {
      currentWeekNumber = weekNumber;
    }
    
    if (weekNumber !== currentWeekNumber) {
      // New week, calculate average for previous week
      if (currentWeek.length > 0) {
        const weekAvg = currentWeek.reduce((sum, score) => sum + score, 0) / currentWeek.length;
        weeklyAverages.push(weekAvg);
      }
      currentWeek = [entry.mood_score];
      currentWeekNumber = weekNumber;
    } else {
      currentWeek.push(entry.mood_score);
    }
  });
  
  // Add the last week
  if (currentWeek.length > 0) {
    const weekAvg = currentWeek.reduce((sum, score) => sum + score, 0) / currentWeek.length;
    weeklyAverages.push(weekAvg);
  }
  
  // Need at least 2 weekly averages to calculate trend
  if (weeklyAverages.length < 2) {
    return 'stable';
  }
  
  // Calculate trend using linear regression slope
  const slope = calculateSlope(weeklyAverages);
  
  // Determine trend direction based on slope
  if (Math.abs(slope) < 0.2) {
    return 'stable';
  } else if (slope > 0) {
    return 'improving';
  } else {
    return 'declining';
  }
}

/**
 * Helper function to calculate slope of a trend line
 */
function calculateSlope(values: number[]): number {
  const n = values.length;
  
  // Generate x values (0, 1, 2, ..., n-1)
  const x = Array.from({ length: n }, (_, i) => i);
  
  // Calculate means
  const meanX = x.reduce((sum, val) => sum + val, 0) / n;
  const meanY = values.reduce((sum, val) => sum + val, 0) / n;
  
  // Calculate slope
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < n; i++) {
    numerator += (x[i] - meanX) * (values[i] - meanY);
    denominator += Math.pow(x[i] - meanX, 2);
  }
  
  return denominator !== 0 ? numerator / denominator : 0;
}

/**
 * Helper function to get week number of the year
 */
function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
} 