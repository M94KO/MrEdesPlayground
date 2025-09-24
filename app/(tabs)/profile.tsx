import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { User, Flame, Zap, Trophy, Target, Calendar, Settings, LogOut, ChevronRight, Award, Star, Edit } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useProgress } from '@/hooks/use-progress';
import { useCommunity } from '@/hooks/use-community';
import { useAuth } from '@/hooks/use-auth';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { progress, resetProgress } = useProgress();
  const { communityData, userProfile, getCurrentUserRank, getUnlockedAchievements, getRecentAchievements } = useCommunity();
  const { signOut, user } = useAuth();
  
  const unlockedAchievements = getUnlockedAchievements();
  const recentAchievements = getRecentAchievements();
  const currentRank = getCurrentUserRank();

  const handleReset = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all your progress? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => resetProgress(),
        },
      ]
    );
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => signOut(),
        },
      ]
    );
  };

  const displayAchievements = communityData.achievements.slice(0, 4);

  const accuracy = progress.totalAnswers > 0 ? Math.round((progress.correctAnswers / progress.totalAnswers) * 100) : 0;
  
  const stats = [
    { label: 'Total XP', value: progress.xp, icon: Zap, color: '#FFD700' },
    { label: 'Current Streak', value: `${progress.streak} days`, icon: Flame, color: '#FF9600' },
    { label: 'Lessons Completed', value: progress.completedLessons.length, icon: Target, color: '#58CC02' },
    { label: 'Days Learning', value: progress.streak || 1, icon: Calendar, color: '#CE82FF' },
  ];
  
  const progressStats = [
    { label: 'Words Learned', value: progress.wordsLearned.length, color: '#58CC02' },
    { label: 'Accuracy', value: `${accuracy}%`, color: '#FF9600' },
    { label: 'Practice Sessions', value: progress.practiceSessions, color: '#CE82FF' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#CE82FF', '#9B59B6']}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <TouchableOpacity 
            style={styles.avatarContainer}
            onPress={() => router.push('/profile-edit')}
          >
            <Text style={styles.avatarEmoji}>{userProfile.avatar}</Text>
            <View style={styles.editBadge}>
              <Edit size={12} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <Text style={styles.userName}>{user?.fullName || userProfile.name}</Text>
          <Text style={styles.userLevel}>Rank #{currentRank} • {unlockedAchievements.length} achievements</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsGrid}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <View key={stat.label} style={styles.statCard}>
                <Icon size={24} color={stat.color} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.progressGrid}>
            {progressStats.map((stat) => (
              <View key={stat.label} style={styles.progressCard}>
                <Text style={[styles.progressValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.progressLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <Text style={styles.achievementCount}>{unlockedAchievements.length}/{communityData.achievements.length}</Text>
          </View>
          <View style={styles.achievementsGrid}>
            {displayAchievements.map((achievement) => (
              <View
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  !achievement.unlockedAt && styles.lockedAchievement,
                ]}
              >
                <Text style={styles.achievementIcon}>
                  {achievement.unlockedAt ? achievement.icon : '🔒'}
                </Text>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
                {achievement.unlockedAt && (
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '100%' }]} />
                  </View>
                )}
                {!achievement.unlockedAt && (
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${(achievement.progress / achievement.target) * 100}%` }]} />
                    <Text style={styles.progressText}>{achievement.progress}/{achievement.target}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity 
            style={styles.settingRow}
            onPress={() => router.push('/preferences')}
          >
            <Settings size={20} color="#666" />
            <Text style={styles.settingText}>Preferences</Text>
            <ChevronRight size={16} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow} onPress={handleReset}>
            <Trophy size={20} color="#FF4458" />
            <Text style={[styles.settingText, { color: '#FF4458' }]}>
              Reset Progress
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow} onPress={handleSignOut}>
            <LogOut size={20} color="#FF4458" />
            <Text style={[styles.settingText, { color: '#FF4458' }]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  editBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#58CC02',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 5,
    letterSpacing: -0.3,
  },
  userLevel: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2E3856',
    marginTop: 8,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 13,
    color: '#999',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2E3856',
    marginBottom: 15,
    letterSpacing: -0.3,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  achievementCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  lockedAchievement: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2E3856',
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  achievementDescription: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    gap: 15,
  },
  settingText: {
    fontSize: 17,
    color: '#2E3856',
    flex: 1,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  progressGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  progressCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  progressValue: {
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  progressLabel: {
    fontSize: 13,
    color: '#999',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  avatarEmoji: {
    fontSize: 50,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  achievementCount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#58CC02',
    backgroundColor: 'rgba(88, 204, 2, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    marginTop: 8,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#58CC02',
    borderRadius: 2,
  },
  progressText: {
    position: 'absolute',
    top: -20,
    right: 0,
    fontSize: 10,
    color: '#999',
    fontWeight: '600',
  },
});