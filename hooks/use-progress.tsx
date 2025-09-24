import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { UserProgress } from '@/types/lesson';

const STORAGE_KEY = 'yoruba_user_progress';
const MAX_HEARTS = 5;

export const [ProgressProvider, useProgress] = createContextHook(() => {
  const [progress, setProgress] = useState<UserProgress>({
    xp: 0,
    streak: 0,
    hearts: MAX_HEARTS,
    completedLessons: [],
    lastActiveDate: new Date().toISOString().split('T')[0],
    lessonsCompletedToday: [],
    wordsLearned: [],
    totalAnswers: 0,
    correctAnswers: 0,
    practiceSessions: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        let savedProgress: UserProgress;
        
        // Check if stored data is valid JSON before parsing
        if (typeof stored !== 'string' || stored.trim().length === 0) {
          console.error('Invalid stored data format, resetting');
          await AsyncStorage.removeItem(STORAGE_KEY);
          setIsLoading(false);
          return;
        }
        
        // Check if it starts with valid JSON characters
        const trimmed = stored.trim();
        if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
          console.error('Stored data does not appear to be JSON, resetting:', trimmed.substring(0, 50));
          await AsyncStorage.removeItem(STORAGE_KEY);
          setIsLoading(false);
          return;
        }
        
        try {
          savedProgress = JSON.parse(stored) as UserProgress;
        } catch (parseError) {
          console.error('Error parsing stored progress, resetting:', parseError);
          console.error('Corrupted data:', stored.substring(0, 100));
          // Clear corrupted data and start fresh
          await AsyncStorage.removeItem(STORAGE_KEY);
          setIsLoading(false);
          return;
        }
        
        // Validate the parsed data has required properties
        if (!savedProgress || typeof savedProgress.xp !== 'number' || typeof savedProgress.streak !== 'number') {
          console.error('Invalid progress data structure, resetting');
          await AsyncStorage.removeItem(STORAGE_KEY);
          setIsLoading(false);
          return;
        }
        
        // Ensure new fields exist (for backward compatibility)
        if (!savedProgress.lessonsCompletedToday) {
          savedProgress.lessonsCompletedToday = [];
        }
        if (!savedProgress.wordsLearned) {
          savedProgress.wordsLearned = [];
        }
        if (typeof savedProgress.totalAnswers !== 'number') {
          savedProgress.totalAnswers = 0;
        }
        if (typeof savedProgress.correctAnswers !== 'number') {
          savedProgress.correctAnswers = 0;
        }
        if (typeof savedProgress.practiceSessions !== 'number') {
          savedProgress.practiceSessions = 0;
        }
        
        // Check streak and reset daily lessons if it's a new day
        const today = new Date().toISOString().split('T')[0];
        const lastActive = new Date(savedProgress.lastActiveDate);
        const todayDate = new Date(today);
        const daysDiff = Math.floor((todayDate.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff > 1) {
          // Missed days, reset streak
          savedProgress.streak = 0;
          savedProgress.lessonsCompletedToday = [];
        } else if (daysDiff === 1) {
          // New day, reset daily lessons but keep streak (will be incremented when lesson completed)
          savedProgress.lessonsCompletedToday = [];
        } else if (daysDiff === 0) {
          // Same day, keep existing lessonsCompletedToday
        }
        
        savedProgress.lastActiveDate = today;
        setProgress(savedProgress);
        await saveProgress(savedProgress);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
      // Clear any corrupted data
      try {
        await AsyncStorage.removeItem(STORAGE_KEY);
      } catch (clearError) {
        console.error('Error clearing corrupted data:', clearError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const saveProgress = async (newProgress: UserProgress) => {
    try {
      // Validate the progress object before saving
      if (!newProgress || typeof newProgress !== 'object') {
        console.error('Invalid progress object, cannot save:', newProgress);
        return;
      }
      
      // Ensure required fields exist and are valid
      if (typeof newProgress.xp !== 'number' || typeof newProgress.streak !== 'number') {
        console.error('Progress object missing required numeric fields:', newProgress);
        return;
      }
      
      const jsonString = JSON.stringify(newProgress);
      
      // Verify the JSON string is valid before saving
      if (!jsonString || jsonString.length === 0) {
        console.error('Failed to stringify progress object');
        return;
      }
      
      await AsyncStorage.setItem(STORAGE_KEY, jsonString);
    } catch (error) {
      console.error('Error saving progress:', error);
      // If saving fails, try to clear the corrupted data
      try {
        await AsyncStorage.removeItem(STORAGE_KEY);
        console.log('Cleared corrupted storage after save failure');
      } catch (clearError) {
        console.error('Failed to clear corrupted storage:', clearError);
      }
    }
  };

  const addXP = (amount: number) => {
    const updated = { ...progress, xp: progress.xp + amount };
    setProgress(updated);
    saveProgress(updated);
  };

  const completeLesson = (lessonId: string, xpReward: number) => {
    if (!progress.completedLessons.includes(lessonId)) {
      const today = new Date().toISOString().split('T')[0];
      const lastActive = new Date(progress.lastActiveDate);
      const todayDate = new Date(today);
      const daysDiff = Math.floor((todayDate.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
      
      let newStreak = progress.streak;
      let newLessonsCompletedToday = [...progress.lessonsCompletedToday];
      
      // Check if this is the first lesson completed today
      const hasCompletedLessonToday = progress.lessonsCompletedToday.length > 0;
      
      // Update streak logic
      if (!hasCompletedLessonToday) {
        // First lesson of the day - increment streak
        if (daysDiff === 0 && progress.streak === 0) {
          // Starting streak today
          newStreak = 1;
        } else if (daysDiff === 1 || (daysDiff === 0 && progress.streak === 0)) {
          // Next day or starting streak - increment
          newStreak = progress.streak + 1;
        } else if (daysDiff > 1) {
          // Missed days, reset to 1
          newStreak = 1;
        } else {
          // Same day, already have a streak
          newStreak = progress.streak > 0 ? progress.streak : 1;
        }
      } else {
        // Already completed a lesson today, keep current streak
        newStreak = progress.streak;
      }
      
      // Add lesson to today's completed lessons
      newLessonsCompletedToday.push(lessonId);
      
      const updated = {
        ...progress,
        xp: progress.xp + xpReward,
        streak: newStreak,
        completedLessons: [...progress.completedLessons, lessonId],
        lastActiveDate: today,
        lessonsCompletedToday: newLessonsCompletedToday,
      };
      
      console.log('Lesson completed! Streak updated:', {
        previousStreak: progress.streak,
        newStreak: newStreak,
        daysDiff: daysDiff,
        lastActiveDate: progress.lastActiveDate,
        today: today,
        hasCompletedLessonToday: hasCompletedLessonToday,
        lessonsCompletedToday: newLessonsCompletedToday.length
      });
      
      setProgress(updated);
      saveProgress(updated);
    }
  };

  const loseHeart = () => {
    const updated = { ...progress, hearts: Math.max(0, progress.hearts - 1) };
    setProgress(updated);
    saveProgress(updated);
    return updated.hearts;
  };

  const refillHearts = () => {
    const updated = { ...progress, hearts: MAX_HEARTS };
    setProgress(updated);
    saveProgress(updated);
  };

  const resetProgress = async () => {
    const newProgress: UserProgress = {
      xp: 0,
      streak: 0,
      hearts: MAX_HEARTS,
      completedLessons: [],
      lastActiveDate: new Date().toISOString().split('T')[0],
      lessonsCompletedToday: [],
      wordsLearned: [],
      totalAnswers: 0,
      correctAnswers: 0,
      practiceSessions: 0,
    };
    setProgress(newProgress);
    await saveProgress(newProgress);
  };

  const recordAnswer = (isCorrect: boolean, wordIds: string[] = []) => {
    const newWordsLearned = [...progress.wordsLearned];
    wordIds.forEach(wordId => {
      if (!newWordsLearned.includes(wordId)) {
        newWordsLearned.push(wordId);
      }
    });
    
    const updated = {
      ...progress,
      totalAnswers: progress.totalAnswers + 1,
      correctAnswers: progress.correctAnswers + (isCorrect ? 1 : 0),
      wordsLearned: newWordsLearned,
    };
    
    setProgress(updated);
    saveProgress(updated);
  };
  
  const completePracticeSession = () => {
    const updated = {
      ...progress,
      practiceSessions: progress.practiceSessions + 1,
    };
    
    setProgress(updated);
    saveProgress(updated);
  };

  return {
    progress,
    isLoading,
    addXP,
    completeLesson,
    loseHeart,
    refillHearts,
    resetProgress,
    recordAnswer,
    completePracticeSession,
  };
});