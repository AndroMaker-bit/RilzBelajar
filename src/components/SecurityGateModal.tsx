import React, { useState } from 'react';
import { Lock, Key, Shield, CheckCircle2, AlertCircle, Cpu, Eye, EyeOff, X } from 'lucide-react';
import { SecurityService } from '../services/security';

interface SecurityGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  isUnlocked: boolean;
  onUnlockedSuccess: () => void;
}

export const SecurityGateModal: React.FC<SecurityGateModalProps> = ({
  isOpen,
  onClose,
  isUnlocked,
  onUnlockedSuccess,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState(SecurityService.getApiKey());
  const [showApiKey, setShowApiKey] = useState(false);
  const [newPinInput, setNewPinInput] = useState('');
  const [selectedModel, setSelectedModel] = useState(SecurityService.getModel());
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen && isUnlocked) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (SecurityService.unlockWithPin(pinInput)) {
      setPinError('');
      onUnlockedSuccess();
    } else {
      setPinError('Passcode salah! Masukkan PIN rahasia Rilz (Default: RILZ2026)');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    SecurityService.saveApiKey(apiKeyInput);
    SecurityService.setModel(selectedModel);
    if (newPinInput.trim().length >= 4) {
      SecurityService.setCustomPin(newPinInput.trim());
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleLockSession = () => {
    SecurityService.lockSession();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-md layers-card p-6 shadow-2xl">
        
        {/* Close Button */}
        {isUnlocked && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1 rounded-full text-[#626573] hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {!isUnlocked ? (
          /* LOCKED STATE */
          <div>
            <div className="w-10 h-10 mx-auto rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white mb-4">
              <Lock className="w-4 h-4" />
            </div>

            <h2 className="text-base font-semibold text-center text-white">Study AI Private Vault</h2>
            <p className="text-xs text-center text-[#9496a1] mt-1 mb-6">
              Masukkan Whitelist Passcode untuk membuka akses dashboard & kuota AI.
            </p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#9496a1] mb-1.5">
                  Whitelist Passcode
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Ketik PIN (Default: RILZ2026)"
                  className="w-full bg-[#06070a] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/[0.25] font-mono tracking-widest text-center"
                  autoFocus
                />
              </div>

              {pinError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{pinError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-xs transition-all shadow-md"
              >
                Buka Kunci Vault
              </button>
            </form>

            <p className="text-[11px] text-[#626573] text-center mt-4 font-mono">
              Default: <span className="text-white font-semibold">RILZ2026</span>
            </p>
          </div>
        ) : (
          /* UNLOCKED SETTINGS */
          <div>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.06]">
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Security & API Vault</h2>
                <p className="text-xs text-[#9496a1]">Pengaturan Whitelist, Model AI & API Key</p>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              {/* Gemini API Key */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-[#9496a1] flex items-center gap-1.5">
                    <Key className="w-3 h-3 text-white" />
                    <span>Gemini API Key Aktif</span>
                  </label>
                  <span className="layers-pill py-0.5 px-2 text-[10px] text-emerald-400 bg-emerald-500/10 border-emerald-500/30">
                    Aktif
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder="AQ.Ab8RN..."
                    className="w-full bg-[#06070a] border border-white/[0.08] rounded-xl px-4 py-2.5 pr-10 text-xs text-white font-mono focus:outline-none focus:border-white/[0.25]"
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
                  API Key tersimpan aman di browser lokal dengan auto-fallback model cerdas.
                </p>
              </div>

              {/* Model Selector */}
              <div>
                <label className="block text-xs font-medium text-[#9496a1] mb-1.5 flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-white" />
                  <span>Model AI Gemini</span>
                </label>
                <select
                  value={selectedModel}
                  onChange={(e: any) => setSelectedModel(e.target.value)}
                  className="w-full bg-[#06070a] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/[0.25] cursor-pointer"
                >
                  <option value="gemini-flash-lite-latest">Gemini Flash Lite (Aktif, Super Kencang & Respon Kilat)</option>
                  <option value="gemini-flash-latest">Gemini Flash Latest (Model Standar)</option>
                  <option value="gemini-3.8-flash">Gemini 3.8 Flash (Model Flagship)</option>
                  <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                </select>
              </div>

              {/* Change Whitelist PIN */}
              <div>
                <label className="block text-xs font-medium text-[#9496a1] mb-1.5">
                  Ubah Passcode Whitelist (Opsional)
                </label>
                <input
                  type="text"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  placeholder="Ketik PIN baru..."
                  className="w-full bg-[#06070a] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-white/[0.25] font-mono"
                />
              </div>

              {saveSuccess && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Pengaturan berhasil disimpan!</span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-xs transition-colors"
                >
                  Simpan Perubahan
                </button>
                <button
                  type="button"
                  onClick={handleLockSession}
                  className="layers-pill py-2.5 px-4 text-[#9496a1] hover:text-rose-300 hover:border-rose-800 transition-colors"
                >
                  Kunci Vault
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
