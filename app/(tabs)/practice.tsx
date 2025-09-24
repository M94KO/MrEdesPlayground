import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { BookOpen, Clock, Target, Zap, X, Volume2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { categories } from '@/data/lessons';
import { useProgress } from '@/hooks/use-progress';

export default function PracticeScreen() {
  const router = useRouter();
  const { progress, completePracticeSession } = useProgress();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showVocabulary, setShowVocabulary] = useState<boolean>(false);
  const [showTopicSelection, setShowTopicSelection] = useState<boolean>(false);
  
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  const practiceTypes = [
    {
      id: 'quick',
      title: 'Quick Practice',
      description: '5 minute review session',
      icon: Clock,
      color: '#FF9600',
      duration: '5 min',
    },
    {
      id: 'focused',
      title: 'Focused Practice',
      description: 'Practice specific topics',
      icon: Target,
      color: '#CE82FF',
      duration: '10 min',
    },
    {
      id: 'challenge',
      title: 'Daily Challenge',
      description: 'Test your knowledge',
      icon: Zap,
      color: '#00CD9C',
      duration: '15 min',
    },
  ];

  const handlePracticeStart = (typeId: string) => {
    if (typeId === 'focused') {
      // Show topic selection for focused practice
      setShowTopicSelection(true);
    } else {
      // Mark as practice session started
      completePracticeSession();
      // Navigate to first unlocked lesson for practice
      const firstLesson = categories[0].lessons[0];
      router.push(`/lesson/${firstLesson.id}`);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF00', '#58CC02']}
        style={styles.header}
      >
        <BookOpen size={40} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Practice</Text>
        <Text style={styles.headerSubtitle}>Strengthen your Yoruba skills</Text>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Practice Modes</Text>
          {practiceTypes.map((type) => {
            const Icon = type.icon;
            return (
              <TouchableOpacity
                key={type.id}
                style={styles.practiceCard}
                onPress={() => handlePracticeStart(type.id)}
              >
                <View style={[styles.iconContainer, { backgroundColor: type.color }]}>
                  <Icon size={24} color="#FFFFFF" />
                </View>
                <View style={styles.practiceInfo}>
                  <Text style={styles.practiceTitle}>{type.title}</Text>
                  <Text style={styles.practiceDescription}>{type.description}</Text>
                </View>
                <Text style={styles.duration}>{type.duration}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Practice by Topic</Text>
          <View style={styles.topicsGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.topicCard,
                  selectedCategory === category.id && styles.selectedTopic,
                ]}
                onPress={() => {
                  setSelectedCategory(category.id);
                  setShowVocabulary(true);
                }}
              >
                <Text style={styles.topicIcon}>{category.icon}</Text>
                <Text style={styles.topicName}>{category.name}</Text>
                <Text style={styles.vocabularyCount}>
                  {category.vocabulary.length} words
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{progress.wordsLearned.length}</Text>
              <Text style={styles.statLabel}>Words Learned</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {progress.totalAnswers > 0 ? Math.round((progress.correctAnswers / progress.totalAnswers) * 100) : 0}%
              </Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{progress.practiceSessions}</Text>
              <Text style={styles.statLabel}>Practice Sessions</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <Modal
        visible={showVocabulary}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalCategoryIcon}>
                {selectedCategoryData?.icon}
              </Text>
              <View>
                <Text style={styles.modalTitle}>
                  {selectedCategoryData?.name} Vocabulary
                </Text>
                <Text style={styles.modalSubtitle}>
                  {selectedCategoryData?.vocabulary.length} words to learn
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowVocabulary(false)}
            >
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            style={styles.vocabularyList}
            showsVerticalScrollIndicator={false}
          >
            {selectedCategoryData?.vocabulary.map((word) => (
              <View key={word.id} style={styles.vocabularyCard}>
                <View style={styles.vocabularyContent}>
                  <Text style={styles.yorubaWord}>{word.yoruba}</Text>
                  <Text style={styles.englishWord}>{word.english}</Text>
                  {word.pronunciation && (
                    <Text style={styles.pronunciation}>/{word.pronunciation}/</Text>
                  )}
                </View>
                <TouchableOpacity style={styles.audioButton}>
                  <Volume2 size={20} color="#58CC02" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.practiceButton}
              onPress={() => {
                setShowVocabulary(false);
                completePracticeSession();
                if (selectedCategoryData) {
                  const firstLesson = selectedCategoryData.lessons[0];
                  if (firstLesson) {
                    router.push(`/lesson/${firstLesson.id}`);
                  }
                }
              }}
            >
              <Text style={styles.practiceButtonText}>Practice These Words</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      <Modal
        visible={showTopicSelection}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.modalTitleContainer}>
              <Target size={32} color="#CE82FF" />
              <View style={styles.topicInfo}>
                <Text style={styles.modalTitle}>Choose a Topic</Text>
                <Text style={styles.modalSubtitle}>Select what you want to practice</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowTopicSelection(false)}
            >
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            style={styles.vocabularyList}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.topicsGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.topicCard,
                    { width: '100%', marginBottom: 15 },
                  ]}
                  onPress={() => {
                    setShowTopicSelection(false);
                    completePracticeSession();
                    const firstLesson = category.lessons[0];
                    if (firstLesson) {
                      router.push(`/lesson/${firstLesson.id}`);
                    }
                  }}
                >
                  <View style={styles.topicSelectionContent}>
                    <Text style={styles.topicIcon}>{category.icon}</Text>
                    <View style={styles.topicInfo}>
                      <Text style={styles.topicName}>{category.name}</Text>
                      <Text style={styles.vocabularyCount}>
                        {category.vocabulary.length} words • {category.lessons.length} lessons
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
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
  practiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  practiceInfo: {
    flex: 1,
    marginLeft: 15,
  },
  practiceTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#2E3856',
    marginBottom: 4,
    letterSpacing: 0.1,
  },
  practiceDescription: {
    fontSize: 15,
    color: '#999',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  duration: {
    fontSize: 15,
    color: '#58CC02',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  topicCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTopic: {
    borderColor: '#58CC02',
    backgroundColor: '#F0FFF0',
  },
  topicIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  topicName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2E3856',
    letterSpacing: 0.1,
  },
  statsSection: {
    paddingHorizontal: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 26,
    fontWeight: '800',
    color: '#58CC02',
    marginBottom: 5,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  vocabularyCount: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalCategoryIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2E3856',
    letterSpacing: -0.3,
  },
  modalSubtitle: {
    fontSize: 15,
    color: '#999',
    marginTop: 2,
    fontWeight: '500',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vocabularyList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  vocabularyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vocabularyContent: {
    flex: 1,
  },
  yorubaWord: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E3856',
    marginBottom: 4,
    letterSpacing: 0.1,
  },
  englishWord: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
    fontWeight: '500',
  },
  pronunciation: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    fontWeight: '400',
  },
  audioButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FFF0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  practiceButton: {
    backgroundColor: '#58CC02',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
  },
  practiceButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  topicSelectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  topicInfo: {
    marginLeft: 15,
    flex: 1,
  },
  modalTopicInfo: {
    marginLeft: 15,
  },
});