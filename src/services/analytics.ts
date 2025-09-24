interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private isEnabled = true;

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    console.log(`Analytics ${enabled ? 'enabled' : 'disabled'}`);
  }

  track(name: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: new Date(),
    };

    this.events.push(event);
    console.log('Analytics Event:', event);

    // In a real app, you would send this to your analytics service
    // Example: Mixpanel, Amplitude, Firebase Analytics, etc.
  }

  screen(screenName: string, properties?: Record<string, any>) {
    this.track('Screen View', {
      screen_name: screenName,
      ...properties,
    });
  }

  lessonStarted(lessonId: string, lessonTitle: string) {
    this.track('Lesson Started', {
      lesson_id: lessonId,
      lesson_title: lessonTitle,
    });
  }

  lessonCompleted(lessonId: string, lessonTitle: string, score: number, timeSpent: number) {
    this.track('Lesson Completed', {
      lesson_id: lessonId,
      lesson_title: lessonTitle,
      score,
      time_spent: timeSpent,
    });
  }

  questionAnswered(questionId: string, isCorrect: boolean, timeSpent: number) {
    this.track('Question Answered', {
      question_id: questionId,
      is_correct: isCorrect,
      time_spent: timeSpent,
    });
  }

  userRegistered(method: string) {
    this.track('User Registered', {
      method,
    });
  }

  userLoggedIn(method: string) {
    this.track('User Logged In', {
      method,
    });
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  clearEvents() {
    this.events = [];
    console.log('Analytics events cleared');
  }
}

export const analytics = new AnalyticsService();