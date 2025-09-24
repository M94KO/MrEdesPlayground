export interface Word {
  id: string;
  yoruba: string;
  english: string;
  pronunciation?: string;
  audio?: string;
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'translation' | 'matching' | 'listening' | 'story';
  question: string;
  correctAnswer: string;
  options?: string[];
  pairs?: { yoruba: string; english: string }[];
  word?: Word;
  explanation?: string;
  story?: {
    text: string;
    blanks: { position: number; answer: string; options: string[] }[];
    comprehensionQuestion: string;
    comprehensionAnswer: string;
    comprehensionOptions: string[];
  };
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: string;
  icon: string;
  color: string;
  unit: number;
  description: string;
  introduction?: {
    title: string;
    content: string;
    examples: {
      yoruba: string;
      english: string;
      pronunciation: string;
    }[];
  };
  exercises: Exercise[];
  xpReward: number;
  isCompleted: boolean;
  isLocked: boolean;
}

export interface UserProgress {
  xp: number;
  streak: number;
  hearts: number;
  completedLessons: string[];
  currentLesson?: string;
  lastActiveDate: string;
  lessonsCompletedToday: string[];
  wordsLearned: string[]; // Array of word IDs that have been encountered
  totalAnswers: number; // Total number of questions answered
  correctAnswers: number; // Total number of correct answers
  practiceSessions: number; // Number of practice sessions completed
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  lessons: Lesson[];
  vocabulary: Word[];
}