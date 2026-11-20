export type CognitiveLevel = 'C1' | 'C2' | 'C3' | 'C4' | 'C5';
export type QuestionType = 'PG' | 'PG Kompleks' | 'Benar-Salah' | 'Uraian';

export interface KisiKisiItem {
  id: string;
  no: number;
  materi: string;
  bab: string;
  indikator: string;
  levelKognitif: CognitiveLevel;
  bentukSoal: QuestionType;
  mastered?: boolean;
}

export interface Question {
  id: string;
  noSoal: number;
  bab: string;
  materi: string;
  indikator: string;
  level: CognitiveLevel;
  type: QuestionType;
  questionText: string;
  contextText?: string;
  options?: string[]; // for PG
  correctAnswer: number | number[] | boolean | string; // index for PG, array of indices for PG Kompleks, boolean for Benar-Salah
  explanation: string;
  formulaOrConcept?: string;
  trapWarning?: string;
}

export interface Subject {
  id: string;
  name: string;
  grade: string;
  academicYear: string;
  examDate?: string;
  color: string;
  icon: string;
  kisiKisi: KisiKisiItem[];
  questions: Question[];
  cheatSheets: CheatSheetTopic[];
}

export interface CheatSheetTopic {
  id: string;
  bab: string;
  title: string;
  coreConcepts: string[];
  keyFormulas?: { name: string; formula: string; notes: string }[];
  commonTraps: string[];
  mnemonic?: string;
}

export interface QuizSessionState {
  currentQuestionIndex: number;
  answers: Record<number, any>; // noSoal -> answer
  isSubmitted: boolean;
  score: number;
  timeRemainingSeconds: number;
  instantFeedback: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  persona?: 'bro' | 'teacher' | 'socratic';
}

export interface SecurityConfig {
  whitelistPin: string;
  isUnlocked: boolean;
  geminiApiKey: string;
  selectedModel: 'gemini-flash-lite-latest' | 'gemini-flash-latest' | 'gemini-3.8-flash' | 'gemini-2.5-flash';
  lastRequestTimestamp: number;
  dailyRequestCount: number;
}
