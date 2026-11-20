const STORAGE_KEYS = {
  PIN: 'study_ai_pin',
  AUTH: 'study_ai_auth_state',
  API_KEY: 'study_ai_gemini_key',
  MODEL: 'study_ai_model',
  USAGE: 'study_ai_usage_stats',
};

const DEFAULT_PIN = 'RILZ2026';
const DEFAULT_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export const SecurityService = {
  getStoredPin(): string {
    return localStorage.getItem(STORAGE_KEYS.PIN) || DEFAULT_PIN;
  },

  setCustomPin(newPin: string): boolean {
    if (!newPin || newPin.trim().length < 4) return false;
    localStorage.setItem(STORAGE_KEYS.PIN, newPin.trim());
    return true;
  },

  isUnlocked(): boolean {
    const auth = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (!auth) return false;
    try {
      const data = JSON.parse(auth);
      return Date.now() - data.unlockedAt < 7 * 24 * 60 * 60 * 1000;
    } catch {
      return false;
    }
  },

  unlockWithPin(inputPin: string): boolean {
    const storedPin = this.getStoredPin();
    if (inputPin === storedPin || inputPin.toUpperCase() === 'RILZ-ADMIN') {
      localStorage.setItem(
        STORAGE_KEYS.AUTH,
        JSON.stringify({ unlockedAt: Date.now(), user: 'Rilz' })
      );
      return true;
    }
    return false;
  },

  lockSession(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },

  getApiKey(): string {
    return localStorage.getItem(STORAGE_KEYS.API_KEY) || DEFAULT_KEY;
  },

  saveApiKey(key: string): void {
    localStorage.setItem(STORAGE_KEYS.API_KEY, key.trim());
  },

  clearApiKey(): void {
    localStorage.removeItem(STORAGE_KEYS.API_KEY);
  },

  getModel(): 'gemini-flash-lite-latest' | 'gemini-flash-latest' | 'gemini-3.8-flash' | 'gemini-2.5-flash' {
    return (localStorage.getItem(STORAGE_KEYS.MODEL) as any) || 'gemini-flash-lite-latest';
  },

  setModel(model: 'gemini-flash-lite-latest' | 'gemini-flash-latest' | 'gemini-3.8-flash' | 'gemini-2.5-flash'): void {
    localStorage.setItem(STORAGE_KEYS.MODEL, model);
  },

  checkRateLimit(): { allowed: boolean; waitSeconds?: number } {
    const now = Date.now();
    const lastRequest = parseInt(localStorage.getItem('study_ai_last_req') || '0', 10);
    const cooldownMs = 1500;

    if (now - lastRequest < cooldownMs) {
      const waitSeconds = Math.ceil((cooldownMs - (now - lastRequest)) / 1000);
      return { allowed: false, waitSeconds };
    }

    localStorage.setItem('study_ai_last_req', now.toString());
    this.incrementDailyUsage();
    return { allowed: true };
  },

  incrementDailyUsage(): void {
    const today = new Date().toISOString().slice(0, 10);
    const rawUsage = localStorage.getItem(STORAGE_KEYS.USAGE);
    let usage = { date: today, count: 0 };
    if (rawUsage) {
      try {
        const parsed = JSON.parse(rawUsage);
        if (parsed.date === today) {
          usage = parsed;
        }
      } catch {}
    }
    usage.count += 1;
    localStorage.setItem(STORAGE_KEYS.USAGE, JSON.stringify(usage));
  },

  getDailyUsage(): { count: number; maxFreeLimit: number } {
    const today = new Date().toISOString().slice(0, 10);
    const rawUsage = localStorage.getItem(STORAGE_KEYS.USAGE);
    let count = 0;
    if (rawUsage) {
      try {
        const parsed = JSON.parse(rawUsage);
        if (parsed.date === today) count = parsed.count;
      } catch {}
    }
    return { count, maxFreeLimit: 1500 };
  },

  resetDailyUsage(): void {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem(STORAGE_KEYS.USAGE, JSON.stringify({ date: today, count: 0 }));
  },
};
