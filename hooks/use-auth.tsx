import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { storage } from '@/src/utils/storage';

export interface User {
  id: string;
  email?: string;
  fullName?: string;
  language: 'yoruba' | 'itsekiri';
  experienceLevel: 'newbie' | 'familiar';
  onboardingCompleted: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isOnboardingCompleted: boolean;
}

const AUTH_STORAGE_KEY = 'auth_user';

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadStoredUser = useCallback(async () => {
    try {
      const storedUser = await storage.get<string>(AUTH_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStoredUser();
  }, [loadStoredUser]);

  const saveUser = useCallback(async (userData: User) => {
    if (!userData || !userData.id?.trim()) {
      console.error('Invalid user data');
      return;
    }
    
    try {
      await storage.set(AUTH_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }, []);

  const signInWithApple = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    try {
      if (Platform.OS !== 'ios') {
        return { success: false, error: 'Apple Sign In is only available on iOS' };
      }

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const newUser: User = {
        id: credential.user,
        email: credential.email || undefined,
        fullName: credential.fullName ? 
          `${credential.fullName.givenName || ''} ${credential.fullName.familyName || ''}`.trim() 
          : undefined,
        language: 'yoruba', // Default, will be set during onboarding
        experienceLevel: 'newbie', // Default, will be set during onboarding
        onboardingCompleted: false,
      };

      await saveUser(newUser);
      return { success: true };
    } catch (error: any) {
      console.error('Apple Sign In error:', error);
      return { success: false, error: error.message || 'Sign in failed' };
    }
  }, [saveUser]);

  const signInWithEmail = useCallback(async (email: string, fullName?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!email?.trim()) {
        return { success: false, error: 'Email is required' };
      }
      
      if (email.length > 254) {
        return { success: false, error: 'Email is too long' };
      }
      
      const sanitizedEmail = email.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(sanitizedEmail)) {
        return { success: false, error: 'Please enter a valid email address' };
      }

      const newUser: User = {
        id: `email_${Date.now()}`, // Simple ID generation
        email: sanitizedEmail,
        fullName: fullName?.trim(),
        language: 'yoruba', // Default, will be set during onboarding
        experienceLevel: 'newbie', // Default, will be set during onboarding
        onboardingCompleted: false,
      };

      await saveUser(newUser);
      return { success: true };
    } catch (error: any) {
      console.error('Email Sign In error:', error);
      return { success: false, error: error.message || 'Sign in failed' };
    }
  }, [saveUser]);

  const updateUserPreferences = useCallback(async (language: 'yoruba' | 'itsekiri', experienceLevel: 'newbie' | 'familiar') => {
    if (!user) return;

    const updatedUser: User = {
      ...user,
      language,
      experienceLevel,
      onboardingCompleted: true,
    };

    await saveUser(updatedUser);
  }, [user, saveUser]);

  const signOut = useCallback(async () => {
    try {
      await storage.remove(AUTH_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }, []);

  return useMemo(() => ({
    user,
    isLoading,
    isOnboardingCompleted: user?.onboardingCompleted || false,
    signInWithApple,
    signInWithEmail,
    updateUserPreferences,
    signOut,
  }), [user, isLoading, signInWithApple, signInWithEmail, updateUserPreferences, signOut]);
});