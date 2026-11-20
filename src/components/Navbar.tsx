import React from 'react';
import { Sparkles, BookOpen, Target, Brain, Bot, Plus, Lock, Settings } from 'lucide-react';
import type { Subject } from '../types';
import { soundEffects } from '../services/soundEffects';

interface NavbarProps {
  activeTab: 'kisi-kisi' | 'quiz' | 'cheat-sheet' | 'tutor';
  setActiveTab: (tab: 'kisi-kisi' | 'quiz' | 'cheat-sheet' | 'tutor') => void;
  subjects: Subject[];
  activeSubject: Subject;
  onSelectSubject: (id: string) => void;
  onOpenSettings: () => void;
  onOpenNewSubject: () => void;
  isUnlocked: boolean;
  onBackToLanding?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  subjects,
  activeSubject,
  onSelectSubject,
  onOpenSettings,
  onOpenNewSubject,
  isUnlocked,
  onBackToLanding,
}) => {

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050608]/80 backdrop-blur-xl border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo - Layers Style */}
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-3 shrink-0 text-left hover:opacity-85 transition-opacity cursor-pointer"
            title="Kembali ke Beranda"
          >
            <div className="w-9 h-9 rounded-xl bg-[#0e1017] border border-white/[0.12] flex items-center justify-center shadow-inner">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-tight text-white">
                  pelajarin<span className="text-[#9496a1]">.ai</span>
                </span>
                <span className="layers-pill py-0.5 px-2 text-[10px] text-white/80 bg-white/[0.06] border-white/[0.1]">
                  EXAM VIP
                </span>
              </div>
            </div>
          </button>

          {/* Centered Navigation Capsule - Layers Style */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0e1017]/90 p-1.5 rounded-full border border-white/[0.08] shadow-inner">
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('kisi-kisi');
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'kisi-kisi'
                  ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                  : 'text-[#9496a1] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kisi-Kisi ({activeSubject.kisiKisi.length})</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('quiz');
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'quiz'
                  ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                  : 'text-[#9496a1] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Simulasi Soal</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('cheat-sheet');
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'cheat-sheet'
                  ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                  : 'text-[#9496a1] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Cheat Sheet</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('tutor');
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'tutor'
                  ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                  : 'text-[#9496a1] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Tutor</span>
            </button>
          </nav>

          {/* Right Controls: Subject Switcher & Settings Capsule */}
          <div className="flex items-center gap-2">
            
            {/* Subject Selector Capsule */}
            <div className="relative">
              <select
                value={activeSubject.id}
                onChange={(e) => {
                  soundEffects.playClick();
                  onSelectSubject(e.target.value);
                }}
                className="bg-[#0e1017] border border-white/[0.08] hover:border-white/[0.16] rounded-full px-3 py-1.5 text-xs text-white font-medium focus:outline-none cursor-pointer transition-colors"
              >
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id} className="bg-[#0e1017] text-white">
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenNewSubject();
              }}
              title="Tambah Kisi-Kisi Mapel Baru"
              className="p-1.5 rounded-full bg-[#0e1017] hover:bg-white/[0.06] border border-white/[0.08] text-[#9496a1] hover:text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            {/* Settings Capsule */}
            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenSettings();
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                isUnlocked
                  ? 'bg-[#0e1017] border-white/[0.08] hover:border-white/[0.2] text-[#9496a1] hover:text-white'
                  : 'bg-rose-950/30 border-rose-800/60 text-rose-300'
              }`}
              title="Pengaturan Sistem & Engine AI"
            >
              {isUnlocked ? (
                <>
                  <Settings className="w-3.5 h-3.5 text-white/80" />
                  <span className="hidden sm:inline">Settings</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20" />
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3 text-rose-400" />
                  <span>Kunci Vault</span>
                </>
              )}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2.5 border-t border-white/[0.06]">
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('kisi-kisi');
            }}
            className={`text-xs font-medium ${
              activeTab === 'kisi-kisi' ? 'text-white font-semibold' : 'text-[#9496a1]'
            }`}
          >
            Kisi-Kisi
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('quiz');
            }}
            className={`text-xs font-medium ${
              activeTab === 'quiz' ? 'text-white font-semibold' : 'text-[#9496a1]'
            }`}
          >
            Simulasi
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('cheat-sheet');
            }}
            className={`text-xs font-medium ${
              activeTab === 'cheat-sheet' ? 'text-white font-semibold' : 'text-[#9496a1]'
            }`}
          >
            Cheat Sheet
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('tutor');
            }}
            className={`text-xs font-medium ${
              activeTab === 'tutor' ? 'text-white font-semibold' : 'text-[#9496a1]'
            }`}
          >
            AI Tutor
          </button>
        </div>

      </div>
    </header>
  );
};
