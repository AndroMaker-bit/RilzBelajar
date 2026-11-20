import React, { useState } from 'react';
import type { Subject, KisiKisiItem, Question } from './types';
import { StorageService } from './services/storage';
import { SecurityService } from './services/security';
import { PreferencesService, type AppSettings } from './services/preferences';
import { Navbar } from './components/Navbar';
import { SettingsModal } from './components/SettingsModal';
import { KisiKisiTable } from './components/KisiKisiTable';
import { QuizSimulator } from './components/QuizSimulator';
import { CheatSheetView } from './components/CheatSheetView';
import { AITutorChat } from './components/AITutorChat';
import { NewSubjectModal } from './components/NewSubjectModal';
import { LandingPage } from './components/LandingPage';
import { VipModal } from './components/VipModal';

export const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [subjects, setSubjects] = useState<Subject[]>(StorageService.getSubjects());
  const [activeSubjectId, setActiveSubjectId] = useState<string>(StorageService.getActiveSubjectId());
  const [activeTab, setActiveTab] = useState<'kisi-kisi' | 'quiz' | 'cheat-sheet' | 'tutor'>('kisi-kisi');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(SecurityService.isUnlocked());
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState<boolean>(false);
  const [isNewSubjectModalOpen, setIsNewSubjectModalOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<AppSettings>(PreferencesService.getSettings());

  // Cross-component context passing
  const [targetedItemForQuiz, setTargetedItemForQuiz] = useState<KisiKisiItem | null>(null);
  const [tutorContext, setTutorContext] = useState<KisiKisiItem | Question | null>(null);

  const activeSubject =
    subjects.find((s) => s.id === activeSubjectId) || subjects[0];

  const refreshSubjects = () => {
    setSubjects(StorageService.getSubjects());
  };

  const handleSelectSubject = (id: string) => {
    StorageService.setActiveSubjectId(id);
    setActiveSubjectId(id);
    setTargetedItemForQuiz(null);
    setTutorContext(null);
  };

  const handleDrillItem = (item: KisiKisiItem) => {
    setTargetedItemForQuiz(item);
    setActiveTab('quiz');
  };

  const handleAskTutor = (item: KisiKisiItem) => {
    setTutorContext(item);
    setActiveTab('tutor');
  };

  const handleAskTutorQuestion = (q: Question) => {
    setTutorContext(q);
    setActiveTab('tutor');
  };

  const handleSubjectCreated = (newSubject: Subject) => {
    StorageService.addSubject(newSubject);
    setSubjects(StorageService.getSubjects());
    setActiveSubjectId(newSubject.id);
  };

  return (
    <div className={`relative min-h-screen bg-[#050608] text-white flex flex-col font-sans selection:bg-white/20 selection:text-white ${settings.highContrast ? 'contrast-125' : ''}`}>
      
      {/* Permanent Cinematic Ambient Background Video - Metal Human */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/metal-human.webp"
          style={{ opacity: (settings.ambientVideoOpacity ?? 25) / 100 }}
          className="w-full h-full object-cover filter contrast-125 brightness-95 scale-105 transition-opacity duration-300"
        >
          <source src="/metal-human.mp4" type="video/mp4" />
        </video>
        {/* Subtle vignette & soft blur mask for perfect text readability */}
        {settings.ambientVignette && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/85 via-[#050608]/60 to-[#050608] backdrop-blur-[1px]" />
        )}
      </div>

      {/* ======================================================== */}
      {/* 1. LANDING PAGE VIEW */}
      {/* ======================================================== */}
      {viewMode === 'landing' ? (
        <LandingPage
          onOpenDashboard={() => setViewMode('app')}
          onOpenVipModal={() => setIsVipModalOpen(true)}
          isUnlocked={isUnlocked}
        />
      ) : (
        /* ======================================================== */
        /* 2. MAIN STUDY APP DASHBOARD */
        /* ======================================================== */
        <>
          {/* Navbar */}
          <div className="relative z-40">
            <Navbar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              subjects={subjects}
              activeSubject={activeSubject}
              onSelectSubject={handleSelectSubject}
              onOpenSettings={() => setIsSettingsModalOpen(true)}
              onOpenNewSubject={() => setIsNewSubjectModalOpen(true)}
              isUnlocked={isUnlocked}
              onBackToLanding={() => setViewMode('landing')}
            />
          </div>

          {/* Main Dashboard Container */}
          <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
            {activeTab === 'kisi-kisi' && (
              <KisiKisiTable
                subject={activeSubject}
                onDrillItem={handleDrillItem}
                onAskTutor={handleAskTutor}
                onQuestionsUpdated={refreshSubjects}
              />
            )}

            {activeTab === 'quiz' && (
              <QuizSimulator
                subject={activeSubject}
                targetedItem={targetedItemForQuiz}
                onClearTarget={() => setTargetedItemForQuiz(null)}
                onAskTutorQuestion={handleAskTutorQuestion}
              />
            )}

            {activeTab === 'cheat-sheet' && (
              <CheatSheetView subject={activeSubject} />
            )}

            {activeTab === 'tutor' && (
              <AITutorChat
                subject={activeSubject}
                initialTopicContext={tutorContext}
                onClearContext={() => setTutorContext(null)}
                onOpenSecurity={() => setIsSettingsModalOpen(true)}
              />
            )}
          </main>

          {/* Dashboard Footer */}
          <footer className="relative z-10 border-t border-white/[0.06] py-6 text-center text-xs text-[#626573] font-mono">
            <p>pelajarin.ai · AAS VIP Preparation · 100% Free & Local</p>
          </footer>
        </>
      )}

      {/* Settings & Private Vault Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        isUnlocked={isUnlocked}
        onUnlockedSuccess={() => {
          setIsUnlocked(true);
          setIsSettingsModalOpen(false);
        }}
        onSettingsChange={() => setSettings(PreferencesService.getSettings())}
      />

      {/* VIP Pass & Order Modal */}
      <VipModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
        onUnlockSuccess={() => {
          setIsUnlocked(true);
          setIsVipModalOpen(false);
          setViewMode('app');
        }}
      />

      {/* Add New Subject Modal */}
      <NewSubjectModal
        isOpen={isNewSubjectModalOpen}
        onClose={() => setIsNewSubjectModalOpen(false)}
        onSubjectCreated={handleSubjectCreated}
      />

    </div>
  );
};
export default App;
