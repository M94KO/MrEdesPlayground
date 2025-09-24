import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Check } from 'lucide-react-native';

export default function LanguageSelectionScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState<'yoruba' | 'itsekiri' | null>(null);

  const handleContinue = () => {
    if (selectedLanguage) {
      router.push({
        pathname: '/onboarding/experience',
        params: { language: selectedLanguage },
      });
    }
  };

  const languages = [
    {
      id: 'yoruba' as const,
      name: 'Yoruba',
      description: 'Learn the beautiful Yoruba language',
      flag: '🇳🇬',
    },
    {
      id: 'itsekiri' as const,
      name: 'Itsekiri',
      description: 'Discover the rich Itsekiri language',
      flag: '🇳🇬',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#58CC02', '#89E219']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Choose Your Language</Text>
            <Text style={styles.subtitle}>
              Which language would you like to learn?
            </Text>
          </View>

          <View style={styles.languageContainer}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.id}
                style={[
                  styles.languageCard,
                  selectedLanguage === language.id && styles.selectedCard,
                ]}
                onPress={() => setSelectedLanguage(language.id)}
                testID={`language-${language.id}`}
              >
                <View style={styles.languageContent}>
                  <Text style={styles.flag}>{language.flag}</Text>
                  <View style={styles.languageInfo}>
                    <Text style={styles.languageName}>{language.name}</Text>
                    <Text style={styles.languageDescription}>
                      {language.description}
                    </Text>
                  </View>
                  {selectedLanguage === language.id && (
                    <View style={styles.checkContainer}>
                      <Check size={24} color="#58CC02" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedLanguage && styles.disabledButton,
            ]}
            onPress={handleContinue}
            disabled={!selectedLanguage}
            testID="continue-button"
          >
            <Text
              style={[
                styles.continueButtonText,
                !selectedLanguage && styles.disabledButtonText,
              ]}
            >
              Continue
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
  languageContainer: {
    flex: 1,
    marginBottom: 32,
  },
  languageCard: {
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
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 32,
    marginRight: 16,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#333333',
    marginBottom: 4,
  },
  languageDescription: {
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