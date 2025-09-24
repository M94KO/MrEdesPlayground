import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, Flame, Lock, Star, Crown, Sparkles } from 'lucide-react-native';
import { useProgress } from '@/hooks/use-progress';
import { categories } from '@/data/lessons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Ellipse, Rect, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

const WhimsicalForestBackground = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  
  return (
    <Svg width={screenWidth} height={screenHeight * 1.2} viewBox="0 0 1024 1024" style={StyleSheet.absoluteFillObject}>
      <Defs>
        <SvgLinearGradient id="forestGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#8FBC8F" stopOpacity="0.9" />
          <Stop offset="50%" stopColor="#90EE90" stopOpacity="0.8" />
          <Stop offset="100%" stopColor="#98FB98" stopOpacity="0.7" />
        </SvgLinearGradient>
        <SvgLinearGradient id="treeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#228B22" stopOpacity="0.8" />
          <Stop offset="100%" stopColor="#006400" stopOpacity="0.6" />
        </SvgLinearGradient>
      </Defs>
      
      {/* Forest Background */}
      <Rect width="100%" height="100%" fill="url(#forestGradient)" />
      
      {/* Tree Canopy */}
      <Path d="M0,200 Q200,150 400,180 T800,160 L1024,140 L1024,0 L0,0 Z" fill="url(#treeGradient)" opacity="0.7" />
      <Path d="M0,250 Q300,200 600,220 T1024,200 L1024,0 L0,0 Z" fill="url(#treeGradient)" opacity="0.5" />
      
      {/* Tree Trunks */}
      <Rect x="150" y="180" width="20" height="100" fill="#8B4513" opacity="0.6" />
      <Rect x="350" y="200" width="25" height="120" fill="#8B4513" opacity="0.6" />
      <Rect x="650" y="160" width="18" height="90" fill="#8B4513" opacity="0.6" />
      <Rect x="850" y="190" width="22" height="110" fill="#8B4513" opacity="0.6" />
      
      {/* Stepping Stone Path */}
      <Ellipse cx="200" cy="800" rx="40" ry="20" fill="#D2B48C" opacity="0.8" />
      <Ellipse cx="280" cy="750" rx="35" ry="18" fill="#D2B48C" opacity="0.8" />
      <Ellipse cx="360" cy="700" rx="42" ry="22" fill="#D2B48C" opacity="0.8" />
      <Ellipse cx="450" cy="650" rx="38" ry="19" fill="#D2B48C" opacity="0.8" />
      <Ellipse cx="540" cy="600" rx="40" ry="20" fill="#D2B48C" opacity="0.8" />
      <Ellipse cx="630" cy="550" rx="36" ry="18" fill="#D2B48C" opacity="0.8" />
      <Ellipse cx="720" cy="500" rx="41" ry="21" fill="#D2B48C" opacity="0.8" />
      <Ellipse cx="800" cy="450" rx="39" ry="19" fill="#D2B48C" opacity="0.8" />
      
      {/* Mushroom House */}
      <Ellipse cx="700" cy="350" rx="60" ry="40" fill="#FF6347" opacity="0.7" />
      <Rect x="670" y="350" width="60" height="80" fill="#DEB887" opacity="0.7" />
      <Circle cx="690" cy="380" r="8" fill="#8B4513" opacity="0.8" />
      <Rect x="710" y="375" width="15" height="20" fill="#FFD700" opacity="0.6" />
      
      {/* Magical Elements */}
      <Circle cx="300" cy="400" r="3" fill="#FFD700" opacity="0.8" />
      <Circle cx="500" cy="350" r="2" fill="#FFD700" opacity="0.8" />
      <Circle cx="600" cy="420" r="3" fill="#FFD700" opacity="0.8" />
      <Circle cx="750" cy="380" r="2" fill="#FFD700" opacity="0.8" />
      
      {/* Wooden Signs */}
      <Rect x="100" y="300" width="80" height="50" rx="5" fill="#8B4513" opacity="0.6" />
      <Rect x="800" y="320" width="80" height="50" rx="5" fill="#8B4513" opacity="0.6" />
      
      {/* Small Creatures */}
      <Circle cx="250" cy="780" r="8" fill="#90EE90" opacity="0.7" />
      <Circle cx="450" cy="630" r="6" fill="#87CEEB" opacity="0.7" />
      <Circle cx="650" cy="530" r="7" fill="#90EE90" opacity="0.7" />
    </Svg>
  );
};

export default function LearnScreen() {
  const router = useRouter();
  const { progress } = useProgress();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handleLessonPress = (lessonId: string, isLocked: boolean) => {
    if (isLocked) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }
    router.push(`/lesson/${lessonId}`);
  };

  const isLessonUnlocked = (lessonId: string, categoryIndex: number, lessonIndex: number) => {
    if (categoryIndex === 0 && lessonIndex === 0) return true;
    
    const allLessons = categories.flatMap(c => c.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === lessonId);
    
    if (currentIndex > 0) {
      const previousLesson = allLessons[currentIndex - 1];
      return progress.completedLessons.includes(previousLesson.id);
    }
    
    return false;
  };

  return (
    <View style={styles.container}>
      <WhimsicalForestBackground />
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient
          colors={['rgba(255, 107, 157, 0.95)', 'rgba(196, 69, 105, 0.95)', 'rgba(248, 181, 0, 0.95)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
        <View style={styles.headerContent}>
          <View style={styles.mascotContainer}>
            <View style={styles.mascotCircle}>
              <Text style={styles.mascotEmoji}>🐵</Text>
              <View style={styles.hatContainer}>
                <Text style={styles.hatEmoji}>🎩</Text>
                <View style={styles.leafDecoration}>
                  <Text style={styles.leafEmoji}>🌿</Text>
                  <Text style={styles.flowerEmoji}>🌸</Text>
                </View>
              </View>
            </View>
            <Text style={styles.mascotName}>Mr. Ede</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={[styles.stat, styles.streakStat]}>
              <Flame size={18} color="#FF4500" />
              <Text style={styles.statText}>{progress.streak}</Text>
              <Sparkles size={12} color="#FFD700" style={styles.sparkle} />
            </View>
            <View style={[styles.stat, styles.xpStat]}>
              <Star size={18} color="#FFD700" fill="#FFD700" />
              <Text style={styles.statText}>{progress.xp}</Text>
            </View>
            <View style={[styles.stat, styles.heartStat]}>
              <Heart size={18} color="#FF69B4" fill="#FF69B4" />
              <Text style={styles.statText}>{progress.hearts}</Text>
            </View>
          </View>
          
          <Text style={styles.headerTitle}>🌟 Learn Yoruba with Mr. Ede! 🌟</Text>
          <Text style={styles.headerSubtitle}>&ldquo;Káàbọ̀! Welcome to my whimsical world of learning!&rdquo;</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((category, categoryIndex) => (
          <View key={category.id} style={styles.category}>
            <View style={styles.categoryHeader}>
              <LinearGradient
                colors={['#FFE5F1', '#FFF0F8']}
                style={styles.categoryHeaderGradient}
              >
                <View style={styles.categoryIconContainer}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <View style={styles.categorySparkles}>
                    <Sparkles size={16} color="#FF6B9D" />
                    <Sparkles size={12} color="#C44569" />
                  </View>
                </View>
                <Text style={styles.categoryTitle}>{category.name}</Text>
                <Text style={styles.categorySubtitle}>&ldquo;Let&apos;s explore together!&rdquo; - Mr. Ede</Text>
              </LinearGradient>
            </View>
            
            <View style={styles.lessonsContainer}>
              {category.lessons.map((lesson, lessonIndex) => {
                const isUnlocked = isLessonUnlocked(lesson.id, categoryIndex, lessonIndex);
                const isCompleted = progress.completedLessons.includes(lesson.id);
                
                return (
                  <Animated.View
                    key={lesson.id}
                    style={[
                      styles.lessonWrapper,
                      lessonIndex % 2 === 1 && styles.lessonWrapperOffset,
                      !isUnlocked && { transform: [{ scale: scaleAnim }] },
                    ]}
                  >
                    <View style={styles.lessonPath}>
                      <View style={[styles.pathDot, { backgroundColor: isUnlocked ? '#FF6B9D' : '#E5E5E5' }]} />
                      {lessonIndex < category.lessons.length - 1 && (
                        <View style={[styles.pathLine, { backgroundColor: isUnlocked ? '#FFB6C1' : '#E5E5E5' }]} />
                      )}
                    </View>
                    
                    <TouchableOpacity
                      style={[
                        styles.lesson,
                        { backgroundColor: isUnlocked ? lesson.color : '#F0F0F0' },
                        isCompleted && styles.lessonCompleted,
                        !isUnlocked && styles.lessonLocked,
                      ]}
                      onPress={() => handleLessonPress(lesson.id, !isUnlocked)}
                      activeOpacity={isUnlocked ? 0.8 : 1}
                    >
                      {!isUnlocked ? (
                        <>
                          <Lock size={28} color="#999" />
                          <View style={styles.lockSparkles}>
                            <Sparkles size={10} color="#DDD" />
                          </View>
                        </>
                      ) : (
                        <>
                          <Text style={styles.lessonIcon}>{lesson.icon}</Text>
                          {isCompleted && (
                            <View style={styles.checkmark}>
                              <Crown size={16} color="#FFD700" fill="#FFD700" />
                              <View style={styles.completionSparkles}>
                                <Sparkles size={8} color="#FFD700" />
                                <Sparkles size={6} color="#FFA500" />
                              </View>
                            </View>
                          )}
                          <View style={styles.lessonGlow} />
                        </>
                      )}
                    </TouchableOpacity>
                    
                    <View style={styles.lessonInfo}>
                      <Text style={styles.lessonTitle}>{lesson.title}</Text>
                      <View style={styles.lessonXPContainer}>
                        <Star size={12} color="#FFD700" fill="#FFD700" />
                        <Text style={styles.lessonXP}>+{lesson.xpReward} XP</Text>
                      </View>
                    </View>
                  </Animated.View>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8FBC8F',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  headerContent: {
    alignItems: 'center',
  },
  mascotContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mascotCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  mascotEmoji: {
    fontSize: 40,
  },
  hatContainer: {
    position: 'absolute',
    top: -15,
    alignItems: 'center',
  },
  hatEmoji: {
    fontSize: 24,
  },
  leafDecoration: {
    position: 'absolute',
    top: -5,
    flexDirection: 'row',
    gap: 2,
  },
  leafEmoji: {
    fontSize: 12,
  },
  flowerEmoji: {
    fontSize: 10,
  },
  mascotName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 25,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 25,
    gap: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    position: 'relative',
  },
  streakStat: {
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  xpStat: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  heartStat: {
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  sparkle: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  statText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.5,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '600',
    letterSpacing: 0.3,
    textAlign: 'center',
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  category: {
    marginBottom: 50,
  },
  categoryHeader: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  categoryHeaderGradient: {
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  categoryIconContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categorySparkles: {
    position: 'absolute',
    top: -8,
    right: -8,
    flexDirection: 'row',
    gap: 4,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#2E3856',
    letterSpacing: -0.3,
    textAlign: 'center',
    marginBottom: 5,
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    fontWeight: '500',
    textAlign: 'center',
  },
  lessonsContainer: {
    paddingHorizontal: 30,
    position: 'relative',
  },
  lessonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
    position: 'relative',
    zIndex: 10,
  },
  lessonWrapperOffset: {
    marginLeft: 50,
  },
  lessonPath: {
    alignItems: 'center',
    marginRight: 20,
  },
  pathDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 5,
  },
  pathLine: {
    width: 3,
    height: 30,
    borderRadius: 2,
  },
  lesson: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
    borderWidth: 5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  lessonLocked: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
  },
  lessonCompleted: {
    borderWidth: 4,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOpacity: 0.4,
  },
  lessonGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    top: -10,
    left: -10,
    zIndex: -1,
  },
  lessonIcon: {
    fontSize: 45,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  lockSparkles: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  lessonInfo: {
    flex: 1,
    marginLeft: 15,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E3856',
    letterSpacing: 0.2,
    marginBottom: 5,
  },
  lessonXPContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lessonXP: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  checkmark: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FFD700',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  completionSparkles: {
    position: 'absolute',
    top: -5,
    right: -5,
    flexDirection: 'row',
    gap: 2,
  },
});