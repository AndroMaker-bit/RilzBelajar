import React, { useState, useMemo } from 'react';
import { CheckCircle2, Circle, Search, Target, Bot, AlertCircle, RefreshCw, Printer } from 'lucide-react';
import type { Subject, KisiKisiItem } from '../types';
import { StorageService } from '../services/storage';
import { GeminiService } from '../services/gemini';
import { SecurityService } from '../services/security';
import { soundEffects } from '../services/soundEffects';
import { AASCountdown } from './AASCountdown';

interface KisiKisiTableProps {
  subject: Subject;
  onDrillItem: (item: KisiKisiItem) => void;
  onAskTutor: (item: KisiKisiItem) => void;
  onQuestionsUpdated: () => void;
}

export const KisiKisiTable: React.FC<KisiKisiTableProps> = ({
  subject,
  onDrillItem,
  onAskTutor,
  onQuestionsUpdated,
}) => {
  const [selectedBab, setSelectedBab] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [genMessage, setGenMessage] = useState<{ id: string; text: string; isError?: boolean } | null>(null);

  const babs = useMemo(() => {
    return Array.from(new Set(subject.kisiKisi.map((k) => k.bab)));
  }, [subject.kisiKisi]);

  const filteredItems = useMemo(() => {
    return subject.kisiKisi.filter((item) => {
      const matchBab = selectedBab === 'all' || item.bab === selectedBab;
      const matchLevel = selectedLevel === 'all' || item.levelKognitif === selectedLevel;
      const matchSearch =
        searchQuery === '' ||
        item.materi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.indikator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.no.toString() === searchQuery.trim();
      return matchBab && matchLevel && matchSearch;
    });
  }, [subject.kisiKisi, selectedBab, selectedLevel, searchQuery]);

  const totalItems = subject.kisiKisi.length;
  const masteredCount = subject.kisiKisi.filter((k) => k.mastered).length;
  const masteryPercentage = Math.round((masteredCount / (totalItems || 1)) * 100);

  // Grade Prediction Logic
  const getReadinessStatus = () => {
    if (masteryPercentage >= 80) {
      return {
        badge: '🟢 Siap Predikat A',
        prediction: 'Prediksi Skor: 90 - 100',
        note: 'Kandidat nilai tertinggi kelas! Lanjutkan simulasi berwaktu.',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      };
    }
    if (masteryPercentage >= 50) {
      return {
        badge: '🟡 Siap Ujian',
        prediction: 'Prediksi Skor: 75 - 85',
        note: 'Remedial aman. Drill bab Listrik & Pewarisan Sifat untuk kunci nilai A.',
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      };
    }
    return {
      badge: '⚠️ Kategori Waspada',
      prediction: 'Prediksi Skor: < 70',
      note: 'Wajib drill soal C3/C4 dan gunakan Cheat Sheet sekarang!',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    };
  };

  const readiness = getReadinessStatus();

  const handlePrint = () => {
    window.print();
  };

  const toggleMastered = (item: KisiKisiItem) => {
    StorageService.toggleMasteredIndicator(subject.id, item.id);
    if (!item.mastered) {
      soundEffects.playSuccess();
    } else {
      soundEffects.playClick();
    }
    onQuestionsUpdated();
  };

  const handleGenerateQuestions = async (item: KisiKisiItem) => {
    soundEffects.playClick();
    if (!SecurityService.getApiKey()) {
      soundEffects.playError();
      setGenMessage({
        id: item.id,
        text: 'API Key belum aktif! Buka menu Settings di atas untuk memasukkan key.',
        isError: true,
      });
      return;
    }

    setGeneratingId(item.id);
    setGenMessage(null);
    try {
      const newQuestions = await GeminiService.generateQuestionsForIndicator(item, subject.name);
      StorageService.appendGeneratedQuestions(subject.id, newQuestions);
      soundEffects.playSuccess();
      setGenMessage({
        id: item.id,
        text: `Berhasil generate ${newQuestions.length} variasi soal baru untuk No. ${item.no}! Buka tab 'Simulasi Soal' untuk mencobanya.`,
        isError: false,
      });
      onQuestionsUpdated();
    } catch (err: any) {
      soundEffects.playError();
      setGenMessage({
        id: item.id,
        text: err.message || 'Gagal generate soal.',
        isError: true,
      });
    } finally {
      setGeneratingId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bento Card - Layers Style */}
      <div className="layers-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="layers-pill text-[10px] uppercase font-mono tracking-wider">
                {subject.grade} · {subject.academicYear}
              </span>
              <AASCountdown targetDateStr="2026-11-23T07:30:00+07:00" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
              {subject.name}
            </h1>
            <p className="text-xs text-[#9496a1] max-w-xl leading-relaxed">
              Daftar 40 indikator resmi Asesmen Akhir Semester (AAS). Gunakan kartu indikator untuk menandai pemahaman, latihan soal terarah, atau tanya AI Tutor.
            </p>
          </div>

          {/* Performance Metric Box - Layers Bento Metric Style */}
          <div className="bg-[#06070a] border border-white/[0.08] rounded-2xl p-4 min-w-[260px] shadow-inner space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#9496a1] font-medium">Kesiapan Materi</span>
              <span className="font-mono font-semibold text-emerald-400">{masteryPercentage}%</span>
            </div>

            <div className="w-full bg-[#141722] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${masteryPercentage}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] text-[#626573] font-mono">
              <span>{masteredCount} Dikuasai</span>
              <span>{totalItems - masteredCount} Belum</span>
            </div>

            {/* AI Grade Predictor */}
            <div className="pt-2 border-t border-white/[0.06]">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${readiness.color}`}>
                  {readiness.badge}
                </span>
                <span className="text-[10px] font-mono text-[#d1d5db]">
                  {readiness.prediction}
                </span>
              </div>
              <p className="text-[10px] text-[#626573] mt-1 leading-tight">
                {readiness.note}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Capsule Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Search Capsule */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[#626573] absolute left-4 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari materi, indikator (misal: Coulomb, Ohm, Hemofilia) atau nomor..."
            className="w-full bg-[#0a0c12] border border-white/[0.08] hover:border-white/[0.14] rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-[#626573] focus:outline-none focus:border-white/[0.25] transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <select
            value={selectedBab}
            onChange={(e) => setSelectedBab(e.target.value)}
            className="bg-[#0a0c12] border border-white/[0.08] hover:border-white/[0.14] rounded-full px-3.5 py-2 text-xs text-white focus:outline-none cursor-pointer transition-colors"
          >
            <option value="all">Semua Bab ({totalItems})</option>
            {babs.map((bab) => (
              <option key={bab} value={bab}>
                {bab}
              </option>
            ))}
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-[#0a0c12] border border-white/[0.08] hover:border-white/[0.14] rounded-full px-3.5 py-2 text-xs text-white focus:outline-none cursor-pointer transition-colors"
          >
            <option value="all">Semua Level</option>
            <option value="C1">C1 · Mengingat</option>
            <option value="C2">C2 · Memahami</option>
            <option value="C3">C3 · Menghitung</option>
            <option value="C4">C4 · Analisis (HOTS)</option>
          </select>

          {/* Print / Save PDF Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-[#0a0c12] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.2] rounded-full px-3.5 py-2 text-xs text-[#9496a1] hover:text-white transition-all shrink-0 no-print cursor-pointer"
            title="Cetak atau Simpan PDF Lembar Kisi-Kisi"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cetak / PDF</span>
          </button>
        </div>

      </div>

      {/* Grid of 40 Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`layers-card p-5 flex flex-col justify-between ${
              item.mastered ? 'border-emerald-500/30' : ''
            }`}
          >
            <div>
              {/* Card Meta Row */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-white/[0.06] text-white/90 border border-white/[0.08]">
                    #{item.no.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[11px] font-medium text-[#9496a1]">
                    {item.bab}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="layers-pill py-0.5 px-2 text-[10px] text-white/90 font-mono">
                    {item.levelKognitif}
                  </span>
                  <span className="layers-pill py-0.5 px-2 text-[10px] text-[#626573]">
                    {item.bentukSoal}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-white tracking-tight mb-2">
                {item.materi}
              </h3>

              {/* Indikator Compartment */}
              <div className="layers-inset p-3 text-xs text-[#d1d5db] leading-relaxed">
                {item.indikator}
              </div>
            </div>

            {/* Notification message */}
            {genMessage && genMessage.id === item.id && (
              <div
                className={`mt-3 p-3 rounded-xl text-xs flex items-center gap-2 ${
                  genMessage.isError
                    ? 'bg-rose-950/40 border border-rose-800 text-rose-300'
                    : 'bg-emerald-950/40 border border-emerald-800 text-emerald-300'
                }`}
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{genMessage.text}</span>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/[0.06]">
              
              {/* Mastered toggle */}
              <button
                onClick={() => toggleMastered(item)}
                className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                  item.mastered
                    ? 'text-emerald-400 hover:text-emerald-300'
                    : 'text-[#626573] hover:text-[#9496a1]'
                }`}
              >
                {item.mastered ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Sudah Paham</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-[#626573]" />
                    <span>Tandai Paham</span>
                  </>
                )}
              </button>

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onDrillItem(item);
                  }}
                  title="Drill Simulasi Soal ini"
                  className="layers-pill py-1.5 px-3 text-white bg-white/[0.08] hover:bg-white/[0.14] border-white/[0.12] transition-colors"
                >
                  <Target className="w-3 h-3 mr-1.5" />
                  <span>Drill Soal</span>
                </button>

                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onAskTutor(item);
                  }}
                  title="Tanya AI Tutor tentang materi ini"
                  className="layers-pill py-1.5 px-3 text-[#9496a1] hover:text-white transition-colors"
                >
                  <Bot className="w-3 h-3 mr-1.5" />
                  <span>Tanya AI</span>
                </button>

                <button
                  onClick={() => handleGenerateQuestions(item)}
                  disabled={generatingId === item.id}
                  title="Generate variasi soal baru via Gemini"
                  className="p-1.5 rounded-full bg-[#0a0c12] hover:bg-white/[0.06] border border-white/[0.08] text-[#9496a1] hover:text-white transition-colors disabled:opacity-40"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${generatingId === item.id ? 'animate-spin' : ''}`} />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
