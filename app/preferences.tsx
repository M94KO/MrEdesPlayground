import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import {
  ChevronLeft,
  Bell,
  Volume2,
  Moon,
  Globe,
  Shield,
  Download,
  Smartphone,
  Clock,
  Target,
  Zap,
  BookOpen,
  ChevronRight,
} from 'lucide-react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PreferencesState {
  notifications: {
    dailyReminders: boolean;
    streakReminders: boolean;
    achievementAlerts: boolean;
    practiceReminders: boolean;
  };
  audio: {
    soundEffects: boolean;
    voicePronunciation: boolean;
    backgroundMusic: boolean;
  };
  display: {
    darkMode: boolean;
    reducedMotion: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
  learning: {
    dailyGoal: number;
    difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
    autoAdvance: boolean;
    showHints: boolean;
  };
  privacy: {
    analytics: boolean;
    crashReports: boolean;
    personalizedAds: boolean;
  };
}

const PREFERENCES_KEY = 'user_preferences';

const defaultPreferences: PreferencesState = {
  notifications: {
    dailyReminders: true,
    streakReminders: true,
    achievementAlerts: true,
    practiceReminders: false,
  },
  audio: {
    soundEffects: true,
    voicePronunciation: true,
    backgroundMusic: false,
  },
  display: {
    darkMode: false,
    reducedMotion: false,
    fontSize: 'medium',
  },
  learning: {
    dailyGoal: 50,
    difficultyLevel: 'beginner',
    autoAdvance: true,
    showHints: true,
  },
  privacy: {
    analytics: true,
    crashReports: true,
    personalizedAds: false,
  },
};

export default function PreferencesScreen() {
  const [preferences, setPreferences] = useState<PreferencesState>(defaultPreferences);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const stored = await AsyncStorage.getItem(PREFERENCES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences({ ...defaultPreferences, ...parsed });
      }
    } catch (error) {
      console.log('Error loading preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async (newPreferences: PreferencesState) => {
    try {
      await AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(newPreferences));
      setPreferences(newPreferences);
    } catch (error) {
      console.log('Error saving preferences:', error);
      Alert.alert('Error', 'Failed to save preferences. Please try again.');
    }
  };

  const updatePreference = (section: keyof PreferencesState, key: string, value: any) => {
    const newPreferences = {
      ...preferences,
      [section]: {
        ...preferences[section],
        [key]: value,
      },
    };
    savePreferences(newPreferences);
  };

  const resetToDefaults = () => {
    Alert.alert(
      'Reset Preferences',
      'Are you sure you want to reset all preferences to default values?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => savePreferences(defaultPreferences),
        },
      ]
    );
  };

  const SwitchRow = ({
    title,
    subtitle,
    icon: Icon,
    value,
    onValueChange,
  }: {
    title: string;
    subtitle?: string;
    icon: any;
    value: boolean;
    onValueChange: (value: boolean) => void;
  }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingLeft}>
        <Icon size={20} color="#666" />
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E0E0E0', true: '#58CC02' }}
        thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
      />
    </View>
  );

  const SelectRow = ({
    title,
    subtitle,
    icon: Icon,
    value,
    options,
    onSelect,
  }: {
    title: string;
    subtitle?: string;
    icon: any;
    value: string;
    options: { label: string; value: string }[];
    onSelect: (value: string) => void;
  }) => (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={() => {
        Alert.alert(
          title,
          'Select an option:',
          options.map((option) => ({
            text: option.label,
            onPress: () => onSelect(option.value),
            style: (option.value === value ? 'default' : 'cancel') as 'default' | 'cancel',
          }))
        );
      }}
    >
      <View style={styles.settingLeft}>
        <Icon size={20} color="#666" />
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        <Text style={styles.settingValue}>
          {options.find((opt) => opt.value === value)?.label || value}
        </Text>
        <ChevronRight size={16} color="#999" />
      </View>
    </TouchableOpacity>
  );

  const NumberRow = ({
    title,
    subtitle,
    icon: Icon,
    value,
    onSelect,
  }: {
    title: string;
    subtitle?: string;
    icon: any;
    value: number;
    onSelect: (value: number) => void;
  }) => (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={() => {
        const options = [10, 25, 50, 100, 200].map((num) => ({
          text: `${num} XP`,
          onPress: () => onSelect(num),
          style: (num === value ? 'default' : 'cancel') as 'default' | 'cancel',
        }));
        Alert.alert(title, 'Select your daily goal:', options);
      }}
    >
      <View style={styles.settingLeft}>
        <Icon size={20} color="#666" />
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        <Text style={styles.settingValue}>{value} XP</Text>
        <ChevronRight size={16} color="#999" />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading preferences...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#2E3856" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preferences</Text>
        <TouchableOpacity style={styles.resetButton} onPress={resetToDefaults}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.sectionContent}>
            <SwitchRow
              title="Daily Reminders"
              subtitle="Get reminded to practice daily"
              icon={Bell}
              value={preferences.notifications.dailyReminders}
              onValueChange={(value) =>
                updatePreference('notifications', 'dailyReminders', value)
              }
            />
            <SwitchRow
              title="Streak Reminders"
              subtitle="Don't lose your streak!"
              icon={Clock}
              value={preferences.notifications.streakReminders}
              onValueChange={(value) =>
                updatePreference('notifications', 'streakReminders', value)
              }
            />
            <SwitchRow
              title="Achievement Alerts"
              subtitle="Celebrate your accomplishments"
              icon={Target}
              value={preferences.notifications.achievementAlerts}
              onValueChange={(value) =>
                updatePreference('notifications', 'achievementAlerts', value)
              }
            />
            <SwitchRow
              title="Practice Reminders"
              subtitle="Reminders for focused practice"
              icon={BookOpen}
              value={preferences.notifications.practiceReminders}
              onValueChange={(value) =>
                updatePreference('notifications', 'practiceReminders', value)
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audio & Sound</Text>
          <View style={styles.sectionContent}>
            <SwitchRow
              title="Sound Effects"
              subtitle="Button taps and feedback sounds"
              icon={Volume2}
              value={preferences.audio.soundEffects}
              onValueChange={(value) =>
                updatePreference('audio', 'soundEffects', value)
              }
            />
            <SwitchRow
              title="Voice Pronunciation"
              subtitle="Hear correct pronunciation"
              icon={Volume2}
              value={preferences.audio.voicePronunciation}
              onValueChange={(value) =>
                updatePreference('audio', 'voicePronunciation', value)
              }
            />
            <SwitchRow
              title="Background Music"
              subtitle="Ambient music during lessons"
              icon={Volume2}
              value={preferences.audio.backgroundMusic}
              onValueChange={(value) =>
                updatePreference('audio', 'backgroundMusic', value)
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>
          <View style={styles.sectionContent}>
            <SwitchRow
              title="Dark Mode"
              subtitle="Use dark theme"
              icon={Moon}
              value={preferences.display.darkMode}
              onValueChange={(value) =>
                updatePreference('display', 'darkMode', value)
              }
            />
            <SwitchRow
              title="Reduced Motion"
              subtitle="Minimize animations"
              icon={Smartphone}
              value={preferences.display.reducedMotion}
              onValueChange={(value) =>
                updatePreference('display', 'reducedMotion', value)
              }
            />
            <SelectRow
              title="Font Size"
              subtitle="Adjust text size for readability"
              icon={Globe}
              value={preferences.display.fontSize}
              options={[
                { label: 'Small', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Large', value: 'large' },
              ]}
              onSelect={(value) =>
                updatePreference('display', 'fontSize', value)
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning</Text>
          <View style={styles.sectionContent}>
            <NumberRow
              title="Daily Goal"
              subtitle="XP target for each day"
              icon={Zap}
              value={preferences.learning.dailyGoal}
              onSelect={(value) =>
                updatePreference('learning', 'dailyGoal', value)
              }
            />
            <SelectRow
              title="Difficulty Level"
              subtitle="Adjust lesson complexity"
              icon={Target}
              value={preferences.learning.difficultyLevel}
              options={[
                { label: 'Beginner', value: 'beginner' },
                { label: 'Intermediate', value: 'intermediate' },
                { label: 'Advanced', value: 'advanced' },
              ]}
              onSelect={(value) =>
                updatePreference('learning', 'difficultyLevel', value)
              }
            />
            <SwitchRow
              title="Auto Advance"
              subtitle="Automatically move to next lesson"
              icon={ChevronRight}
              value={preferences.learning.autoAdvance}
              onValueChange={(value) =>
                updatePreference('learning', 'autoAdvance', value)
              }
            />
            <SwitchRow
              title="Show Hints"
              subtitle="Display helpful hints during lessons"
              icon={BookOpen}
              value={preferences.learning.showHints}
              onValueChange={(value) =>
                updatePreference('learning', 'showHints', value)
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Data</Text>
          <View style={styles.sectionContent}>
            <SwitchRow
              title="Analytics"
              subtitle="Help improve the app with usage data"
              icon={Shield}
              value={preferences.privacy.analytics}
              onValueChange={(value) =>
                updatePreference('privacy', 'analytics', value)
              }
            />
            <SwitchRow
              title="Crash Reports"
              subtitle="Send crash reports to help fix bugs"
              icon={Download}
              value={preferences.privacy.crashReports}
              onValueChange={(value) =>
                updatePreference('privacy', 'crashReports', value)
              }
            />
            <SwitchRow
              title="Personalized Ads"
              subtitle="Show ads based on your interests"
              icon={Target}
              value={preferences.privacy.personalizedAds}
              onValueChange={(value) =>
                updatePreference('privacy', 'personalizedAds', value)
              }
            />
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E3856',
    letterSpacing: -0.3,
  },
  resetButton: {
    padding: 5,
  },
  resetText: {
    fontSize: 16,
    color: '#FF4458',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E3856',
    marginBottom: 15,
    marginHorizontal: 20,
    letterSpacing: -0.2,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E3856',
    letterSpacing: 0.1,
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 50,
  },
});