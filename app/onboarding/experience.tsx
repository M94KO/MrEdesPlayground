import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, BookOpen, Star } from 'lucide-react-native';
import { useAuth } from '@/hooks/use-auth';
import { LoadingSpinner } from '@/src/components/ui';

export default function ExperienceLevelScreen() {
  const { language } = useLocalSearchParams<{ language: 'yoruba' | 'itsekiri' }>();
  const { updateUserPreferences } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<'newbie' | 'familiar' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (selectedLevel && language) {
      setIsLoading(true);
      try {
        await updateUserPreferences(language, selectedLevel);
        router.replace('/(tabs)');
      } catch (error) {
        console.error('Error updating preferences:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const experienceLevels = [
    {
      id: 'newbie' as const,
      name: 'Complete Beginner',
      description: 'I\'m new to this language and want to start from the basics',
      icon: BookOpen,
      color: '#58CC02',
    },
    {
      id: 'familiar' as const,
      name: 'Some Experience',
      description: 'I know some words and phrases, but want to improve',
      icon: Star,
      color: '#FF9500',
    },
  ];

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <LoadingSpinner size="large" />
          <Text style={styles.loadingText}>Setting up your learning path...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#58CC02', '#89E219']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Your Experience Level</Text>
            <Text style={styles.subtitle}>
              How familiar are you with {language === 'yoruba' ? 'Yoruba' : 'Itsekiri'}?
            </Text>
          </View>

          <View style={styles.levelContainer}>
            {experienceLevels.map((level) => {
              const IconComponent = level.icon;
              return (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.levelCard,
                    selectedLevel === level.id && styles.selectedCard,
                  ]}
                  onPress={() => setSelectedLevel(level.id)}
                  testID={`level-${level.id}`}
                >
                  <View style={styles.levelContent}>
                    <View style={[styles.iconContainer, { backgroundColor: level.color }]}>
                      <IconComponent size={24} color="#FFFFFF" />
                    </View>
                    <View style={styles.levelInfo}>
                      <Text style={styles.levelName}>{level.name}</Text>
                      <Text style={styles.levelDescription}>
                        {level.description}
                      </Text>
                    </View>
                    {selectedLevel === level.id && (
                      <View style={styles.checkContainer}>
                        <Check size={24} color="#58CC02" />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedLevel && styles.disabledButton,
            ]}
            onPress={handleContinue}
            disabled={!selectedLevel}
            testID="continue-button"
          >
            <Text
              style={[
                styles.continueButtonText,
                !selectedLevel && styles.disabledButtonText,
              ]}
            >
              Start Learning
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
  },
  levelContainer: {
    flex: 1,
    marginBottom: 32,
  },
  levelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#58CC02',
    backgroundColor: '#F0FFF0',
  },
  levelContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  levelInfo: {
    flex: 1,
  },
  levelName: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#333333',
    marginBottom: 4,
  },
  levelDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },
  checkContainer: {
    marginLeft: 16,
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  continueButtonText: {
    color: '#58CC02',
    fontSize: 18,
    fontWeight: 'bold' as const,
  },
  disabledButtonText: {
    color: 'rgba(88, 204, 2, 0.5)',
  },
});