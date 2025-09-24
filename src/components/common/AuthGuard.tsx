import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { router, useSegments } from 'expo-router';
import { useAuth } from '@/hooks/use-auth';
import { LoadingSpinner } from '@/src/components/ui';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isOnboardingCompleted } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'onboarding';
    const inTabsGroup = segments[0] === '(tabs)';

    console.log('AuthGuard - User:', user?.id, 'Onboarding:', isOnboardingCompleted, 'Segments:', segments);

    if (!user) {
      // User not authenticated, redirect to welcome
      if (!inAuthGroup) {
        router.replace('/onboarding/welcome');
      }
    } else if (!isOnboardingCompleted) {
      // User authenticated but onboarding not completed
      if (!inAuthGroup) {
        router.replace('/onboarding/language');
      }
    } else {
      // User authenticated and onboarding completed
      if (inAuthGroup) {
        router.replace('/(tabs)');
      }
    }
  }, [user, isLoading, isOnboardingCompleted, segments]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="large" />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});