import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Trophy, Medal, Award, Calendar, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCommunity } from '@/hooks/use-community';

export default function LeaderboardScreen() {
  const { communityData, isLoading, getCurrentUserRank, getWeeklyRank } = useCommunity();
  const [activeTab, setActiveTab] = useState<'all-time' | 'weekly'>('weekly');
  
  const currentData = activeTab === 'weekly' ? communityData.weeklyRankings : communityData.leaderboard;
  const currentUserRank = activeTab === 'weekly' ? getWeeklyRank() : getCurrentUserRank();
  
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#58CC02" />
          <Text style={styles.loadingText}>Loading leaderboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy size={24} color="#FFD700" />;
      case 2:
        return <Medal size={24} color="#C0C0C0" />;
      case 3:
        return <Award size={24} color="#CD7F32" />;
      default:
        return <Text style={styles.rankNumber}>{rank}</Text>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return '#E5E5E5';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FFD700', '#FFA500']}
        style={styles.header}
      >
        <Trophy size={40} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <Text style={styles.headerSubtitle}>
          Your rank: #{currentUserRank}
        </Text>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'weekly' && styles.activeTab]}
            onPress={() => setActiveTab('weekly')}
          >
            <Calendar size={16} color={activeTab === 'weekly' ? '#FFFFFF' : 'rgba(255,255,255,0.7)'} />
            <Text style={[styles.tabText, activeTab === 'weekly' && styles.activeTabText]}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all-time' && styles.activeTab]}
            onPress={() => setActiveTab('all-time')}
          >
            <Star size={16} color={activeTab === 'all-time' ? '#FFFFFF' : 'rgba(255,255,255,0.7)'} />
            <Text style={[styles.tabText, activeTab === 'all-time' && styles.activeTabText]}>All Time</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.topThree}>
        {currentData.slice(0, 3).map((user, index) => (
          <View
            key={user.id}
            style={[
              styles.topUser,
              index === 0 && styles.firstPlace,
              user.isCurrentUser && styles.currentUserHighlight,
            ]}
          >
            <View style={[styles.avatarContainer, { borderColor: getRankColor(user.rank) }]}>
              <Text style={styles.avatar}>{user.avatar}</Text>
            </View>
            <Text style={[styles.topUserName, user.isCurrentUser && styles.currentUserText]}>
              {user.name}
            </Text>
            <Text style={styles.topUserXP}>
              {activeTab === 'weekly' ? user.weeklyXP : user.xp} XP
            </Text>
            <View style={styles.streakContainer}>
              <Text style={styles.streakText}>🔥 {user.streak}</Text>
            </View>
            {getRankIcon(user.rank)}
          </View>
        ))}
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listContainer}>
          {currentData.slice(3).map((user) => (
            <View 
              key={user.id} 
              style={[
                styles.userRow,
                user.isCurrentUser && styles.currentUserRow,
              ]}
            >
              <View style={styles.rankContainer}>
                {getRankIcon(user.rank)}
              </View>
              <Text style={styles.userAvatar}>{user.avatar}</Text>
              <View style={styles.userInfo}>
                <Text style={[styles.userName, user.isCurrentUser && styles.currentUserText]}>
                  {user.name}
                </Text>
                <Text style={styles.userStreak}>🔥 {user.streak} day streak</Text>
              </View>
              <View style={styles.xpContainer}>
                <Text style={styles.userXP}>
                  {activeTab === 'weekly' ? user.weeklyXP : user.xp} XP
                </Text>
                <Text style={styles.lessonsCount}>{user.totalLessons} lessons</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How it works</Text>
          <Text style={styles.infoText}>
            Complete lessons and practice sessions to earn XP and climb the leaderboard!
          </Text>
          <Text style={styles.infoText}>
            Weekly rankings reset every Sunday at midnight.
          </Text>
          <Text style={styles.infoText}>
            Maintain your streak to stay competitive!
          </Text>
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
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 10,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 5,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  topThree: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  topUser: {
    alignItems: 'center',
    flex: 1,
  },
  firstPlace: {
    marginTop: -10,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  avatar: {
    fontSize: 32,
  },
  topUserName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2E3856',
    marginBottom: 4,
    letterSpacing: 0.1,
  },
  topUserXP: {
    fontSize: 15,
    color: '#999',
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 19,
    fontWeight: '800',
    color: '#999',
    letterSpacing: -0.2,
  },
  userAvatar: {
    fontSize: 24,
    marginHorizontal: 15,
  },
  userName: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: '#2E3856',
    letterSpacing: 0.1,
  },
  userXP: {
    fontSize: 17,
    color: '#58CC02',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  infoSection: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2E3856',
    marginBottom: 10,
    letterSpacing: -0.2,
  },
  infoText: {
    fontSize: 15,
    color: '#999',
    lineHeight: 22,
    marginBottom: 8,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  currentUserHighlight: {
    backgroundColor: 'rgba(88, 204, 2, 0.1)',
    borderWidth: 2,
    borderColor: '#58CC02',
    borderRadius: 15,
    padding: 10,
  },
  currentUserText: {
    color: '#58CC02',
    fontWeight: '800',
  },
  streakContainer: {
    marginBottom: 5,
  },
  streakText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
  },
  currentUserRow: {
    backgroundColor: 'rgba(88, 204, 2, 0.05)',
    borderWidth: 1,
    borderColor: '#58CC02',
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userStreak: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '500',
    marginTop: 2,
  },
  xpContainer: {
    alignItems: 'flex-end',
  },
  lessonsCount: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
    marginTop: 2,
  },
});