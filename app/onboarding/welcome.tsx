import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Apple } from 'lucide-react-native';
import { useAuth } from '@/hooks/use-auth';
import { LoadingSpinner } from '@/src/components/ui';

export default function WelcomeScreen() {
  const { signInWithApple, signInWithEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  const handleAppleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithApple();
      if (result.success) {
        router.push('/onboarding/language');
      } else {
        console.error('Apple Sign In Failed:', result.error);
      }
    } catch (error) {
      console.error('Apple Sign In Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    if (!email.trim()) {
      console.error('Email required');
      return;
    }

    setIsLoading(true);
    try {
      const result = await signInWithEmail(email, fullName);
      if (result.success) {
        router.push('/onboarding/language');
      } else {
        console.error('Email Sign In Failed:', result.error);
      }
    } catch (error) {
      console.error('Email Sign In Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <LoadingSpinner size="large" />
          <Text style={styles.loadingText}>Setting up your account...</Text>
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
            <Text style={styles.title}>Welcome to Language Learning</Text>
            <Text style={styles.subtitle}>
              Start your journey to learn Yoruba and Itsekiri languages
            </Text>
          </View>

          <View style={styles.authContainer}>
            {!showEmailForm ? (
              <>
                {Platform.OS === 'ios' && (
                  <TouchableOpacity
                    style={styles.appleButton}
                    onPress={handleAppleSignIn}
                    testID="apple-sign-in-button"
                  >
                    <Apple size={20} color="#FFFFFF" />
                    <Text style={styles.appleButtonText}>Continue with Apple</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.emailButton}
                  onPress={() => setShowEmailForm(true)}
                  testID="email-sign-in-button"
                >
                  <Mail size={20} color="#58CC02" />
                  <Text style={styles.emailButtonText}>Continue with Email</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.emailForm}>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name (Optional)"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  testID="full-name-input"
                />
                
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  testID="email-input"
                />

                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={handleEmailSignIn}
                  testID="continue-button"
                >
                  <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setShowEmailForm(false)}
                  testID="back-button"
                >
                  <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Text style={styles.disclaimer}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
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
    justifyContent: 'center',
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
  authContainer: {
    marginBottom: 32,
  },
  appleButton: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
  },
  appleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600' as const,
    marginLeft: 8,
  },
  emailButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  emailButtonText: {
    color: '#58CC02',
    fontSize: 16,
    fontWeight: '600' as const,
    marginLeft: 8,
  },
  emailForm: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  continueButton: {
    backgroundColor: '#58CC02',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600' as const,
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#666666',
    fontSize: 16,
  },
  disclaimer: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 20,
  },
});