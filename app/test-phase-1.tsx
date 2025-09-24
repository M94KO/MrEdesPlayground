import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LessonCard } from '@/src/components/lesson';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';
import { getAllLessons } from '@/data/lessons';

export default function TestScreen() {
  const lessons = getAllLessons().slice(0, 3); // Just show first 3 lessons

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Phase 1.1 Implementation Test</Text>
      <Text style={styles.subtitle}>New Component Structure Working!</Text>
      
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          progress={Math.random() * 100}
          onPress={() => console.log(`Pressed lesson: ${lesson.title}`)}
          testID={`lesson-${lesson.id}`}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background.primary,
  },
  title: {
    fontSize: fonts.sizes['2xl'],
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: fonts.sizes.base,
    color: colors.text.secondary,
    marginBottom: 24,
  },
});