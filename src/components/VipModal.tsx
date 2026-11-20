import React, { useState } from 'react';
import { Key, Check, Lock, X, MessageSquare, ArrowRight, AlertCircle } from 'lucide-react';
import { SecurityService } from '../services/security';

interface VipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockSuccess: () => void;
}

export const VipModal: React.FC<VipModalProps> = ({
  isOpen,
  onClose,
  onUnlockSuccess,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [tab, setTab] = useState<'buy' | 'pin'>('buy');

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (SecurityService.unlockWithPin(pinInput)) {
      setPinError('');
      onUnlockSuccess();
    } else {
      setPinError('Passcode salah! Masukkan PIN rahasia kamu atau hubungi @Lqzyyy');
    }
  };

  const handleWhatsAppBuy = () => {
    const text = encodeURIComponent('Halo Rilz, mau beli Pass VIP Pelajarin.ai seharga Rp15.000 untuk persiapan ujian!');
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0a0c12]/95 border border-white/[0.14] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Subtle ambient sheen */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#626573] hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white shadow-inner">
            <Key className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-white">Pass VIP Pelajarin.ai</h3>
              <span className="layers-pill py-0.5 px-2 text-[10px] text-white/80 bg-white/[0.06] border-white/[0.1]">
                VIP 2026
              </span>
            </div>
            <p className="text-xs text-[#9496a1]">Akses penuh tanpa batas sampai ujian selesai</p>
          </div>
        </div>

        {/* Tabs: Beli Akses vs Punya PIN */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#06070a] border border-white/[0.08] mb-6">
          <button
            onClick={() => setTab('buy')}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              tab === 'buy'
                ? 'bg-white/10 text-white shadow-sm border border-white/10'
                : 'text-[#9496a1] hover:text-white'
            }`}
          >
            Beli Akses (Rp 15.000)
          </button>
          <button
            onClick={() => setTab('pin')}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              tab === 'pin'
                ? 'bg-white/10 text-white shadow-sm border border-white/10'
                : 'text-[#9496a1] hover:text-white'
            }`}
          >
            Sudah Punya PIN
          </button>
        </div>

        {/* ================= Tab 1: Beli Akses ================= */}
        {tab === 'buy' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            {/* Price Tag */}
            <div className="p-4 rounded-2xl bg-[#0e1017] border border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#9496a1] block">Akses Penuh Sekali Bayar</span>
                <span className="text-2xl font-bold font-mono text-white tracking-tight">
                  Rp 15.000
                </span>
                <span className="text-[11px] text-[#626573] block mt-0.5">
                  Bebas dipakai sampai seluruh ujian selesai
                </span>
              </div>
              <span className="layers-pill py-1 px-3 text-xs text-white bg-white/[0.06] border-white/[0.1]">
                VIP Member
              </span>
            </div>

            {/* Benefits Checklist */}
            <div className="space-y-2.5 text-xs text-[#d1d5db]">
              {[
                'Akses kisi-kisi ujian lengkap (AAS / SAS / PAS & Multi-Mapel Bebas Tambah)',
                'AI Tutor 24/7 tanpa batas pertanyaan (Logika nalar tongkrongan)',
                'Simulasi ujian berulang kali dengan timer resmi & auto-scoring',
                'Fitur khusus review kilat soal-soal yang salah saja',
                'Cetak / simpan PDF Smart Cheat Sheet untuk dibaca sebelum ujian',
              ].map((b, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-white/[0.08] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-2 space-y-2.5">
              <button
                onClick={handleWhatsAppBuy}
                className="w-full py-3 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <MessageSquare className="w-3.5 h-3.5 text-black" />
                <span>Beli Pass VIP via WhatsApp (Fast Response)</span>
              </button>

              <button
                onClick={() => setTab('pin')}
                className="w-full py-2.5 text-center text-xs text-[#9496a1] hover:text-white transition-colors cursor-pointer"
              >
                Sudah transfer & punya PIN? <span className="underline text-white">Masukkan PIN di sini</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= Tab 2: Masukkan PIN ================= */}
        {tab === 'pin' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="text-center py-2">
              <div className="w-10 h-10 mx-auto rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white mb-3 shadow-inner">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-white">Aktivasi Kode Akses VIP</h4>
              <p className="text-xs text-[#9496a1] mt-1">
                Masukkan Passcode PIN rahasia yang kamu dapatkan setelah transfer.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-3.5">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Ketik PIN (Contoh: RILZ2026)"
                  className="w-full bg-[#050608] border border-white/[0.12] focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none font-mono tracking-widest text-center transition-colors"
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
                className="w-full py-3 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-xs transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buka Akses Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </button>
            </form>

            <p className="text-[11px] text-[#626573] text-center font-mono">
              Belum punya kode? <button onClick={() => setTab('buy')} className="text-white underline cursor-pointer">Beli Pass VIP sekarang</button>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
