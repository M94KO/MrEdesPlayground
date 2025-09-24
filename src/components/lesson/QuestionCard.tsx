import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from '@/src/components/ui';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';
import { Question } from '@/types/lesson';

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
  showResult?: boolean;
  testID?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showResult = false,
  testID,
}) => {
  const getAnswerButtonVariant = (answer: string) => {
    if (!showResult) {
      return selectedAnswer === answer ? 'primary' : 'outline';
    }
    
    if (answer === question.correctAnswer) {
      return 'primary';
    }
    
    if (selectedAnswer === answer && answer !== question.correctAnswer) {
      return 'secondary';
    }
    
    return 'outline';
  };

  return (
    <Card style={styles.card} testID={testID}>
      <Text style={styles.question}>{question.question}</Text>
      
      <View style={styles.answersContainer}>
        {question.options.map((option, index) => (
          <Button
            key={index}
            title={option}
            onPress={() => onAnswerSelect(option)}
            variant={getAnswerButtonVariant(option)}
            style={styles.answerButton}
            disabled={showResult}
            testID={`answer-${index}`}
          />
        ))}
      </View>
      
      {showResult && question.explanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>Explanation:</Text>
          <Text style={styles.explanation}>{question.explanation}</Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
  question: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.semibold,
    color: colors.text.primary,
    marginBottom: 20,
    lineHeight: 24,
  },
  answersContainer: {
    gap: 12,
  },
  answerButton: {
    marginBottom: 0,
  },
  explanationContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: colors.gray[50],
    borderRadius: 8,
  },
  explanationTitle: {
    fontSize: fonts.sizes.base,
    fontWeight: fonts.weights.semibold,
    color: colors.text.primary,
    marginBottom: 8,
  },
  explanation: {
    fontSize: fonts.sizes.base,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});