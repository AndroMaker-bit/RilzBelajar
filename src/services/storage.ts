import type { Subject, Question } from '../types';
import { DEFAULT_SUBJECT } from '../data/defaultIpaData';

const SUBJECTS_KEY = 'study_ai_subjects';
const ACTIVE_SUBJECT_KEY = 'study_ai_active_subject_id';
const QUIZ_HISTORY_KEY = 'study_ai_quiz_history';

export const StorageService = {
  getSubjects(): Subject[] {
    const raw = localStorage.getItem(SUBJECTS_KEY);
    if (!raw) {
      this.saveSubjects([DEFAULT_SUBJECT]);
      return [DEFAULT_SUBJECT];
    }
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return [DEFAULT_SUBJECT];
    } catch {
      return [DEFAULT_SUBJECT];
    }
  },

  saveSubjects(subjects: Subject[]): void {
    localStorage.setItem(SUBJECTS_KEY, JSON.stringify(subjects));
  },

  getActiveSubjectId(): string {
    return localStorage.getItem(ACTIVE_SUBJECT_KEY) || DEFAULT_SUBJECT.id;
  },

  setActiveSubjectId(id: string): void {
    localStorage.setItem(ACTIVE_SUBJECT_KEY, id);
  },

  getActiveSubject(): Subject {
    const subjects = this.getSubjects();
    const activeId = this.getActiveSubjectId();
    return subjects.find((s) => s.id === activeId) || subjects[0] || DEFAULT_SUBJECT;
  },

  addSubject(newSubject: Subject): void {
    const subjects = this.getSubjects();
    subjects.push(newSubject);
    this.saveSubjects(subjects);
    this.setActiveSubjectId(newSubject.id);
  },

  updateSubject(updatedSubject: Subject): void {
    const subjects = this.getSubjects().map((s) =>
      s.id === updatedSubject.id ? updatedSubject : s
    );
    this.saveSubjects(subjects);
  },

  toggleMasteredIndicator(subjectId: string, indicatorId: string): void {
    const subjects = this.getSubjects();
    const subject = subjects.find((s) => s.id === subjectId);
    if (!subject) return;

    const item = subject.kisiKisi.find((k) => k.id === indicatorId);
    if (item) {
      item.mastered = !item.mastered;
      this.saveSubjects(subjects);
    }
  },

  appendGeneratedQuestions(subjectId: string, newQuestions: Question[]): void {
    const subjects = this.getSubjects();
    const subject = subjects.find((s) => s.id === subjectId);
    if (!subject) return;

    // Filter out duplicates by noSoal or questionText
    const existingIds = new Set(subject.questions.map((q) => q.id));
    const toAdd = newQuestions.filter((q) => !existingIds.has(q.id));
    subject.questions = [...subject.questions, ...toAdd];
    this.saveSubjects(subjects);
  },

  saveQuizAttempt(attempt: {
    subjectId: string;
    score: number;
    total: number;
    percentage: number;
    completedAt: number;
  }): void {
    const raw = localStorage.getItem(QUIZ_HISTORY_KEY);
    let history: any[] = [];
    if (raw) {
      try {
        history = JSON.parse(raw);
      } catch {}
    }
    history.unshift(attempt);
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
  },

  getQuizHistory(subjectId?: string): any[] {
    const raw = localStorage.getItem(QUIZ_HISTORY_KEY);
    if (!raw) return [];
    try {
      const history = JSON.parse(raw);
      if (subjectId) {
        return history.filter((h: any) => h.subjectId === subjectId);
      }
      return history;
    } catch {
      return [];
    }
  },
};
