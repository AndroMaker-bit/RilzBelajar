import React, { useState, useEffect } from 'react';
import { Timer, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface AASCountdownProps {
  targetDateStr?: string; // default: 2026-11-23T07:30:00+07:00
}

export const AASCountdown: React.FC<AASCountdownProps> = ({
  targetDateStr = '2026-11-23T07:30:00+07:00',
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(targetDateStr).getTime();
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  if (timeLeft.isPast) {
    return (
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs font-medium">
        <CheckCircle className="w-3.5 h-3.5" />
        <span>Ujian AAS Sedang / Telah Berlangsung</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#0a0c12]/90 border border-white/[0.12] shadow-inner text-xs">
      {/* Pulsing indicator */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
      </span>

      <div className="flex items-center gap-1.5 text-white font-medium">
        <Timer className="w-3.5 h-3.5 text-cyan-400" />
        <span className="font-semibold text-cyan-300">
          {timeLeft.days > 0 ? `H-${timeLeft.days} Hari` : 'HARI H UJIAN'}
        </span>
      </div>

      <div className="font-mono text-white text-[11px] tracking-wider flex items-center gap-1">
        <span className="px-1.5 py-0.5 rounded bg-white/[0.08] text-white">
          {timeLeft.hours.toString().padStart(2, '0')}
        </span>
        <span className="text-[#626573]">:</span>
        <span className="px-1.5 py-0.5 rounded bg-white/[0.08] text-white">
          {timeLeft.minutes.toString().padStart(2, '0')}
        </span>
        <span className="text-[#626573]">:</span>
        <span className="px-1.5 py-0.5 rounded bg-white/[0.08] text-cyan-300">
          {timeLeft.seconds.toString().padStart(2, '0')}
        </span>
      </div>

      <span className="hidden sm:inline text-[#626573] text-[10px] uppercase font-mono">
        Menuju AAS IPA
      </span>
    </div>
  );
};
