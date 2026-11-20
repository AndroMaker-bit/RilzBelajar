import React from 'react';
import {
  ArrowRight,
  Brain,
  Target,
  Bot,
  Zap,
  Printer,
  ShieldCheck,
  Check,
  ChevronRight,
  Lock,
  Key,
  ArrowUpRight,
  Layers,
} from 'lucide-react';
import { AASCountdown } from './AASCountdown';

interface LandingPageProps {
  onOpenDashboard: () => void;
  onOpenVipModal: () => void;
  isUnlocked: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenDashboard,
  onOpenVipModal,
  isUnlocked,
}) => {
  return (
    <div className="relative min-h-screen text-white flex flex-col font-sans selection:bg-white/20 selection:text-white">
      
      {/* ======================================================== */}
      {/* 1. FLOATING MINIMAL NAVBAR */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 w-full bg-[#050608]/80 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0e1017] border border-white/[0.12] flex items-center justify-center shadow-inner">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-tight text-white">
                  pelajarin<span className="text-[#9496a1]">.ai</span>
                </span>
                <span className="layers-pill py-0.5 px-2 text-[10px] text-white/80 bg-white/[0.06] border-white/[0.1]">
                  EXAM VIP
                </span>
              </div>
            </div>

            {/* Middle Countdown Pill (Desktop) */}
            <div className="hidden md:block">
              <AASCountdown
                targetDateStr="2026-11-23T07:30:00+07:00"
                label="Menuju Hari H Ujian"
              />
            </div>

            {/* Right Action */}
            <div className="flex items-center gap-3">
              {isUnlocked ? (
                <button
                  onClick={onOpenDashboard}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white hover:bg-white/90 text-black text-xs font-semibold transition-all shadow-md active:scale-[0.98] cursor-pointer"
                >
                  <span>Buka Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenVipModal}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0e1017] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.2] text-[#9496a1] hover:text-white text-xs font-medium transition-all cursor-pointer"
                  >
                    <Key className="w-3 h-3 text-white/80" />
                    <span>Masuk / Beli PIN</span>
                  </button>

                  <button
                    onClick={onOpenDashboard}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white hover:bg-white/90 text-black text-xs font-semibold transition-all shadow-md active:scale-[0.98] cursor-pointer"
                  >
                    <span>Masuk ke App</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. HERO SECTION */}
      {/* ======================================================== */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 text-center">
        
        {/* Countdown Badge on Mobile */}
        <div className="md:hidden mb-6 flex justify-center">
          <AASCountdown
            targetDateStr="2026-11-23T07:30:00+07:00"
            label="Menuju Hari H Ujian"
          />
        </div>

        {/* Hero Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.12] text-xs text-[#d1d5db] mb-6 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-white/90">Sistem Belajar Cerdas Berbasis AI</span>
          <span className="text-white/30">·</span>
          <span className="text-[#9496a1] font-mono text-[11px]">2026 Edition</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
          Taklukkan Kisi-Kisi Ujian Semester.{' '}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d1d5db] to-[#626573]">
            Lebih Cepat, Lebih Masuk Akal.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#9496a1] leading-relaxed mb-8">
          Platform belajar VIP berbasis AI untuk taklukkan seluruh mata pelajaran ujian semester (AAS, SAS, PAS, & Ujian Sekolah). Dilengkapi AI Tutor berlogika nalar praktis, simulasi ujian berwaktu otomatis, cheat sheet siap cetak, serta kebebasan tambah kisi-kisi mapel apa saja.
        </p>

        {/* Dual Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <button
            onClick={onOpenDashboard}
            className="w-full sm:w-auto flex-1 py-3 px-6 rounded-full bg-white hover:bg-white/90 text-black text-xs font-semibold transition-all shadow-xl hover:shadow-white/10 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Mulai Belajar Sekarang</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onOpenVipModal}
            className="w-full sm:w-auto py-3 px-6 rounded-full bg-[#0e1017] hover:bg-white/[0.08] border border-white/[0.12] hover:border-white/[0.25] text-white text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Key className="w-3.5 h-3.5 text-white/80 transition-transform group-hover:rotate-12" />
            <span>Ambil Pass VIP · Rp 15k</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#626573] group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Social Proof Metric Micro-strip */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mt-10 text-[11px] text-[#626573] font-mono">
          <span>✓ SEMUA MAPEL & KISI-KISI UJIAN</span>
          <span>✓ AI MODEL ZERO-LATENCY</span>
          <span>✓ 100% BEBAS IKLAN</span>
        </div>

      </section>

      {/* ======================================================== */}
      {/* 3. BENTO BOX FEATURE SHOWCASE */}
      {/* ======================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        
        <div className="mb-8 text-center sm:text-left">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#9496a1] font-semibold block mb-1">
            ARSITEKTUR BELAJAR VIP
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Dirancang Khusus untuk Siswa yang Ingin Nilai A
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

          {/* BENTO 1 (Cols 1-2): Interactive AI Tutor with Trik Nalar */}
          <div className="md:col-span-2 layers-card p-6 sm:p-8 flex flex-col justify-between group hover:border-white/25 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white shadow-inner">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">AI Tutor Logika Nalar Tongkrongan</h3>
                    <p className="text-xs text-[#9496a1]">Pahami materi rumit dengan logika nalar praktis</p>
                  </div>
                </div>
                <span className="layers-pill py-0.5 px-2 text-[10px] text-white/90 bg-white/[0.06] border-white/[0.1] font-mono">
                  Gemini Flash Sub-Detik
                </span>
              </div>

              {/* Realistic Interactive Chat Bubble Simulation */}
              <div className="space-y-3 my-5">
                {/* User Message */}
                <div className="flex items-start justify-end gap-2.5">
                  <div className="max-w-md p-3.5 rounded-2xl rounded-tr-sm bg-white/10 border border-white/15 text-xs text-white leading-relaxed">
                    Bro, kalau jarak antara dua muatan dijadiin 3 kali lipat semula, gaya Coulomb-nya jadi berapa? Gak usah pake rumus pecahan bertingkat pusing bgt!
                  </div>
                </div>

                {/* AI Tutor Reply */}
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5">
                    AI
                  </div>
                  <div className="max-w-lg p-3.5 rounded-2xl rounded-tl-sm bg-[#06070a] border border-white/[0.08] text-xs text-[#d1d5db] leading-relaxed space-y-1.5 shadow-inner">
                    <p className="text-white font-medium">Santai, gak usah ngitung rumus perbandingan ribet!</p>
                    <p>Inget trik nalarnya: <strong className="text-white underline decoration-white/30">Gaya Coulomb berbanding terbalik sama kuadrat jarak</strong>.</p>
                    <p className="font-mono text-[11px] text-white bg-white/[0.04] p-2 rounded-lg border border-white/[0.08]">
                      Jarak naik 3x lipat ➔ Gayanya tinggal dibagi 3 kuadrat (dibagi 9) ➔ Jadi 1/9 F semula!
                    </p>
                    <p className="text-[11px] text-[#9496a1]">Selesai 5 detik tanpa corat-coret rumus pecahan!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#626573]">
              <span>Tersedia 3 Persona: Bro Santai, Guru Privat, Sokrates</span>
              <button onClick={onOpenDashboard} className="text-white hover:underline flex items-center gap-1 cursor-pointer">
                <span>Coba di Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* BENTO 2 (Col 3): Simulasi AAS Cockpit 45 Menit */}
          <div className="layers-card p-6 sm:p-7 flex flex-col justify-between group hover:border-white/25 transition-all duration-300">
            <div>
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white mb-4 shadow-inner">
                <Target className="w-4 h-4 text-white" />
              </div>

              <h3 className="text-base font-semibold text-white">Cockpit Simulasi Ujian</h3>
              <p className="text-xs text-[#9496a1] mt-1 mb-4">
                Format simulasi ujian resmi dengan timer berwaktu otomatis, navigasi peta soal, dan skor instan.
              </p>

              {/* Interactive Mini Question Palette Preview */}
              <div className="p-3.5 rounded-2xl bg-[#06070a] border border-white/[0.08] mb-4">
                <div className="flex items-center justify-between text-[10px] text-[#626573] font-mono mb-2">
                  <span>PETA SOAL</span>
                  <span className="text-emerald-400 font-semibold">SKOR: 95/100</span>
                </div>
                <div className="grid grid-cols-5 gap-1 font-mono text-[10px]">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <div
                      key={n}
                      className={`h-6 rounded flex items-center justify-center font-medium ${
                        n === 4
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-white/[0.08] text-white border border-white/[0.15]'
                      }`}
                    >
                      {n}
                    </div>
                  ))}
                </div>
              </div>

              {/* Unique feature */}
              <div className="space-y-2 text-xs text-[#d1d5db]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  <span>Fitur 1-klik review khusus soal salah</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Prediksi kelulusan & predikat nilai A</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/[0.06]">
              <button
                onClick={onOpenDashboard}
                className="w-full py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs text-white font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Mulai Simulasi Soal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* BENTO 3 (Col 1): Multi-Mapel & Kisi-Kisi Kustom */}
          <div className="layers-card p-6 flex flex-col justify-between group hover:border-white/25 transition-all duration-300">
            <div>
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white mb-3 shadow-inner">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-white">Multi-Mata Pelajaran</h3>
              <p className="text-xs text-[#9496a1] mt-1 mb-3">
                Preloaded 40 kisi-kisi flagship IPA Kelas IX, plus kamu bebas input kisi-kisi Matematika, B. Inggris, IPS, atau mapel apa saja secara instan.
              </p>
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                <span className="layers-pill py-0.5 px-2 text-white bg-white/[0.08] border-white/20">IPA (40 Soal)</span>
                <span className="layers-pill py-0.5 px-2">Matematika</span>
                <span className="layers-pill py-0.5 px-2">B. Inggris</span>
                <span className="layers-pill py-0.5 px-2">IPS</span>
                <span className="layers-pill py-0.5 px-2 text-[#9496a1]">+ Tambah Mapel</span>
              </div>
            </div>
          </div>

          {/* BENTO 4 (Col 2): Printable Smart Cheat Sheet */}
          <div className="layers-card p-6 flex flex-col justify-between group hover:border-white/25 transition-all duration-300">
            <div>
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white mb-3 shadow-inner">
                <Printer className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-white">Cheat Sheet Siap Cetak</h3>
              <p className="text-xs text-[#9496a1] mt-1 mb-3">
                Rangkuman rumus + jembatan keledai praktis tiap mapel yang siap di-print di kertas A4 tanpa bikin boros tinta.
              </p>
              <div className="p-2.5 rounded-xl bg-[#06070a] border border-white/[0.06] font-mono text-[11px] text-white/90">
                <span>V = I × R ➔ </span>
                <span className="text-[#9496a1]">(Veri = Ika × Roni)</span>
              </div>
            </div>
          </div>

          {/* BENTO 5 (Col 3): Zero Setup & Private */}
          <div className="layers-card p-6 flex flex-col justify-between group hover:border-white/25 transition-all duration-300">
            <div>
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white mb-3 shadow-inner">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-white">Privat & Tanpa Install</h3>
              <p className="text-xs text-[#9496a1] mt-1 mb-3">
                Buka langsung di browser HP maupun laptop. Riwayat nilai tersimpan aman di browser kamu.
              </p>
              <div className="flex items-center gap-2 text-[10px] text-white/80 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>End-to-End Local Storage</span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* ======================================================== */}
      {/* 4. PRICING & PASS VIP CARD */}
      {/* ======================================================== */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="layers-card p-8 sm:p-10 border-white/[0.16] shadow-2xl relative overflow-hidden">
          
          {/* Background subtle sheen */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-white/[0.04] to-transparent pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <span className="layers-pill py-0.5 px-3 text-[10px] text-white/90 bg-white/[0.06] border-white/[0.1] font-mono tracking-wider">
                ALL-ACCESS PASS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Akses Penuh Semua Mapel VIP
              </h2>
              <p className="text-xs text-[#9496a1] max-w-md leading-relaxed">
                Hanya seharga uang jajan sekali makan. Akses kisi-kisi lengkap, bebas tambah mapel baru tanpa batas, simulasi berwaktu, dan AI Tutor 24 jam sampai hari H ujian selesai.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-[#d1d5db]">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white/[0.08] text-white flex items-center justify-center text-[10px]">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>Semua Kisi-Kisi Ujian & Mapel Kustom</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white/[0.08] text-white flex items-center justify-center text-[10px]">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>AI Tutor Unlimited 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white/[0.08] text-white flex items-center justify-center text-[10px]">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>Simulasi Ujian Berwaktu Otomatis</span>
                </div>
              </div>
            </div>

            {/* Price Box & CTA */}
            <div className="bg-[#06070a] border border-white/[0.12] rounded-3xl p-6 text-center min-w-[240px] shrink-0 shadow-inner">
              <span className="text-[11px] text-[#9496a1] block">Sekali Bayar</span>
              <div className="text-3xl font-bold font-mono text-white my-1">
                Rp 15.000
              </div>
              <span className="text-[10px] text-[#626573] block mb-4">
                Berlaku sampai ujian selesai
              </span>

              <button
                onClick={onOpenVipModal}
                className="w-full py-2.5 px-5 rounded-full bg-white hover:bg-white/90 text-black text-xs font-semibold transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Key className="w-3.5 h-3.5 text-black" />
                <span>Ambil Akses VIP</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. FOOTER */}
      {/* ======================================================== */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8 text-center text-xs text-[#626573] font-mono">
        <p>pelajarin.ai · Platform Persiapan Ujian VIP · Dibuat Khusus untuk Juara Kelas</p>
      </footer>

    </div>
  );
};
