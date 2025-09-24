import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Modal,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { X, Heart, Volume2, Star, Sparkles, Crown } from 'lucide-react-native';
import { useProgress } from '@/hooks/use-progress';
import { getAllLessons } from '@/data/lessons';
import { Exercise } from '@/types/lesson';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { progress, completeLesson, loseHeart, recordAnswer } = useProgress();
  const { width: screenWidth } = useWindowDimensions();
  
  const lesson = getAllLessons().find(l => l.id === id);
  const [showIntroduction, setShowIntroduction] = useState(!!lesson?.introduction);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<{ [key: string]: string }>({});
  const [selectedYoruba, setSelectedYoruba] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [shuffledEnglishWords, setShuffledEnglishWords] = useState<string[]>([]);
  const [storyBlanks, setStoryBlanks] = useState<{ [key: number]: string }>({});
  const [showComprehension, setShowComprehension] = useState(false);
  const [comprehensionAnswer, setComprehensionAnswer] = useState<string | null>(null);
  
  const progressAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (lesson && !showIntroduction) {
      Animated.timing(progressAnim, {
        toValue: (currentExerciseIndex / lesson.exercises.length) * 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [currentExerciseIndex, lesson, progressAnim, showIntroduction]);

  // Check if all story blanks are completed
  useEffect(() => {
    if (lesson && currentExerciseIndex < lesson.exercises.length) {
      const exercise = lesson.exercises[currentExerciseIndex];
      if (exercise.type === 'story' && exercise.story) {
        const allBlanksCompleted = exercise.story.blanks.every(blank => storyBlanks[blank.position]);
        if (allBlanksCompleted && !showComprehension) {
          setShowComprehension(true);
        }
      }
    }
  }, [storyBlanks, lesson, currentExerciseIndex, showComprehension]);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Lesson not found</Text>
      </SafeAreaView>
    );
  }

  const currentExercise = lesson.exercises[currentExerciseIndex];

  const startExercises = () => {
    setShowIntroduction(false);
  };

  const renderIntroduction = () => {
    if (!lesson?.introduction) return null;

    return (
      <View style={styles.introductionContainer}>
        <Text style={styles.introductionTitle}>{lesson.introduction.title}</Text>
        <ScrollView 
          style={styles.introductionContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.introductionContentContainer}
        >
          <Text style={styles.introductionText}>{lesson.introduction.content}</Text>
          
          {lesson.introduction.examples.length > 0 && (
            <View style={styles.examplesContainer}>
              <Text style={styles.examplesTitle}>Examples:</Text>
              {lesson.introduction.examples.map((example, index) => (
                <View key={index} style={styles.exampleItem}>
                  <Text style={styles.exampleYoruba}>{example.yoruba}</Text>
                  <Text style={styles.exampleEnglish}>{example.english}</Text>
                  <Text style={styles.examplePronunciation}>/{example.pronunciation}/</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
        
        <TouchableOpacity style={styles.startButton} onPress={startExercises}>
          <LinearGradient
            colors={['#FF6B9D', '#C44569']}
            style={styles.startButtonGradient}
          >
            <Text style={styles.startButtonText}>Start Lesson</Text>
            <Star size={16} color="#FFFFFF" fill="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    checkAnswer(answer);
  };

  const handleMatchingSelect = (yoruba: string, english: string) => {
    if (selectedYoruba === null) {
      setSelectedYoruba(yoruba);
    } else {
      const pairs = currentExercise.pairs || [];
      const correctPair = pairs.find(p => p.yoruba === selectedYoruba);
      
      if (correctPair && correctPair.english === english) {
        setMatchedPairs({ ...matchedPairs, [selectedYoruba]: english });
        if (Platform.OS !== 'web') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        
        // Record correct match
        recordAnswer(true, []);
        
        if (Object.keys(matchedPairs).length + 1 === pairs.length) {
          setIsCorrect(true);
          setShowResult(true);
        }
      } else {
        if (Platform.OS !== 'web') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
        // Record incorrect match
        recordAnswer(false, []);
        shakeAnimation();
      }
      setSelectedYoruba(null);
    }
  };

  const checkAnswer = (answer: string) => {
    const correct = answer === currentExercise.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    // Record the answer and track words learned
    const wordIds: string[] = [];
    if (currentExercise.word?.id) {
      wordIds.push(currentExercise.word.id);
    }
    if (currentExercise.pairs) {
      // For matching exercises, we don't have word IDs in the pairs, so we'll skip this
      // In a real app, you'd want to have word IDs in the pairs
    }
    recordAnswer(correct, wordIds);
    
    if (correct) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
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
    } else {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      shakeAnimation();
      const remainingHearts = loseHeart();
      if (remainingHearts === 0) {
        router.back();
      }
    }
  };

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const nextExercise = () => {
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowResult(false);
      setMatchedPairs({});
      setSelectedYoruba(null);
      setUserInput('');
      setShuffledEnglishWords([]);
      setStoryBlanks({});
      setShowComprehension(false);
      setComprehensionAnswer(null);
    } else {
      completeLesson(lesson.id, lesson.xpReward);
      setLessonComplete(true);
    }
  };

  const renderExercise = () => {
    switch (currentExercise.type) {
      case 'multiple-choice':
        return (
          <View style={styles.exerciseContent}>
            <Text style={styles.question}>{currentExercise.question}</Text>
            {currentExercise.word?.pronunciation && (
              <Text style={styles.pronunciation}>
                ({currentExercise.word.pronunciation})
              </Text>
            )}
            <View style={styles.optionsContainer}>
              {currentExercise.options?.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    selectedAnswer === option && isCorrect === true && styles.correctOption,
                    selectedAnswer === option && isCorrect === false && styles.incorrectOption,
                  ]}
                  onPress={() => handleAnswer(option)}
                  disabled={showResult}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'translation':
        return (
          <View style={styles.exerciseContent}>
            <Text style={styles.question}>{currentExercise.question}</Text>
            <View style={styles.translationContainer}>
              <TouchableOpacity
                style={styles.speakButton}
                onPress={() => console.log('Play audio')}
              >
                <Volume2 size={24} color="#58CC02" />
              </TouchableOpacity>
              <Text style={styles.wordToTranslate}>
                {currentExercise.word?.english || currentExercise.question.replace('Translate: ', '')}
              </Text>
            </View>
            <Text style={styles.translationHint}>
              Tap the correct Yoruba translation:
            </Text>
            <View style={styles.optionsContainer}>
              {currentExercise.options?.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    selectedAnswer === option && isCorrect === true && styles.correctOption,
                    selectedAnswer === option && isCorrect === false && styles.incorrectOption,
                  ]}
                  onPress={() => handleAnswer(option)}
                  disabled={showResult}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              )) || [
                <TouchableOpacity
                  key={currentExercise.correctAnswer}
                  style={[
                    styles.optionButton,
                    selectedAnswer === currentExercise.correctAnswer && isCorrect === true && styles.correctOption,
                    selectedAnswer === currentExercise.correctAnswer && isCorrect === false && styles.incorrectOption,
                  ]}
                  onPress={() => handleAnswer(currentExercise.correctAnswer)}
                  disabled={showResult}
                >
                  <Text style={styles.optionText}>{currentExercise.correctAnswer}</Text>
                </TouchableOpacity>
              ]}
            </View>
          </View>
        );

      case 'matching':
        const pairs = currentExercise.pairs || [];
        const yorubaWords = pairs.map(p => p.yoruba);
        
        // Initialize shuffled English words only once per exercise
        if (shuffledEnglishWords.length === 0) {
          const englishWords = pairs.map(p => p.english).sort(() => Math.random() - 0.5);
          setShuffledEnglishWords(englishWords);
        }
        
        const englishWords = shuffledEnglishWords.length > 0 ? shuffledEnglishWords : pairs.map(p => p.english);
        
        return (
          <View style={styles.exerciseContent}>
            <Text style={styles.question}>{currentExercise.question}</Text>
            <View style={styles.matchingContainer}>
              <View style={styles.matchingColumn}>
                {yorubaWords.map((word) => (
                  <TouchableOpacity
                    key={word}
                    style={[
                      styles.matchingItem,
                      selectedYoruba === word && styles.selectedItem,
                      matchedPairs[word] && styles.matchedItem,
                    ]}
                    onPress={() => setSelectedYoruba(word)}
                    disabled={!!matchedPairs[word]}
                  >
                    <Text style={styles.matchingText}>{word}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.matchingColumn}>
                {englishWords.map((word) => {
                  const isMatched = Object.values(matchedPairs).includes(word);
                  return (
                    <TouchableOpacity
                      key={word}
                      style={[
                        styles.matchingItem,
                        isMatched && styles.matchedItem,
                      ]}
                      onPress={() => {
                        if (selectedYoruba && !isMatched) {
                          handleMatchingSelect(selectedYoruba, word);
                        }
                      }}
                      disabled={isMatched || !selectedYoruba}
                    >
                      <Text style={styles.matchingText}>{word}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        );

      case 'story':
        const story = currentExercise.story;
        if (!story) return null;
        
        const handleStoryBlankSelect = (position: number, answer: string) => {
          setStoryBlanks({ ...storyBlanks, [position]: answer });
        };
        
        const handleComprehensionAnswer = (answer: string) => {
          setComprehensionAnswer(answer);
          const correct = answer === story.comprehensionAnswer;
          setIsCorrect(correct);
          setShowResult(true);
          recordAnswer(correct, []);
          
          if (correct) {
            if (Platform.OS !== 'web') {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
          } else {
            if (Platform.OS !== 'web') {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            }
            shakeAnimation();
            const remainingHearts = loseHeart();
            if (remainingHearts === 0) {
              router.back();
            }
          }
        };
        

        
        const renderStoryText = () => {
          const parts = story.text.split('_____');
          const result = [];
          
          for (let i = 0; i < parts.length; i++) {
            result.push(
              <Text key={`text-${i}`} style={styles.storyText}>
                {parts[i]}
              </Text>
            );
            
            if (i < story.blanks.length) {
              const blank = story.blanks[i];
              const selectedAnswer = storyBlanks[blank.position];
              
              result.push(
                <View key={`blank-${i}`} style={styles.storyBlankContainer}>
                  <Text style={styles.storyBlankText}>
                    {selectedAnswer || '____'}
                  </Text>
                </View>
              );
            }
          }
          
          return result;
        };
        
        if (showComprehension) {
          return (
            <View style={styles.exerciseContent}>
              <Text style={styles.question}>{story.comprehensionQuestion}</Text>
              <View style={styles.optionsContainer}>
                {story.comprehensionOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      comprehensionAnswer === option && isCorrect === true && styles.correctOption,
                      comprehensionAnswer === option && isCorrect === false && styles.incorrectOption,
                    ]}
                    onPress={() => handleComprehensionAnswer(option)}
                    disabled={showResult}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        }
        
        return (
          <View style={styles.exerciseContent}>
            <Text style={styles.question}>{currentExercise.question}</Text>
            <ScrollView style={styles.storyContainer} showsVerticalScrollIndicator={false}>
              <View style={styles.storyTextContainer}>
                {renderStoryText()}
              </View>
            </ScrollView>
            
            {story.blanks.map((blank, index) => {
              const isCompleted = !!storyBlanks[blank.position];
              if (isCompleted) return null;
              
              return (
                <View key={blank.position} style={styles.blankOptionsContainer}>
                  <Text style={styles.blankLabel}>Fill in blank {index + 1}:</Text>
                  <View style={styles.blankOptions}>
                    {blank.options.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={[
                          styles.blankOptionButton,
                          storyBlanks[blank.position] === option && styles.selectedBlankOption,
                        ]}
                        onPress={() => handleStoryBlankSelect(blank.position, option)}
                      >
                        <Text style={styles.blankOptionText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              );
            }).filter(Boolean)[0] || null}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF6B9D', '#C44569']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <View style={styles.closeButtonContainer}>
            <X size={24} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        
        <View style={styles.progressSection}>
          <View style={styles.mascotProgress}>
            <Text style={styles.mascotProgressEmoji}>🐵</Text>
            <View style={styles.progressSpeechBubble}>
              <Text style={styles.progressText}>
                {Math.round((currentExerciseIndex / lesson.exercises.length) * 100)}%
              </Text>
            </View>
          </View>
          
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
            <View style={styles.progressSparkles}>
              <Sparkles size={12} color="#FFD700" />
              <Sparkles size={8} color="#FFA500" />
            </View>
          </View>
        </View>
        
        <View style={styles.heartsContainer}>
          {[...Array(5)].map((_, i) => (
            <View key={i} style={styles.heartWrapper}>
              <Heart
                size={20}
                color={i < progress.hearts ? '#FF69B4' : 'rgba(255, 255, 255, 0.3)'}
                fill={i < progress.hearts ? '#FF69B4' : 'transparent'}
              />
              {i < progress.hearts && (
                <View style={styles.heartGlow} />
              )}
            </View>
          ))}
        </View>
      </LinearGradient>

      {showIntroduction ? (
        renderIntroduction()
      ) : (
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.exerciseContainer,
              {
                transform: [
                  { translateX: shakeAnim },
                  { scale: scaleAnim },
                ],
              },
            ]}
          >
            {renderExercise()}
          </Animated.View>
        </ScrollView>
      )}

      {showResult && (
        <LinearGradient
          colors={isCorrect ? ['#4CAF50', '#66BB6A'] : ['#F44336', '#EF5350']}
          style={styles.resultContainer}
        >
          <View style={styles.resultContent}>
            <View style={styles.resultMascot}>
              <Text style={styles.resultMascotEmoji}>
                {isCorrect ? '🐵' : '🙈'}
              </Text>
              <View style={styles.resultSparkles}>
                {isCorrect && (
                  <>
                    <Sparkles size={16} color="#FFD700" />
                    <Star size={12} color="#FFA500" fill="#FFA500" />
                  </>
                )}
              </View>
            </View>
            
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultText}>
                {isCorrect ? '🎉 Excellent work!' : '🤔 Almost there!'}
              </Text>
              <Text style={styles.resultSubtext}>
                {isCorrect 
                  ? '"Dára! You\'re doing great!" - Mr. Ede' 
                  : '"Don\'t worry, let\'s try again!" - Mr. Ede'
                }
              </Text>
              {!isCorrect && currentExercise.word && (
                <View style={styles.correctAnswerContainer}>
                  <Text style={styles.correctAnswerLabel}>The answer was:</Text>
                  <Text style={styles.correctAnswerText}>
                    {currentExercise.correctAnswer}
                  </Text>
                </View>
              )}
            </View>
            
            <TouchableOpacity style={styles.continueButton} onPress={nextExercise}>
              <LinearGradient
                colors={['#FFFFFF', '#F8F8F8']}
                style={styles.continueButtonGradient}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
                <Crown size={16} color={isCorrect ? '#4CAF50' : '#F44336'} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}

      <Modal visible={lessonComplete} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={['#FF6B9D', '#C44569', '#F8B500']}
            style={styles.completionModal}
          >
            <View style={styles.completionSparkles}>
              <Sparkles size={24} color="#FFD700" />
              <Star size={20} color="#FFA500" fill="#FFA500" />
              <Sparkles size={18} color="#FFFF00" />
            </View>
            
            <View style={styles.completionMascot}>
              <Text style={styles.completionMascotEmoji}>🐵</Text>
              <Text style={styles.completionHat}>🎩</Text>
              <View style={styles.completionCrown}>
                <Crown size={32} color="#FFD700" fill="#FFD700" />
              </View>
            </View>
            
            <Text style={styles.completionTitle}>🎉 Lesson Complete! 🎉</Text>
            <Text style={styles.completionXP}>+{lesson.xpReward} XP</Text>
            <Text style={styles.completionMessage}>
              &ldquo;Ẹ ṣé! You&apos;ve done wonderfully! I&apos;m so proud of your progress in learning Yoruba!&rdquo;
            </Text>
            <Text style={styles.completionSignature}>- Mr. Ede</Text>
            
            <TouchableOpacity
              style={styles.completionButton}
              onPress={() => router.back()}
            >
              <LinearGradient
                colors={['#FFFFFF', '#F0F0F0']}
                style={styles.completionButtonGradient}
              >
                <Text style={styles.completionButtonText}>Continue Learning</Text>
                <Star size={16} color="#FF6B9D" fill="#FF6B9D" />
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 50,
    gap: 15,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressSection: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  mascotProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mascotProgressEmoji: {
    fontSize: 24,
  },
  progressSpeechBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FF6B9D',
  },
  progressBarContainer: {
    width: '100%',
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 6,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  progressSparkles: {
    position: 'absolute',
    right: 8,
    top: 2,
    flexDirection: 'row',
    gap: 4,
  },
  heartsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  heartWrapper: {
    position: 'relative',
  },
  heartGlow: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 105, 180, 0.3)',
    top: -2,
    left: -2,
    zIndex: -1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  exerciseContainer: {
    flex: 1,
  },
  exerciseContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2E3856',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: -0.3,
  },
  pronunciation: {
    fontSize: 17,
    color: '#999',
    marginBottom: 20,
    fontStyle: 'italic',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  optionsContainer: {
    width: '100%',
    gap: 15,
  },
  optionButton: {
    backgroundColor: '#F7F7F7',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  optionText: {
    fontSize: 19,
    color: '#2E3856',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  correctOption: {
    backgroundColor: '#D7FFB8',
    borderColor: '#58CC02',
  },
  incorrectOption: {
    backgroundColor: '#FFD6D6',
    borderColor: '#FF4458',
  },
  translationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 30,
  },
  speakButton: {
    padding: 10,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
  },
  wordToTranslate: {
    fontSize: 30,
    fontWeight: '800',
    color: '#58CC02',
    letterSpacing: -0.5,
  },
  translationHint: {
    fontSize: 17,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  checkButton: {
    backgroundColor: '#58CC02',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  checkButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  matchingContainer: {
    flexDirection: 'row',
    gap: 30,
    width: '100%',
  },
  matchingColumn: {
    flex: 1,
    gap: 15,
  },
  matchingItem: {
    backgroundColor: '#F7F7F7',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  selectedItem: {
    borderColor: '#58CC02',
    backgroundColor: '#E8F5E8',
  },
  matchedItem: {
    backgroundColor: '#D7FFB8',
    borderColor: '#58CC02',
  },
  matchingText: {
    fontSize: 17,
    color: '#2E3856',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  resultContainer: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  resultContent: {
    alignItems: 'center',
  },
  resultMascot: {
    position: 'relative',
    marginBottom: 15,
  },
  resultMascotEmoji: {
    fontSize: 48,
  },
  resultSparkles: {
    position: 'absolute',
    top: -10,
    right: -10,
    flexDirection: 'row',
    gap: 4,
  },
  resultTextContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  resultSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: 10,
  },
  correctAnswerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
  },
  correctAnswerLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
    fontWeight: '600',
  },
  correctAnswerText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  },
  continueButton: {
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    gap: 8,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333',
    letterSpacing: 0.3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completionModal: {
    margin: 20,
    padding: 35,
    borderRadius: 30,
    alignItems: 'center',
    maxWidth: '90%',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 15,
  },
  completionSparkles: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    gap: 8,
  },
  completionMascot: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  completionMascotEmoji: {
    fontSize: 64,
  },
  completionHat: {
    position: 'absolute',
    top: -20,
    fontSize: 32,
  },
  completionCrown: {
    position: 'absolute',
    top: -35,
    left: -10,
  },
  completionTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: -0.5,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  completionXP: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFD700',
    marginBottom: 20,
    letterSpacing: -0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  completionMessage: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 28,
    fontWeight: '600',
    letterSpacing: 0.2,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  completionSignature: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  completionButton: {
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  completionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 25,
    gap: 8,
  },
  completionButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333',
    letterSpacing: 0.3,
  },
  storyContainer: {
    maxHeight: 300,
    marginBottom: 20,
  },
  storyTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7F7F7',
    borderRadius: 15,
    marginBottom: 20,
  },
  storyText: {
    fontSize: 18,
    color: '#2E3856',
    lineHeight: 28,
    fontWeight: '500',
  },
  storyBlankContainer: {
    backgroundColor: '#58CC02',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  storyBlankText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
    minWidth: 60,
    textAlign: 'center',
  },
  blankOptionsContainer: {
    marginBottom: 20,
  },
  blankLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    fontWeight: '600',
  },
  blankOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  blankOptionButton: {
    backgroundColor: '#F7F7F7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  selectedBlankOption: {
    backgroundColor: '#D7FFB8',
    borderColor: '#58CC02',
  },
  blankOptionText: {
    fontSize: 16,
    color: '#2E3856',
    fontWeight: '600',
  },
  introductionContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFF8F0',
  },
  introductionTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#2E3856',
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: -0.5,
  },
  introductionContent: {
    flex: 1,
    marginBottom: 20,
  },
  introductionContentContainer: {
    paddingBottom: 20,
  },
  introductionText: {
    fontSize: 17,
    color: '#2E3856',
    lineHeight: 26,
    fontWeight: '500',
    marginBottom: 25,
    letterSpacing: 0.2,
  },
  examplesContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
  },
  examplesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E3856',
    marginBottom: 15,
    letterSpacing: -0.2,
  },
  exampleItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  exampleYoruba: {
    fontSize: 20,
    fontWeight: '700',
    color: '#58CC02',
    marginBottom: 5,
    letterSpacing: -0.2,
  },
  exampleEnglish: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
    fontWeight: '500',
  },
  examplePronunciation: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  startButton: {
    marginTop: 15,
    borderRadius: 25,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 25,
    gap: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});