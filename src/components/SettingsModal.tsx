import React, { useState } from 'react';
import {
  Lock,
  Key,
  Shield,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Eye,
  EyeOff,
  X,
  Sparkles,
  Volume2,
  VolumeX,
  Sliders,
  Monitor,
  Database,
  Download,
  RotateCcw,
  Zap,
  Activity,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { SecurityService } from '../services/security';
import { PreferencesService, type AppSettings } from '../services/preferences';
import { soundEffects } from '../services/soundEffects';
import { StorageService } from '../services/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isUnlocked: boolean;
  onUnlockedSuccess: () => void;
  onSettingsChange?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isUnlocked,
  onUnlockedSuccess,
  onSettingsChange,
}) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'audio' | 'display' | 'security' | 'data'>('ai');
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [newPinInput, setNewPinInput] = useState('');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Settings State
  const [settings, setSettings] = useState<AppSettings>(PreferencesService.getSettings());
  const dailyUsage = SecurityService.getDailyUsage();
  const quizHistory = StorageService.getQuizHistory();

  if (!isOpen && isUnlocked) return null;

  const showNotification = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 2500);
  };

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    const updated = PreferencesService.saveSettings({ [key]: value });
    setSettings(updated);
    if (onSettingsChange) onSettingsChange();
    soundEffects.playClick();
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (SecurityService.unlockWithPin(pinInput)) {
      setPinError('');
      soundEffects.playUnlock();
      onUnlockedSuccess();
    } else {
      soundEffects.playError();
      setPinError('Passcode salah! Masukkan PIN rahasia Rilz (Default: RILZ2026)');
    }
  };

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.trim().length >= 4) {
      SecurityService.setCustomPin(newPinInput.trim());
      setNewPinInput('');
      soundEffects.playSuccess();
      showNotification('Passcode Whitelist berhasil diperbarui!');
    } else {
      soundEffects.playError();
      showNotification('PIN minimal harus 4 karakter!');
    }
  };

  const handleResetDailyUsage = () => {
    SecurityService.resetDailyUsage();
    soundEffects.playClick();
    showNotification('Penghitung kuota harian di-reset ke 0.');
    setSettings(PreferencesService.getSettings());
  };

  const handleLockSession = () => {
    soundEffects.playError();
    SecurityService.lockSession();
    window.location.reload();
  };

  const handleExportData = () => {
    soundEffects.playClick();
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      subjects: StorageService.getSubjects(),
      quizHistory: StorageService.getQuizHistory(),
      preferences: PreferencesService.getSettings(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `study-ai-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Backup data berhasil di-download!');
  };

  const handleResetQuizHistory = () => {
    if (window.confirm('Yakin ingin mereset seluruh riwayat latihan dan skor simulasi? (Kisi-kisi tetap aman)')) {
      localStorage.removeItem('study_ai_quiz_history');
      soundEffects.playClick();
      showNotification('Riwayat simulasi berhasil dibersihkan.');
    }
  };

  // Percentage calculations
  const quotaPercent = Math.min(100, Math.round((dailyUsage.count / dailyUsage.maxFreeLimit) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0a0c12]/95 border border-white/[0.12] rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Glow accent in background */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        {isUnlocked && (
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="absolute top-5 right-5 p-1.5 rounded-full text-[#626573] hover:text-white hover:bg-white/[0.08] transition-colors z-20"
            title="Tutup Pengaturan"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* ======================================================== */}
        {/* 1. LOCKED VIEW (PIN GATE) */}
        {/* ======================================================== */}
        {!isUnlocked ? (
          <div className="py-6 px-2 text-center max-w-sm mx-auto">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white mb-4 shadow-inner">
              <Lock className="w-5 h-5 text-white/90" />
            </div>

            <h2 className="text-lg font-semibold text-white tracking-tight">Study AI Private Vault</h2>
            <p className="text-xs text-[#9496a1] mt-1.5 mb-6">
              Masukkan Whitelist Passcode untuk membuka akses dashboard, kuota AI, dan seluruh materi ujian.
            </p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Ketik PIN (Default: RILZ2026)"
                  className="w-full bg-[#050608] border border-white/[0.12] focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none font-mono tracking-widest text-center transition-colors"
                  autoFocus
                />
              </div>

              {pinError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs text-left animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{pinError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-xs transition-all shadow-md active:scale-[0.99]"
              >
                Buka Kunci Akses
              </button>
            </form>

            <p className="text-[11px] text-[#626573] text-center mt-5 font-mono">
              Whitelist Default: <span className="text-white font-semibold">RILZ2026</span>
            </p>
          </div>
        ) : (
          /* ======================================================== */
          /* 2. UNLOCKED SETTINGS DASHBOARD */
          /* ======================================================== */
          <div className="flex flex-col flex-1 overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white shadow-inner">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-white tracking-tight">System Settings & Engine</h2>
                    <span className="layers-pill py-0.5 px-2 text-[10px] text-emerald-400 bg-emerald-500/10 border-emerald-500/30">
                      VIP Active
                    </span>
                  </div>
                  <p className="text-xs text-[#9496a1]">Konfigurasi AI Engine, Audio, Tampilan & Keamanan</p>
                </div>
              </div>
            </div>

            {/* Notification Toast */}
            {saveToast && (
              <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs animate-in fade-in duration-150 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{saveToast}</span>
              </div>
            )}

            {/* Navigation Tab Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-3 shrink-0 border-b border-white/[0.06] scrollbar-none">
              <button
                onClick={() => {
                  setActiveTab('ai');
                  soundEffects.playClick();
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === 'ai'
                    ? 'bg-white/10 text-white border border-white/20 shadow-sm'
                    : 'text-[#9496a1] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>AI & Kuota</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('audio');
                  soundEffects.playClick();
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === 'audio'
                    ? 'bg-white/10 text-white border border-white/20 shadow-sm'
                    : 'text-[#9496a1] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio & Feedback</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('display');
                  soundEffects.playClick();
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === 'display'
                    ? 'bg-white/10 text-white border border-white/20 shadow-sm'
                    : 'text-[#9496a1] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Tampilan</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('security');
                  soundEffects.playClick();
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === 'security'
                    ? 'bg-white/10 text-white border border-white/20 shadow-sm'
                    : 'text-[#9496a1] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Keamanan</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('data');
                  soundEffects.playClick();
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === 'data'
                    ? 'bg-white/10 text-white border border-white/20 shadow-sm'
                    : 'text-[#9496a1] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Data & Cadangan</span>
              </button>
            </div>

            {/* Scrollable Tab Content Body */}
            <div className="flex-1 overflow-y-auto py-4 pr-1 space-y-5 text-xs text-[#9496a1] scrollbar-thin">

              {/* ---------------------------------------------------- */}
              {/* TAB 1: AI ENGINE & TOKEN QUOTA */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'ai' && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  
                  {/* Quota Progress Meter Card */}
                  <div className="p-4 rounded-2xl bg-[#0e1017] border border-white/[0.08]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-400" />
                        <span className="font-semibold text-white">Daily AI Request Meter</span>
                      </div>
                      <span className="font-mono text-xs text-white">
                        {dailyUsage.count} <span className="text-[#626573]">/ {dailyUsage.maxFreeLimit} req</span>
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-500"
                        style={{ width: `${Math.max(2, quotaPercent)}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-2.5 text-[11px] text-[#626573]">
                      <span>Tier: 100% Free Google AI Tier</span>
                      <div className="flex items-center gap-3">
                        <span>{quotaPercent}% Terpakai Hari Ini</span>
                        <button
                          onClick={handleResetDailyUsage}
                          className="hover:text-white underline cursor-pointer"
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    {/* Engine Mini Specs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-white/[0.06] text-[11px]">
                      <div className="p-2 rounded-xl bg-black/40 border border-white/[0.04]">
                        <span className="block text-[#626573] text-[10px]">STATUS</span>
                        <span className="text-emerald-400 font-medium">Ready (Online)</span>
                      </div>
                      <div className="p-2 rounded-xl bg-black/40 border border-white/[0.04]">
                        <span className="block text-[#626573] text-[10px]">RPM LIMIT</span>
                        <span className="text-white font-medium">15 Req/Menit</span>
                      </div>
                      <div className="p-2 rounded-xl bg-black/40 border border-white/[0.04]">
                        <span className="block text-[#626573] text-[10px]">LATENCY</span>
                        <span className="text-cyan-300 font-medium">~320ms Kilat</span>
                      </div>
                      <div className="p-2 rounded-xl bg-black/40 border border-white/[0.04]">
                        <span className="block text-[#626573] text-[10px]">CONTEXT</span>
                        <span className="text-purple-300 font-medium">32k Tokens</span>
                      </div>
                    </div>
                  </div>

                  {/* API Key Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-white flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5 text-white/80" />
                        <span>Gemini API Key Aktif</span>
                      </label>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        Auto Fallback Ready
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={settings.apiKey}
                        onChange={(e) => updateSetting('apiKey', e.target.value)}
                        placeholder="AQ.Ab8RN..."
                        className="w-full bg-[#050608] border border-white/[0.08] focus:border-white/[0.25] rounded-xl px-4 py-2.5 pr-10 text-xs text-white font-mono focus:outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-2.5 text-[#626573] hover:text-white"
                      >
                        {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-[10px] text-[#626573] mt-1">
                      Kunci kamu tersimpan privat di LocalStorage browser tanpa lewat server perantara.
                    </p>
                  </div>

                  {/* Model Selector */}
                  <div>
                    <label className="block text-xs font-medium text-white mb-1.5 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-white/80" />
                      <span>Model AI Utama (Primary Engine)</span>
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        {
                          id: 'gemini-flash-lite-latest',
                          title: 'Gemini Flash Lite (Rekomendasi Utama)',
                          desc: 'Respon sub-detik (<0.5 detik), hemat kuota, paling stabil untuk latihan soal AAS.',
                        },
                        {
                          id: 'gemini-3.8-flash',
                          title: 'Gemini 3.8 Flash (Flagship Generasi Terbaru)',
                          desc: 'Kemampuan penalaran tingkat tinggi untuk pembuktian konsep sains kompleks.',
                        },
                        {
                          id: 'gemini-flash-latest',
                          title: 'Gemini Flash Latest',
                          desc: 'Versi seimbang standar produksi Google AI.',
                        },
                      ].map((m) => (
                        <div
                          key={m.id}
                          onClick={() => updateSetting('selectedModel', m.id as any)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            settings.selectedModel === m.id
                              ? 'bg-white/[0.08] border-white/30 text-white'
                              : 'bg-[#0e1017] border-white/[0.06] text-[#9496a1] hover:border-white/[0.15] hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-xs text-white">{m.title}</span>
                            {settings.selectedModel === m.id && (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            )}
                          </div>
                          <p className="text-[11px] text-[#626573] mt-0.5">{m.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trik Nalar Tongkrongan Toggle (Anti-LaTeX Rule) */}
                  <div className="p-3.5 rounded-xl bg-[#0e1017] border border-white/[0.08] flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-medium text-xs text-white">Trik Nalar Tongkrongan (Anti-LaTeX)</span>
                      </div>
                      <p className="text-[11px] text-[#626573] mt-0.5">
                        Memaksa AI menjelaskan konsep dengan analogi nalar praktis tanpa rumus bertingkat pecahan yang memusingkan.
                      </p>
                    </div>
                    <button
                      onClick={() => updateSetting('antiLatexRule', !settings.antiLatexRule)}
                      className={`w-11 h-6 rounded-full p-1 transition-colors relative shrink-0 ${
                        settings.antiLatexRule ? 'bg-emerald-500' : 'bg-white/10'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          settings.antiLatexRule ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Temperature Slider */}
                  <div className="p-3.5 rounded-xl bg-[#0e1017] border border-white/[0.08]">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-medium text-xs text-white">Kreativitas AI (Temperature)</span>
                      <span className="font-mono text-xs text-white">
                        {settings.temperature}{' '}
                        <span className="text-[10px] text-[#626573]">
                          {settings.temperature <= 0.3 ? '(Akademis Presisi)' : settings.temperature <= 0.6 ? '(Ideal)' : '(Kreatif & Santai)'}
                        </span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.1"
                      value={settings.temperature}
                      onChange={(e) => updateSetting('temperature', parseFloat(e.target.value))}
                      className="w-full accent-white cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#626573] mt-1">
                      <span>0.1 (Ketat & Faktual)</span>
                      <span>0.4 (Default Kisi-Kisi)</span>
                      <span>1.0 (Bebas & Ramah)</span>
                    </div>
                  </div>

                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 2: AUDIO & FEEDBACK */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'audio' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  
                  {/* Sound FX Switch */}
                  <div className="p-4 rounded-2xl bg-[#0e1017] border border-white/[0.08] space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white">
                          {settings.soundEffects ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-[#626573]" />}
                        </div>
                        <div>
                          <span className="font-semibold text-xs text-white">Sound Effects (Synthesizer Chimes)</span>
                          <p className="text-[11px] text-[#626573]">Efek suara klik UI, jawaban benar, salah, dan alert.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => updateSetting('soundEffects', !settings.soundEffects)}
                        className={`w-11 h-6 rounded-full p-1 transition-colors relative shrink-0 ${
                          settings.soundEffects ? 'bg-emerald-500' : 'bg-white/10'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform ${
                            settings.soundEffects ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Sound Test Pills */}
                    {settings.soundEffects && (
                      <div className="pt-2 border-t border-white/[0.06]">
                        <span className="block text-[10px] text-[#626573] mb-2 uppercase font-mono tracking-wider">
                          Uji Coba Suara (Synthesized Offline)
                        </span>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => soundEffects.playClick()}
                            className="layers-pill py-1.5 px-3 text-white hover:bg-white/10 text-[11px]"
                          >
                            🔊 Klik Tombol
                          </button>
                          <button
                            type="button"
                            onClick={() => soundEffects.playSuccess()}
                            className="layers-pill py-1.5 px-3 text-emerald-300 hover:bg-emerald-500/10 text-[11px]"
                          >
                            ✨ Jawaban Benar
                          </button>
                          <button
                            type="button"
                            onClick={() => soundEffects.playError()}
                            className="layers-pill py-1.5 px-3 text-rose-300 hover:bg-rose-500/10 text-[11px]"
                          >
                            ⚠️ Jawaban Salah
                          </button>
                          <button
                            type="button"
                            onClick={() => soundEffects.playUnlock()}
                            className="layers-pill py-1.5 px-3 text-cyan-300 hover:bg-cyan-500/10 text-[11px]"
                          >
                            🔓 Buka Vault
                          </button>
                        </div>

                        {/* Volume Slider */}
                        <div className="mt-4">
                          <div className="flex justify-between text-xs text-[#9496a1] mb-1">
                            <span>Volume Efek</span>
                            <span className="font-mono text-white">{Math.round(settings.soundVolume * 100)}%</span>
                          </div>
                          <input
                            type="range"
                            min="0.1"
                            max="1.0"
                            step="0.05"
                            value={settings.soundVolume}
                            onChange={(e) => updateSetting('soundVolume', parseFloat(e.target.value))}
                            className="w-full accent-white cursor-pointer"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confetti Celebration */}
                  <div className="p-3.5 rounded-xl bg-[#0e1017] border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <span className="font-medium text-xs text-white">Confetti Fireworks (Kembang Api Skor 80+)</span>
                      <p className="text-[11px] text-[#626573] mt-0.5">
                        Menyalakan animasi kembang api perayaan saat berhasil lulus simulasi ujian AAS.
                      </p>
                    </div>
                    <button
                      onClick={() => updateSetting('confettiEnabled', !settings.confettiEnabled)}
                      className={`w-11 h-6 rounded-full p-1 transition-colors relative shrink-0 ${
                        settings.confettiEnabled ? 'bg-emerald-500' : 'bg-white/10'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          settings.confettiEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Haptic Vibration Gimmick */}
                  <div className="p-3.5 rounded-xl bg-[#0e1017] border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <span className="font-medium text-xs text-white">Haptic Vibration Touch</span>
                      <p className="text-[11px] text-[#626573] mt-0.5">
                        Getaran umpan balik mikro pada perangkat layar sentuh saat memilih jawaban.
                      </p>
                    </div>
                    <button
                      onClick={() => updateSetting('hapticFeedback', !settings.hapticFeedback)}
                      className={`w-11 h-6 rounded-full p-1 transition-colors relative shrink-0 ${
                        settings.hapticFeedback ? 'bg-emerald-500' : 'bg-white/10'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          settings.hapticFeedback ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 3: TAMPILAN & AMBIENT */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'display' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  
                  {/* Metal Human Ambient Opacity */}
                  <div className="p-4 rounded-2xl bg-[#0e1017] border border-white/[0.08] space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-xs text-white">Intensitas Video Metal Human</span>
                        <p className="text-[11px] text-[#626573]">
                          Atur transparansi video loop ambient GetLayers di latar belakang.
                        </p>
                      </div>
                      <span className="font-mono text-xs text-white">{settings.ambientVideoOpacity}%</span>
                    </div>

                    <input
                      type="range"
                      min="10"
                      max="60"
                      step="5"
                      value={settings.ambientVideoOpacity}
                      onChange={(e) => updateSetting('ambientVideoOpacity', parseInt(e.target.value, 10))}
                      className="w-full accent-white cursor-pointer"
                    />

                    <div className="flex justify-between text-[10px] text-[#626573]">
                      <span>10% (Minimalis)</span>
                      <span>25% (Rekomendasi)</span>
                      <span>60% (Sinematik Tebal)</span>
                    </div>
                  </div>

                  {/* Vignette Blur Filter */}
                  <div className="p-3.5 rounded-xl bg-[#0e1017] border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <span className="font-medium text-xs text-white">Vignette & Readability Mask</span>
                      <p className="text-[11px] text-[#626573] mt-0.5">
                        Lapisan gradien gelap halus agar teks tetap 100% terbaca kontras di atas video.
                      </p>
                    </div>
                    <button
                      onClick={() => updateSetting('ambientVignette', !settings.ambientVignette)}
                      className={`w-11 h-6 rounded-full p-1 transition-colors relative shrink-0 ${
                        settings.ambientVignette ? 'bg-emerald-500' : 'bg-white/10'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          settings.ambientVignette ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* High Contrast */}
                  <div className="p-3.5 rounded-xl bg-[#0e1017] border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <span className="font-medium text-xs text-white">Mode Kontras Tinggi (High Contrast)</span>
                      <p className="text-[11px] text-[#626573] mt-0.5">
                        Pertajam border dan kontras font untuk membaca di ruangan terang.
                      </p>
                    </div>
                    <button
                      onClick={() => updateSetting('highContrast', !settings.highContrast)}
                      className={`w-11 h-6 rounded-full p-1 transition-colors relative shrink-0 ${
                        settings.highContrast ? 'bg-emerald-500' : 'bg-white/10'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          settings.highContrast ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 4: KEAMANAN & PASSCODE */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'security' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  
                  {/* Change Whitelist PIN */}
                  <div className="p-4 rounded-2xl bg-[#0e1017] border border-white/[0.08]">
                    <span className="font-semibold text-xs text-white block mb-1">Ganti Whitelist Passcode</span>
                    <p className="text-[11px] text-[#626573] mb-3">
                      Ganti kode PIN untuk membatasi siapa saja yang boleh memakai aplikasi dan kuota AI kamu.
                    </p>

                    <form onSubmit={handleSavePin} className="flex gap-2">
                      <input
                        type="text"
                        value={newPinInput}
                        onChange={(e) => setNewPinInput(e.target.value)}
                        placeholder="Ketik PIN baru (min 4 karakter)..."
                        className="flex-1 bg-[#050608] border border-white/[0.08] focus:border-white/[0.25] rounded-xl px-4 py-2 text-xs text-white font-mono focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="py-2 px-4 rounded-xl bg-white hover:bg-white/90 text-black font-semibold text-xs transition-colors shrink-0"
                      >
                        Simpan PIN
                      </button>
                    </form>
                    <p className="text-[10px] text-[#626573] mt-2 font-mono">
                      PIN Aktif Saat Ini: <span className="text-white">{SecurityService.getStoredPin()}</span>
                    </p>
                  </div>

                  {/* Anti Spam Rate Limiter */}
                  <div className="p-3.5 rounded-xl bg-[#0e1017] border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <span className="font-medium text-xs text-white">Proteksi Anti-Spam (Rate Limit)</span>
                      <p className="text-[11px] text-[#626573] mt-0.5">
                        Jeda 1.5 detik antar klik agar kuota AI kamu tidak terbuang sia-sia akibat double-click.
                      </p>
                    </div>
                    <button
                      onClick={() => updateSetting('rateLimitEnabled', !settings.rateLimitEnabled)}
                      className={`w-11 h-6 rounded-full p-1 transition-colors relative shrink-0 ${
                        settings.rateLimitEnabled ? 'bg-emerald-500' : 'bg-white/10'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          settings.rateLimitEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Lock Session Now Button */}
                  <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 flex items-center justify-between gap-4">
                    <div>
                      <span className="font-semibold text-xs text-rose-300 block">Kunci Sesi Aplikasi</span>
                      <p className="text-[11px] text-rose-300/70 mt-0.5">
                        Kunci dashboard seketika. Siapapun yang membuka web ini harus memasukkan passcode lagi.
                      </p>
                    </div>
                    <button
                      onClick={handleLockSession}
                      className="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm"
                    >
                      Kunci Vault
                    </button>
                  </div>

                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB 5: DATA & CADANGAN */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'data' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  
                  {/* Database Status Card */}
                  <div className="p-4 rounded-2xl bg-[#0e1017] border border-white/[0.08]">
                    <span className="font-semibold text-xs text-white block mb-2">Status Data & Penyimpanan</span>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                      <div className="p-3 rounded-xl bg-black/40 border border-white/[0.04]">
                        <span className="text-[#626573] text-[10px] block">KISI-KISI TERDAFTAR</span>
                        <span className="text-white font-medium text-sm">40 Indikator AAS</span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/[0.04]">
                        <span className="text-[#626573] text-[10px] block">SIMULASI DIKERJAKAN</span>
                        <span className="text-white font-medium text-sm">{quizHistory.length} Kali Sesi</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#626573]">
                      Semua data soal dan progress belajar tersimpan di penyimpanan lokal browser laptopmu (100% offline & tanpa tracking).
                    </p>
                  </div>

                  {/* Export Backup Button */}
                  <div className="p-3.5 rounded-xl bg-[#0e1017] border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <span className="font-medium text-xs text-white">Cadangkan Data (Export JSON)</span>
                      <p className="text-[11px] text-[#626573] mt-0.5">
                        Download file cadangan seluruh kisi-kisi dan progress belajar.
                      </p>
                    </div>
                    <button
                      onClick={handleExportData}
                      className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>

                  {/* Reset Quiz History */}
                  <div className="p-3.5 rounded-xl bg-[#0e1017] border border-white/[0.08] flex items-center justify-between">
                    <div>
                      <span className="font-medium text-xs text-rose-300">Bersihkan Riwayat Nilai Latihan</span>
                      <p className="text-[11px] text-[#626573] mt-0.5">
                        Reset riwayat skor simulasi untuk mengulang latihan dari awal.
                      </p>
                    </div>
                    <button
                      onClick={handleResetQuizHistory}
                      className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800 text-rose-300 font-medium text-xs transition-colors shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Nilai</span>
                    </button>
                  </div>

                </div>
              )}

            </div>

            {/* Bottom Footer Actions */}
            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between shrink-0">
              <span className="text-[11px] text-[#626573] font-mono">
                pelajarin.ai v2.4 · VIP Config
              </span>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  onClose();
                }}
                className="py-2 px-5 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-xs transition-colors shadow-sm"
              >
                Tutup & Terapkan
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
