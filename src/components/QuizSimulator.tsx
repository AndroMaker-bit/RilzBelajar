import React, { useState, useEffect, useMemo } from 'react';
import { Timer, CheckCircle, XCircle, AlertTriangle, ArrowRight, ArrowLeft, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Subject, Question, KisiKisiItem } from '../types';
import { StorageService } from '../services/storage';
import { PreferencesService } from '../services/preferences';
import { soundEffects } from '../services/soundEffects';
import { cleanMathText } from '../utils/mathFormat';

interface QuizSimulatorProps {
  subject: Subject;
  targetedItem?: KisiKisiItem | null;
  onClearTarget?: () => void;
  onAskTutorQuestion: (q: Question) => void;
}

export const QuizSimulator: React.FC<QuizSimulatorProps> = ({
  subject,
  targetedItem,
  onClearTarget,
  onAskTutorQuestion,
}) => {
  const [examMode, setExamMode] = useState<'instant' | 'official'>('instant');
  const [selectedBab, setSelectedBab] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, any>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60 * 45); // 45 minutes
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct'>('all');

  const activeQuestions = useMemo(() => {
    if (targetedItem) {
      const match = subject.questions.filter((q) => q.noSoal === targetedItem.no);
      if (match.length > 0) return match;
    }
    if (selectedBab === 'all') return subject.questions;
    return subject.questions.filter((q) => q.bab === selectedBab);
  }, [subject.questions, targetedItem, selectedBab]);

  const isAnswerCorrect = (q: Question): boolean => {
    const userAns = userAnswers[q.noSoal];
    if (userAns === undefined) return false;

    if (q.type === 'PG Kompleks') {
      const correctArr = (q.correctAnswer as number[]).sort();
      const userArr = ((userAns as number[]) || []).sort();
      return JSON.stringify(correctArr) === JSON.stringify(userArr);
    }
    return userAns === q.correctAnswer;
  };

  const wrongQuestions = useMemo(() => {
    return activeQuestions.filter((q) => userAnswers[q.noSoal] !== undefined && !isAnswerCorrect(q));
  }, [activeQuestions, userAnswers]);

  const correctQuestions = useMemo(() => {
    return activeQuestions.filter((q) => userAnswers[q.noSoal] !== undefined && isAnswerCorrect(q));
  }, [activeQuestions, userAnswers]);

  const displayedQuestions = useMemo(() => {
    if (reviewFilter === 'wrong') return wrongQuestions;
    if (reviewFilter === 'correct') return correctQuestions;
    return activeQuestions;
  }, [activeQuestions, wrongQuestions, correctQuestions, reviewFilter]);

  const babs = useMemo(() => {
    return Array.from(new Set(subject.questions.map((q) => q.bab)));
  }, [subject.questions]);

  const currentQ: Question | undefined = displayedQuestions[currentIndex] || displayedQuestions[0];

  useEffect(() => {
    let interval: any = null;
    if (examMode === 'official' && isTimerRunning && !isSubmitted) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examMode, isTimerRunning, isSubmitted]);

  useEffect(() => {
    setCurrentIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setReviewFilter('all');
    setSecondsRemaining(60 * 45);
    setIsTimerRunning(false);
  }, [selectedBab, targetedItem, examMode]);

  const handleSelectAnswer = (optionIdx: number) => {
    if (isSubmitted && examMode === 'official') return;
    if (!currentQ) return;

    soundEffects.playClick();

    if (currentQ.type === 'PG Kompleks') {
      const current = (userAnswers[currentQ.noSoal] as number[]) || [];
      const updated = current.includes(optionIdx)
        ? current.filter((idx) => idx !== optionIdx)
        : [...current, optionIdx];
      setUserAnswers({ ...userAnswers, [currentQ.noSoal]: updated });
    } else {
      setUserAnswers({ ...userAnswers, [currentQ.noSoal]: optionIdx });
      // In instant practice mode, play feedback sound immediately
      if (examMode === 'instant') {
        if (optionIdx === currentQ.correctAnswer) {
          soundEffects.playSuccess();
        } else {
          soundEffects.playError();
        }
      }
    }
  };

  const calculateScore = () => {
    let correct = 0;
    activeQuestions.forEach((q) => {
      if (isAnswerCorrect(q)) correct++;
    });
    return {
      correct,
      total: activeQuestions.length,
      percentage: Math.round((correct / (activeQuestions.length || 1)) * 100),
    };
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    setIsTimerRunning(false);
    const scoreData = calculateScore();
    StorageService.saveQuizAttempt({
      subjectId: subject.id,
      score: scoreData.correct,
      total: scoreData.total,
      percentage: scoreData.percentage,
      completedAt: Date.now(),
    });

    const settings = PreferencesService.getSettings();

    if (scoreData.percentage >= 80) {
      soundEffects.playSuccess();
      if (settings.confettiEnabled) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } else if (scoreData.percentage >= 60) {
      soundEffects.playSuccess();
    } else {
      soundEffects.playError();
    }
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentQ) {
    return (
      <div className="layers-card p-12 text-center">
        <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
        <h3 className="text-sm font-semibold text-white">Belum Ada Soal untuk Kategori Ini</h3>
        <p className="text-xs text-[#9496a1] mt-1 mb-4">
          Gunakan tombol 'Generate Variasi Baru' di tab Kisi-Kisi untuk membuat soal dengan AI.
        </p>
        {targetedItem && (
          <button
            onClick={onClearTarget}
            className="layers-pill py-2 px-4 text-white bg-white/10"
          >
            Kembali ke Semua Soal
          </button>
        )}
      </div>
    );
  }

  const scoreResult = isSubmitted ? calculateScore() : null;

  return (
    <div className="space-y-6">
      
      {/* Control Bar - Layers Pill Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e1017] p-2.5 rounded-full border border-white/[0.08]">
        
        {/* Left: Mode Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExamMode('instant')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              examMode === 'instant'
                ? 'bg-white/10 text-white border border-white/15'
                : 'text-[#9496a1] hover:text-white'
            }`}
          >
            Mode Latihan (Instant Key)
          </button>
          <button
            onClick={() => {
              setExamMode('official');
              setIsTimerRunning(true);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              examMode === 'official'
                ? 'bg-white/10 text-white border border-white/15'
                : 'text-[#9496a1] hover:text-white'
            }`}
          >
            Simulasi Resmi AAS
          </button>

          {targetedItem && (
            <div className="layers-pill py-1 px-3 text-white bg-white/[0.06] flex items-center gap-1.5">
              <span>Fokus No. {targetedItem.no}</span>
              <button
                onClick={onClearTarget}
                className="text-[#9496a1] hover:text-white font-bold ml-1"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Right: Timer / Filter */}
        <div className="flex items-center gap-2 pr-1">
          {examMode === 'official' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#06070a] border border-white/[0.08] font-mono text-xs font-semibold text-emerald-400">
              <Timer className="w-3.5 h-3.5 text-emerald-400" />
              <span>{formatTimer(secondsRemaining)}</span>
            </div>
          )}

          {!targetedItem && (
            <select
              value={selectedBab}
              onChange={(e) => setSelectedBab(e.target.value)}
              className="bg-[#06070a] border border-white/[0.08] hover:border-white/[0.14] rounded-full px-3.5 py-1.5 text-xs text-white focus:outline-none cursor-pointer transition-colors"
            >
              <option value="all">Semua Bab ({subject.questions.length} Soal)</option>
              {babs.map((bab) => (
                <option key={bab} value={bab}>
                  {bab}
                </option>
              ))}
            </select>
          )}
        </div>

      </div>

      {/* Main Examination Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Question Viewport (Cols 1-3) */}
        <div className="lg:col-span-3 space-y-4">
          
          <div className="layers-card p-6 md:p-8">
            
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-white/[0.06] text-white border border-white/[0.08]">
                  #{currentQ.noSoal.toString().padStart(2, '0')}
                </span>
                <div>
                  <h4 className="text-xs font-semibold text-white">{currentQ.materi}</h4>
                  <p className="text-[11px] text-[#9496a1]">{currentQ.bab} · {currentQ.type}</p>
                </div>
              </div>

              <span className="layers-pill py-0.5 px-2.5 text-[10px] font-mono text-white/90">
                Level {currentQ.level}
              </span>
            </div>

            {/* Context Text */}
            {currentQ.contextText && (
              <div className="layers-inset p-4 text-xs text-[#d1d5db] italic mb-5 leading-relaxed">
                "{currentQ.contextText}"
              </div>
            )}

            {/* Question Text */}
            <div className="text-sm font-medium text-white leading-relaxed mb-6">
              {cleanMathText(currentQ.questionText)}
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.options?.map((option, idx) => {
                const isSelected =
                  currentQ.type === 'PG Kompleks'
                    ? ((userAnswers[currentQ.noSoal] as number[]) || []).includes(idx)
                    : userAnswers[currentQ.noSoal] === idx;

                const isCorrectOption =
                  currentQ.type === 'PG Kompleks'
                    ? (currentQ.correctAnswer as number[]).includes(idx)
                    : currentQ.correctAnswer === idx;

                const showInstantKey =
                  examMode === 'instant' && userAnswers[currentQ.noSoal] !== undefined;

                let cardStyle = 'bg-[#06070a] border-white/[0.08] hover:border-white/[0.16] text-[#d1d5db]';
                if (isSelected) {
                  cardStyle = 'bg-white/[0.08] border-white/[0.25] text-white shadow-inner';
                }

                if (showInstantKey || isSubmitted) {
                  if (isCorrectOption) {
                    cardStyle = 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200';
                  } else if (isSelected && !isCorrectOption) {
                    cardStyle = 'bg-rose-950/30 border-rose-500/60 text-rose-200';
                  }
                }

                const letter = String.fromCharCode(65 + idx);

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`w-full text-left p-4 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${cardStyle}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md text-xs font-mono font-semibold flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-white text-black'
                          : 'bg-[#141722] text-[#9496a1]'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="text-xs leading-relaxed mt-0.5">{cleanMathText(option)}</span>
                  </button>
                );
              })}
            </div>

            {/* Instant Mode: Explanation Compartment */}
            {(examMode === 'instant' && userAnswers[currentQ.noSoal] !== undefined) || isSubmitted ? (
              <div className="mt-6 pt-6 border-t border-white/[0.06] space-y-3">
                <div
                  className={`p-4 rounded-xl border ${
                    isAnswerCorrect(currentQ)
                      ? 'bg-emerald-950/20 border-emerald-800/40'
                      : 'bg-rose-950/20 border-rose-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {isAnswerCorrect(currentQ) ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-semibold text-emerald-300">
                          Jawaban Benar
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span className="text-xs font-semibold text-rose-300">
                          Jawaban Kurang Tepat
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-[#d1d5db] leading-relaxed mb-3">
                    <strong className="text-white">Pembahasan: </strong>
                    {cleanMathText(currentQ.explanation)}
                  </p>

                  {currentQ.formulaOrConcept && (
                    <div className="layers-inset p-2.5 text-[11px] text-white/90 font-mono mb-2">
                      💡 Konsep: {cleanMathText(currentQ.formulaOrConcept)}
                    </div>
                  )}

                  {currentQ.trapWarning && (
                    <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/30 text-[11px] text-amber-300">
                      ⚠️ Jebakan Ujian: {cleanMathText(currentQ.trapWarning)}
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onAskTutorQuestion(currentQ)}
                      className="text-xs text-white hover:text-white/80 underline font-medium"
                    >
                      Tanya AI Tutor tentang nomor ini &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/[0.06]">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="layers-pill py-2 px-4 text-white disabled:opacity-30 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                <span>Sebelumnya</span>
              </button>

              <span className="text-xs text-[#626573] font-mono">
                {displayedQuestions.length > 0 ? currentIndex + 1 : 0} / {displayedQuestions.length}
              </span>

              {currentIndex < displayedQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => Math.min(displayedQuestions.length - 1, prev + 1))}
                  className="layers-pill py-2 px-4 text-white bg-white/10 hover:bg-white/15 border-white/20 transition-colors"
                >
                  <span>Berikutnya</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
              ) : (
                !isSubmitted && (
                  <button
                    onClick={handleSubmitQuiz}
                    className="layers-pill py-2 px-4 text-white bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/40 font-semibold cursor-pointer"
                  >
                    <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                    <span>Selesai & Kumpulkan</span>
                  </button>
                )
              )}
            </div>

          </div>

          {/* Submission Scorecard */}
          {scoreResult && (
            <div className="layers-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-emerald-500/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Hasil Simulasi AAS</h3>
                  <p className="text-xs text-[#9496a1]">
                    Benar: <span className="text-emerald-400 font-bold">{scoreResult.correct}</span> dari {scoreResult.total} soal
                  </p>
                  {wrongQuestions.length > 0 ? (
                    <button
                      onClick={() => {
                        setReviewFilter('wrong');
                        setCurrentIndex(0);
                      }}
                      className="mt-2 text-xs text-rose-300 hover:text-rose-200 underline font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <span>🔍 Review {wrongQuestions.length} Soal yang Salah Saja</span>
                    </button>
                  ) : (
                    <span className="inline-block mt-1 text-[11px] text-emerald-400 font-medium">
                      🎉 Luar biasa! Sempurna tanpa ada soal yang salah
                    </span>
                  )}
                </div>
              </div>

              <div className="text-center sm:text-right">
                <div className="text-3xl font-bold font-mono text-white">
                  {scoreResult.percentage}
                </div>
                <span className="text-[10px] text-[#626573] uppercase font-semibold">Skor (Skala 100)</span>
              </div>
            </div>
          )}

        </div>

        {/* Question Map Palette (Col 4) */}
        <div className="space-y-4">
          <div className="layers-card p-4">
            <h4 className="text-xs font-semibold text-white mb-2.5 flex items-center justify-between">
              <span>Peta Soal</span>
              <span className="font-mono text-[10px] text-[#626573]">
                {Object.keys(userAnswers).length}/{activeQuestions.length}
              </span>
            </h4>

            {/* Filter Pills for Review */}
            {(isSubmitted || (examMode === 'instant' && Object.keys(userAnswers).length > 0)) && (
              <div className="flex items-center gap-1 p-1 rounded-xl bg-[#06070a] border border-white/[0.08] mb-3 text-[10px]">
                <button
                  onClick={() => {
                    setReviewFilter('all');
                    setCurrentIndex(0);
                  }}
                  className={`flex-1 py-1 px-1.5 rounded-lg font-medium transition-all text-center cursor-pointer ${
                    reviewFilter === 'all'
                      ? 'bg-white/10 text-white border border-white/10'
                      : 'text-[#626573] hover:text-white'
                  }`}
                >
                  Semua ({activeQuestions.length})
                </button>

                <button
                  onClick={() => {
                    setReviewFilter('wrong');
                    setCurrentIndex(0);
                  }}
                  className={`flex-1 py-1 px-1.5 rounded-lg font-medium transition-all text-center cursor-pointer ${
                    reviewFilter === 'wrong'
                      ? 'bg-rose-950/50 text-rose-300 border border-rose-800'
                      : 'text-rose-400/60 hover:text-rose-300'
                  }`}
                >
                  Salah ({wrongQuestions.length})
                </button>

                <button
                  onClick={() => {
                    setReviewFilter('correct');
                    setCurrentIndex(0);
                  }}
                  className={`flex-1 py-1 px-1.5 rounded-lg font-medium transition-all text-center cursor-pointer ${
                    reviewFilter === 'correct'
                      ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800'
                      : 'text-emerald-400/60 hover:text-emerald-300'
                  }`}
                >
                  Benar ({correctQuestions.length})
                </button>
              </div>
            )}

            {/* Empty state when filter has 0 items */}
            {displayedQuestions.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#626573]">
                <p>Tidak ada soal pada kategori ini.</p>
                <button
                  onClick={() => {
                    setReviewFilter('all');
                    setCurrentIndex(0);
                  }}
                  className="mt-2 text-white hover:underline text-[11px] cursor-pointer"
                >
                  Lihat Semua Soal
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-1.5 max-h-[360px] overflow-y-auto pr-1">
                {displayedQuestions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = userAnswers[q.noSoal] !== undefined;
                  let btnStyle = 'bg-[#06070a] border-white/[0.08] text-[#626573]';

                  if (isAnswered) {
                    btnStyle = 'bg-white/[0.08] border-white/[0.18] text-white';
                  }

                  if ((examMode === 'instant' && isAnswered) || isSubmitted) {
                    if (isAnswerCorrect(q)) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold';
                    } else {
                      btnStyle = 'bg-rose-500/20 border-rose-500/40 text-rose-300 font-bold';
                    }
                  }

                  if (isCurrent) {
                    btnStyle += ' ring-2 ring-white/50';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-8 rounded-lg border text-xs font-mono font-medium transition-all ${btnStyle}`}
                    >
                      {q.noSoal}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-1.5 text-[10px] text-[#626573]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Benar</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>Salah</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/40" />
                <span>Sudah Dijawab</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
