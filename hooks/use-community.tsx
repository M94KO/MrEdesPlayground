import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useProgress } from './use-progress';

interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  rank: number;
  avatar: string;
  streak: number;
  isCurrentUser?: boolean;
  weeklyXP: number;
  totalLessons: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  target: number;
}

interface CommunityData {
  leaderboard: LeaderboardUser[];
  achievements: Achievement[];
  weeklyRankings: LeaderboardUser[];
  friends: LeaderboardUser[];
  lastUpdated: string;
}

const COMMUNITY_STORAGE_KEY = 'yoruba_community_data';
const USER_PROFILE_KEY = 'yoruba_user_profile';

interface UserProfile {
  name: string;
  avatar: string;
  joinedDate: string;
}

const defaultAchievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    progress: 0,
    target: 1,
  },
  {
    id: 'streak-3',
    title: 'Getting Started',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    progress: 0,
    target: 3,
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '⚡',
    progress: 0,
    target: 7,
  },
  {
    id: 'xp-100',
    title: 'Century Club',
    description: 'Earn 100 XP',
    icon: '💯',
    progress: 0,
    target: 100,
  },
  {
    id: 'xp-500',
    title: 'XP Master',
    description: 'Earn 500 XP',
    icon: '🏆',
    progress: 0,
    target: 500,
  },
  {
    id: 'lessons-10',
    title: 'Dedicated Learner',
    description: 'Complete 10 lessons',
    icon: '📚',
    progress: 0,
    target: 10,
  },
  {
    id: 'practice-5',
    title: 'Practice Makes Perfect',
    description: 'Complete 5 practice sessions',
    icon: '🎯',
    progress: 0,
    target: 5,
  },
];

const generateMockUsers = (currentUser: LeaderboardUser): LeaderboardUser[] => {
  const mockUsers = [
    { name: 'Adebayo', avatar: '🧑', baseXP: 2450, weeklyXP: 180, lessons: 25 },
    { name: 'Funke', avatar: '👩', baseXP: 2380, weeklyXP: 165, lessons: 23 },
    { name: 'Oluwaseun', avatar: '👨', baseXP: 2200, weeklyXP: 145, lessons: 21 },
    { name: 'Kemi', avatar: '👩', baseXP: 2150, weeklyXP: 140, lessons: 20 },
    { name: 'Tunde', avatar: '🧑', baseXP: 2000, weeklyXP: 120, lessons: 18 },
    { name: 'Yemi', avatar: '👨', baseXP: 1950, weeklyXP: 115, lessons: 17 },
    { name: 'Bola', avatar: '👩', baseXP: 1900, weeklyXP: 110, lessons: 16 },
    { name: 'Seun', avatar: '🧑', baseXP: 1850, weeklyXP: 105, lessons: 15 },
    { name: 'Folake', avatar: '👩', baseXP: 1800, weeklyXP: 100, lessons: 14 },
    { name: 'Dayo', avatar: '👨', baseXP: 1750, weeklyXP: 95, lessons: 13 },
  ];

  const allUsers = [
    currentUser,
    ...mockUsers.map((user, index) => ({
      id: `user-${index + 2}`,
      name: user.name,
      xp: user.baseXP,
      rank: 0,
      avatar: user.avatar,
      streak: Math.floor(Math.random() * 15) + 1,
      weeklyXP: user.weeklyXP,
      totalLessons: user.lessons,
    }))
  ];

  // Sort by XP and assign ranks
  allUsers.sort((a, b) => b.xp - a.xp);
  allUsers.forEach((user, index) => {
    user.rank = index + 1;
  });

  return allUsers;
};

export const [CommunityProvider, useCommunity] = createContextHook(() => {
  const { progress } = useProgress();
  const [communityData, setCommunityData] = useState<CommunityData>({
    leaderboard: [],
    achievements: defaultAchievements,
    weeklyRankings: [],
    friends: [],
    lastUpdated: new Date().toISOString(),
  });
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'You',
    avatar: '👤',
    joinedDate: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCommunityData();
    loadUserProfile();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      updateLeaderboard();
      updateAchievements();
    }
  }, [progress, isLoading]);

  const loadUserProfile = async () => {
    try {
      const stored = await AsyncStorage.getItem(USER_PROFILE_KEY);
      if (stored) {
        const profile = JSON.parse(stored) as UserProfile;
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const saveUserProfile = async (profile: UserProfile) => {
    try {
      await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
      setUserProfile(profile);
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  const loadCommunityData = async () => {
    try {
      const stored = await AsyncStorage.getItem(COMMUNITY_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored) as CommunityData;
        setCommunityData(data);
      }
    } catch (error) {
      console.error('Error loading community data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCommunityData = async (data: CommunityData) => {
    try {
      await AsyncStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving community data:', error);
    }
  };

  const updateLeaderboard = () => {
    const currentUser: LeaderboardUser = {
      id: 'current-user',
      name: userProfile.name,
      xp: progress.xp,
      rank: 1,
      avatar: userProfile.avatar,
      streak: progress.streak,
      isCurrentUser: true,
      weeklyXP: Math.min(progress.xp, 200), // Simulate weekly XP
      totalLessons: progress.completedLessons.length,
    };

    const updatedLeaderboard = generateMockUsers(currentUser);
    const weeklyRankings = [...updatedLeaderboard].sort((a, b) => b.weeklyXP - a.weeklyXP);
    weeklyRankings.forEach((user, index) => {
      user.rank = index + 1;
    });

    const updatedData = {
      ...communityData,
      leaderboard: updatedLeaderboard,
      weeklyRankings: weeklyRankings,
      lastUpdated: new Date().toISOString(),
    };

    setCommunityData(updatedData);
    saveCommunityData(updatedData);
  };

  const updateAchievements = () => {
    const updatedAchievements = communityData.achievements.map(achievement => {
      let achievementProgress = 0;
      let unlockedAt = achievement.unlockedAt;

      switch (achievement.id) {
        case 'first-lesson':
          achievementProgress = Math.min(progress.completedLessons.length, 1);
          break;
        case 'streak-3':
          achievementProgress = Math.min(progress.streak, 3);
          break;
        case 'streak-7':
          achievementProgress = Math.min(progress.streak, 7);
          break;
        case 'xp-100':
          achievementProgress = Math.min(progress.xp, 100);
          break;
        case 'xp-500':
          achievementProgress = Math.min(progress.xp, 500);
          break;
        case 'lessons-10':
          achievementProgress = Math.min(progress.completedLessons.length, 10);
          break;
        case 'practice-5':
          achievementProgress = Math.min(progress.practiceSessions, 5);
          break;
      }

      // Check if achievement should be unlocked
      if (achievementProgress >= achievement.target && !unlockedAt) {
        unlockedAt = new Date().toISOString();
      }

      return {
        ...achievement,
        progress: achievementProgress,
        unlockedAt,
      };
    });

    const updatedData = {
      ...communityData,
      achievements: updatedAchievements,
    };

    setCommunityData(updatedData);
    saveCommunityData(updatedData);
  };

  const updateUserProfile = (name: string, avatar: string) => {
    const updatedProfile = {
      ...userProfile,
      name,
      avatar,
    };
    saveUserProfile(updatedProfile);
  };

  const getUnlockedAchievements = () => {
    return communityData.achievements.filter(a => a.unlockedAt);
  };

  const getRecentAchievements = () => {
    const recent = communityData.achievements
      .filter(a => a.unlockedAt)
      .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
      .slice(0, 3);
    return recent;
  };

  const getCurrentUserRank = () => {
    const currentUser = communityData.leaderboard.find(u => u.isCurrentUser);
    return currentUser?.rank || 1;
  };

  const getWeeklyRank = () => {
    const currentUser = communityData.weeklyRankings.find(u => u.isCurrentUser);
    return currentUser?.rank || 1;
  };

  return {
    communityData,
    userProfile,
    isLoading,
    updateUserProfile,
    getUnlockedAchievements,
    getRecentAchievements,
    getCurrentUserRank,
    getWeeklyRank,
    updateLeaderboard,
  };
});