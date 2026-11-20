export interface AppSettings {
  // AI Settings
  apiKey: string;
  selectedModel: 'gemini-flash-lite-latest' | 'gemini-flash-latest' | 'gemini-3.8-flash' | 'gemini-2.5-flash';
  temperature: number; // 0.1 - 1.0 (default 0.4)
  antiLatexRule: boolean; // default true
  reasoningMode: 'tongkrongan' | 'akademis' | 'ringkas';
  streamSimulation: boolean; // default true

  // Audio & Feedback (Gimmick & Real)
  soundEffects: boolean; // default true
  soundVolume: number; // 0.1 - 1.0 (default 0.5)
  hapticFeedback: boolean; // default true
  confettiEnabled: boolean; // default true

  // Ambient & Visual
  ambientVideoOpacity: number; // 10 - 60 (default 25)
  ambientVignette: boolean; // default true
  highContrast: boolean; // default false

  // Security & Rate Limits
  rateLimitEnabled: boolean; // default true
  rateLimitSeconds: number; // default 1.5
  autoLockMinutes: number; // 0 = never, 15, 30, 60
  defaultPersona: 'bro' | 'teacher' | 'socratic';
}

const PREFERENCES_KEY = 'study_ai_preferences';

const DEFAULT_SETTINGS: AppSettings = {
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  selectedModel: 'gemini-flash-lite-latest',
  temperature: 0.4,
  antiLatexRule: true,
  reasoningMode: 'tongkrongan',
  streamSimulation: true,
  soundEffects: false, // Default hening/quiet sesuai request Rilz
  soundVolume: 0.5,
  hapticFeedback: false,
  confettiEnabled: true,
  ambientVideoOpacity: 25,
  ambientVignette: true,
  highContrast: false,
  rateLimitEnabled: true,
  rateLimitSeconds: 1.5,
  autoLockMinutes: 0,
  defaultPersona: 'bro',
};

export const PreferencesService = {
  getSettings(): AppSettings {
    const raw = localStorage.getItem(PREFERENCES_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: Partial<AppSettings>): AppSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));

    // Also sync API key & model to security storage for backward compatibility
    if (settings.apiKey !== undefined) {
      localStorage.setItem('study_ai_gemini_key', settings.apiKey.trim());
    }
    if (settings.selectedModel !== undefined) {
      localStorage.setItem('study_ai_model', settings.selectedModel);
    }

    return updated;
  },

  resetToDefaults(): AppSettings {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  },
};
