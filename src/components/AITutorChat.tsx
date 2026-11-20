import React, { useState, useRef, useEffect } from 'react';
import { Bot, ArrowUp, Sparkles, User, AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';
import type { Subject, ChatMessage, KisiKisiItem, Question } from '../types';
import { GeminiService } from '../services/gemini';
import { SecurityService } from '../services/security';
import { soundEffects } from '../services/soundEffects';
import { cleanMathText } from '../utils/mathFormat';

interface AITutorChatProps {
  subject: Subject;
  initialTopicContext?: KisiKisiItem | Question | null;
  onClearContext?: () => void;
  onOpenSecurity: () => void;
}

export const AITutorChat: React.FC<AITutorChatProps> = ({
  subject,
  initialTopicContext,
  onClearContext,
  onOpenSecurity,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Halo! Gw AI Tutor pendamping belajar Asesmen Akhir Semester lu untuk ${subject.name}. 

Tanyain konsep materi yang belum paham, rumus yang bikin pusing, atau minta trik nalar cepat ngerjain soal ujian langsung ke intinya. Mau bahas topik nomor berapa kita?`,
      timestamp: Date.now(),
      persona: 'bro',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [persona, setPersona] = useState<'bro' | 'teacher' | 'socratic'>('bro');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialTopicContext) {
      const topicName = (initialTopicContext as any).materi || 'Materi Kisi-Kisi';
      const indicator = (initialTopicContext as any).indikator || '';
      setInputText(`Tolong jelasin konsep materi "${topicName}" (${indicator}) dengan trik nalar paling gampang tanpa rumus rumit dan kasih contoh tipe soalnya!`);
    }
  }, [initialTopicContext]);

  const quickPrompts = [
    'Trik nalar cepet Hukum Coulomb kalau jarak diubah!',
    'Kenapa laki-laki lebih gampang hemofilia dibanding perempuan?',
    'Bedain gerak sadar sama gerak refleks secara simpel!',
    'Trik cepat persilangan dihibrid 9:3:3:1!',
    'Hukum I Kirchhoff & cara hitung hambatan paralel!',
  ];

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isLoading) return;

    soundEffects.playClick();

    const apiKey = SecurityService.getApiKey();
    if (!apiKey) {
      soundEffects.playError();
      setErrorMessage('Gemini API Key belum dimasukkan! Buka pengaturan Security untuk memasukkan key.');
      return;
    }

    setErrorMessage('');
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const topicContext = (initialTopicContext as any)?.materi || '';
      const indicatorContext = (initialTopicContext as any)?.indikator || '';

      const historyFormatted = messages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .slice(-6)
        .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }));

      const reply = await GeminiService.askTutor(
        userMsg.content,
        {
          subjectName: subject.name,
          currentTopic: topicContext,
          relatedIndicator: indicatorContext,
        },
        persona,
        historyFormatted
      );

      soundEffects.playSuccess();

      const assistantMsg: ChatMessage = {
        id: `reply_${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
        persona,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      soundEffects.playError();
      setErrorMessage(err.message || 'Gagal menghubungi AI Tutor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] min-h-[550px] layers-card overflow-hidden">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#0a0c12] border-b border-white/[0.06]">
        
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white flex items-center gap-2">
              <span>24/7 AI Private Tutor</span>
              <span className="layers-pill py-0.5 px-2 text-[10px] text-white/90">
                Grounded on Exam
              </span>
            </h3>
            <p className="text-[11px] text-[#9496a1]">Penjelasan nalar praktis langsung ke inti konsep</p>
          </div>
        </div>

        {/* Persona Switcher - Layers Pill Style */}
        <div className="flex items-center gap-1.5 bg-[#06070a] p-1 rounded-full border border-white/[0.08]">
          <button
            onClick={() => setPersona('bro')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              persona === 'bro'
                ? 'bg-white/10 text-white border border-white/15'
                : 'text-[#9496a1] hover:text-white'
            }`}
          >
            Bro Santai
          </button>
          <button
            onClick={() => setPersona('teacher')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              persona === 'teacher'
                ? 'bg-white/10 text-white border border-white/15'
                : 'text-[#9496a1] hover:text-white'
            }`}
          >
            Guru Privat
          </button>
          <button
            onClick={() => setPersona('socratic')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              persona === 'socratic'
                ? 'bg-white/10 text-white border border-white/15'
                : 'text-[#9496a1] hover:text-white'
            }`}
          >
            Sokrates
          </button>
        </div>

      </div>

      {/* Target Context Pill if any */}
      {initialTopicContext && (
        <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/[0.06] text-xs text-white">
          <div className="flex items-center gap-2 truncate">
            <Sparkles className="w-3.5 h-3.5 text-white/80 shrink-0" />
            <span className="truncate">
              Konteks Aktif: <strong>{(initialTopicContext as any).materi || 'Soal AAS'}</strong>
            </span>
          </div>
          <button
            onClick={onClearContext}
            className="text-xs text-[#9496a1] hover:text-white font-bold ml-2 shrink-0"
          >
            ✕
          </button>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-white shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-white/10 border border-white/20 text-white'
                  : 'layers-inset text-[#d1d5db]'
              }`}
            >
              <div className="whitespace-pre-wrap">{cleanMathText(msg.content)}</div>
              <div
                className={`text-[9px] mt-2 font-mono ${
                  msg.role === 'user' ? 'text-white/60 text-right' : 'text-[#626573]'
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center text-white shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-white shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="layers-inset p-3.5 text-xs text-[#9496a1] flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
              <span>AI Tutor lagi menyusun analogi paling simpel...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="px-4 py-2.5 bg-rose-950/40 border-t border-rose-800 text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={onOpenSecurity}
            className="text-[11px] underline font-bold text-white ml-2"
          >
            Pengaturan API
          </button>
        </div>
      )}

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 bg-[#06070a] border-t border-white/[0.06] flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[10px] text-[#626573] font-mono uppercase tracking-wider shrink-0 flex items-center gap-1">
          <MessageSquare className="w-3 h-3" /> Ide:
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="layers-pill py-1 px-3 text-[11px] whitespace-nowrap hover:text-white"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Capsule Bar - Layers Pill Input */}
      <div className="p-3 bg-[#0a0c12] border-t border-white/[0.06]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-[#06070a] border border-white/[0.08] hover:border-white/[0.16] rounded-full px-4 py-1.5 transition-colors"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tanyakan rumus, konsep, atau bedah soal ujian di sini..."
            className="flex-1 bg-transparent text-xs text-white placeholder-[#626573] focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="w-7 h-7 rounded-full bg-white text-black hover:bg-white/90 flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:bg-white"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
};
