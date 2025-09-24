import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from '@/src/components/ui';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';
import { Lesson } from '@/types/lesson';

interface LessonCardProps {
  lesson: Lesson;
  onPress: () => void;
  progress?: number;
  testID?: string;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  onPress,
  progress = 0,
  testID,
}) => {
  return (
    <TouchableOpacity onPress={onPress} testID={testID}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{lesson.title}</Text>
          <Text style={styles.unit}>Unit {lesson.unit}</Text>
        </View>
        
        <Text style={styles.description}>{lesson.description}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${progress}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{Math.round(progress)}%</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.semibold,
    color: colors.text.primary,
    flex: 1,
  },
  unit: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    fontWeight: fonts.weights.medium,
  },
  description: {
    fontSize: fonts.sizes.base,
    color: colors.text.secondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.gray[200],
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    fontWeight: fonts.weights.medium,
    minWidth: 35,
    textAlign: 'right' as const,
  },
});