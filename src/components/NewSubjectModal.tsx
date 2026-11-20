import React, { useState } from 'react';
import { X, Sparkles, BookPlus, AlertCircle, RefreshCw } from 'lucide-react';
import type { Subject, KisiKisiItem } from '../types';
import { GeminiService } from '../services/gemini';
import { SecurityService } from '../services/security';

interface NewSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubjectCreated: (subject: Subject) => void;
}

export const NewSubjectModal: React.FC<NewSubjectModalProps> = ({
  isOpen,
  onClose,
  onSubjectCreated,
}) => {
  const [subjectName, setSubjectName] = useState('');
  const [grade] = useState('Kelas IX (Sembilan)');
  const [examDate, setExamDate] = useState('Senin Besok');
  const [rawKisiKisi, setRawKisiKisi] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState('');

  if (!isOpen) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName.trim()) {
      setParseError('Nama mata pelajaran wajib diisi.');
      return;
    }

    let parsedItems: KisiKisiItem[] = [];

    if (rawKisiKisi.trim()) {
      if (SecurityService.getApiKey()) {
        setIsParsing(true);
        setParseError('');
        try {
          parsedItems = await GeminiService.parseKisiKisiText(rawKisiKisi, subjectName);
        } catch (err: any) {
          setParseError(err.message || 'Gagal parse kisi-kisi dengan AI.');
          setIsParsing(false);
          return;
        }
        setIsParsing(false);
      } else {
        const lines = rawKisiKisi
          .split('\n')
          .map((l) => l.trim())
          .filter((l) => l.length > 0 && !l.startsWith('| No') && !l.startsWith('|-'));

        parsedItems = lines.map((line, idx) => {
          const parts = line.split('|').map((p) => p.trim()).filter(Boolean);
          if (parts.length >= 3) {
            return {
              id: `k_${Date.now()}_${idx + 1}`,
              no: parseInt(parts[0], 10) || idx + 1,
              bab: parts[1] || 'Bab Umum',
              materi: parts[1] || 'Materi Pokok',
              indikator: parts[2] || line,
              levelKognitif: (parts[3] as any) || 'C2',
              bentukSoal: (parts[4] as any) || 'PG',
            };
          }
          return {
            id: `k_${Date.now()}_${idx + 1}`,
            no: idx + 1,
            bab: 'Bab 1',
            materi: subjectName,
            indikator: line,
            levelKognitif: 'C2',
            bentukSoal: 'PG',
          };
        });
      }
    }

    const newSubject: Subject = {
      id: `sub_${Date.now()}`,
      name: subjectName.trim(),
      grade: grade.trim(),
      academicYear: '2026/2027',
      examDate: examDate.trim(),
      color: 'from-slate-700 to-slate-900',
      icon: 'Book',
      kisiKisi: parsedItems,
      questions: [],
      cheatSheets: [
        {
          id: `cs_${Date.now()}`,
          bab: 'Ringkasan Materi',
          title: `Cheat Sheet ${subjectName}`,
          coreConcepts: parsedItems.slice(0, 5).map((k) => `${k.materi}: ${k.indikator}`),
          commonTraps: ['Perhatikan kata kunci soal seperti "kecuali" atau "bukan".'],
        },
      ],
    };

    onSubjectCreated(newSubject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-lg layers-card p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-[#626573] hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.06]">
          <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white">
            <BookPlus className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Tambah Kisi-Kisi Mapel Baru</h2>
            <p className="text-xs text-[#9496a1]">Tempel tabel kisi-kisi guru untuk auto-parse AI</p>
          </div>
        </div>

        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#9496a1] mb-1.5">
                Nama Mata Pelajaran
              </label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Misal: Matematika, B. Inggris..."
                className="w-full bg-[#06070a] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/[0.25]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9496a1] mb-1.5">
                Target Ujian
              </label>
              <input
                type="text"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                placeholder="Misal: Selasa, 24 Nov 2026"
                className="w-full bg-[#06070a] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/[0.25]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-[#9496a1] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-white" />
                <span>Paste Tabel / Teks Kisi-Kisi Guru</span>
              </label>
              <span className="text-[10px] text-[#626573] font-mono">Auto-Extract AI</span>
            </div>
            <textarea
              rows={6}
              value={rawKisiKisi}
              onChange={(e) => setRawKisiKisi(e.target.value)}
              placeholder="Paste baris tabel kisi-kisi atau indikator soal di sini..."
              className="w-full bg-[#06070a] border border-white/[0.08] rounded-xl p-3 text-xs text-white font-mono placeholder-[#626573] focus:outline-none focus:border-white/[0.25]"
            />
          </div>

          {parseError && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="layers-pill py-2 px-4 hover:text-white transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isParsing}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-xs transition-colors disabled:opacity-40"
            >
              {isParsing && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              <span>{isParsing ? 'Mengekstrak AI...' : 'Simpan & Buat Mapel'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
