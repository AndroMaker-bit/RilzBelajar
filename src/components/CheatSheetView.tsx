import React, { useState } from 'react';
import { Brain, Zap, AlertOctagon, Lightbulb, Copy, Check, Printer } from 'lucide-react';
import type { Subject } from '../types';
import { cleanMathText } from '../utils/mathFormat';

interface CheatSheetViewProps {
  subject: Subject;
}

export const CheatSheetView: React.FC<CheatSheetViewProps> = ({ subject }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    subject.cheatSheets[0]?.id || ''
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeTopic =
    subject.cheatSheets.find((t) => t.id === selectedTopicId) ||
    subject.cheatSheets[0];

  const handleCopyFormula = (formula: string, id: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  if (!activeTopic) {
    return (
      <div className="layers-card p-12 text-center">
        <Brain className="w-8 h-8 text-[#626573] mx-auto mb-2" />
        <p className="text-xs text-[#9496a1]">Belum ada Cheat Sheet untuk mapel ini.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header Banner - Layers Style */}
      <div className="layers-card p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white">Smart Cheat Sheet & Peta Rumus</h2>
              <p className="text-xs text-[#9496a1] mt-0.5">
                Intisari konsep, rumus praktis esensial, jembatan keledai, dan jebakan soal ujian.
              </p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-[#0a0c12] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.2] rounded-full px-4 py-2 text-xs text-[#9496a1] hover:text-white transition-all shrink-0 no-print cursor-pointer self-start sm:self-auto"
            title="Cetak atau Simpan PDF Cheat Sheet"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* Chapter Pills Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {subject.cheatSheets.map((cs) => (
          <button
            key={cs.id}
            onClick={() => setSelectedTopicId(cs.id)}
            className={`layers-pill py-2 px-4 whitespace-nowrap transition-all ${
              activeTopic.id === cs.id
                ? 'bg-white/10 text-white border-white/20'
                : 'hover:text-white'
            }`}
          >
            {cs.bab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        
        {/* Core Concepts */}
        <div className="layers-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-3.5 h-3.5 text-white/90" />
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Konsep Inti Wajib ({activeTopic.bab})
            </h3>
          </div>

          <div className="space-y-2">
            {activeTopic.coreConcepts.map((concept, idx) => (
              <div
                key={idx}
                className="layers-inset p-3.5 text-xs text-[#d1d5db] leading-relaxed flex items-start gap-3"
              >
                <span className="font-mono text-[10px] text-[#626573] mt-0.5">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <span>{cleanMathText(concept)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formulas Grid if any */}
        {activeTopic.keyFormulas && activeTopic.keyFormulas.length > 0 && (
          <div className="layers-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs">📐</span>
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                Rumus Praktis & Perhitungan
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeTopic.keyFormulas.map((f, idx) => (
                <div
                  key={idx}
                  className="layers-inset p-4 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-medium text-[#9496a1]">{f.name}</span>
                    <div className="flex items-center justify-between mt-1.5 mb-2 bg-[#050608] p-2.5 rounded-lg border border-white/[0.08]">
                      <code className="text-xs font-mono font-semibold text-white">
                        {cleanMathText(f.formula)}
                      </code>
                      <button
                        onClick={() => handleCopyFormula(f.formula, `f_${idx}`)}
                        className="text-[#626573] hover:text-white p-1"
                        title="Salin Rumus"
                      >
                        {copiedId === `f_${idx}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#9496a1] leading-relaxed">{cleanMathText(f.notes)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Traps & Mnemonics Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Common Traps */}
          <div className="layers-card p-6 border-rose-500/20">
            <div className="flex items-center gap-2 mb-3">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              <h4 className="text-xs font-semibold text-rose-300 uppercase tracking-wider">
                Jebakan Soal Ujian yang Sering Mengecoh
              </h4>
            </div>

            <ul className="space-y-2 text-xs text-[#d1d5db] leading-relaxed">
              {activeTopic.commonTraps.map((trap, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{cleanMathText(trap)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mnemonics */}
          {activeTopic.mnemonic && (
            <div className="layers-card p-6 flex flex-col justify-between border-white/[0.12]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-white" />
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Jembatan Keledai / Trik Hafalan
                  </h4>
                </div>
                <p className="text-sm font-medium text-white leading-relaxed">
                  "{activeTopic.mnemonic}"
                </p>
              </div>
              <p className="text-[11px] text-[#626573] mt-4 font-mono">
                Gunakan pola di atas saat menjawab cepat di lembar ujian.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
