"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { Sparkles, Clock, MapPin } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Countdown } from "../Countdown";
import { Wedding } from "@/types/wedding";

interface Particle {
  size: number;
  duration: number;
  delay: number;
  left: number;
  color: string;
}

const getParticle = (i: number): Particle => ({
  size: (i * 5.17 % 1.5) + 1,
  duration: (i * 11.23 % 10) + 10,
  delay: (i * 17.31 % 20) - 20,
  left: (i * 31.47 % 100),
  color: i % 2 === 0 ? '#D4AF37' : '#E6C76B'
});

interface TemplateProps {
  wedding: Wedding;
  onAttend?: () => void;
  onNotAttend?: () => void;
}

const GoldArc = () => (
  <div className="absolute -top-[50px] -left-[10px] inset-x-0 h-[30%] flex justify-center pointer-events-none overflow-hidden">
    <div className="relative w-[120%] h-full">
      <svg viewBox="0 0 1000 400" preserveAspectRatio="none" className="w-full h-full opacity-40">
        <defs>
          <linearGradient id="goldGradientMobile" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ad924d" />
            <stop offset="50%" stopColor="#f7ef8a" />
            <stop offset="100%" stopColor="#ad924d" />
          </linearGradient>
        </defs>
        <path d="M0,80 C200,380 500,380 800,380 L1000,80" fill="none" stroke="url(#goldGradientMobile)" strokeWidth="4" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
        <p className="text-gold font-arabic font-bold text-[24px]">وَخَلَقْنَاكُمْ أَزْوَاجًا</p>
      </div>
    </div>
  </div>
);

const GoldDustBackground = ({ particles }: { particles: Particle[] }) => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute inset-0 bg-[#2b1e3f]" />
    {particles.map((particle, i) => (
      <div key={i} className="absolute rounded-full" style={{ width: `${particle.size}px`, height: `${particle.size}px`, left: `${particle.left}%`, top: '110%', backgroundColor: particle.color, opacity: 0.2, animation: `floatDust ${particle.duration}s linear infinite`, animationDelay: `${particle.delay}s` }} />
    ))}
  </div>
);

export function MobileRoyalPurpleIslamicTemplate({ wedding, onAttend, onNotAttend }: TemplateProps) {
  const date = new Date(wedding.wedding_date);
  const particles = useMemo(() => [...Array(20)].map((_, i) => getParticle(i)), []);

  return (
    <div className="relative min-h-screen w-full bg-[#2b1e3f] font-serif overflow-y-auto pt-20 pb-10 px-4">
      <GoldDustBackground particles={particles} />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto space-y-8">
        <main className="relative w-full border-2 border-gold/20 rounded-[2.5rem] bg-white/5 backdrop-blur-md p-6 pt-12 text-center shadow-2xl">
          <GoldArc />
          
          <div className="mt-10 space-y-6">
            {(wedding.host_selection === 'bride_side' && wedding.bride_father_name) ? (
              <div className="space-y-1">
                <p className="text-white text-[11px] font-bold uppercase tracking-tight">{wedding.bride_father_name} & {wedding.bride_mother_name}</p>
                <p className="text-gold text-[9px] uppercase tracking-widest">{wedding.bride_place}</p>
              </div>
            ) : (wedding.host_selection === 'groom_side' && wedding.groom_father_name) ? (
              <div className="space-y-1">
                <p className="text-white text-[11px] font-bold uppercase tracking-tight">{wedding.groom_father_name} & {wedding.groom_mother_name}</p>
                <p className="text-gold text-[9px] uppercase tracking-widest">{wedding.groom_place}</p>
              </div>
            ) : null}

            <div className="py-2">
              <h2 className="text-gold text-3xl font-script italic">Wedding</h2>
              <p className="text-white text-[10px] tracking-[0.2em] uppercase font-medium">OF OUR {wedding.host_selection === 'bride_side' ? 'DAUGHTER' : 'SON'}</p>
            </div>

            <h1 className="space-y-2">
              <span className="block text-gold text-3xl font-cinzel leading-tight">{wedding.host_selection === 'bride_side' ? wedding.bride_name : wedding.groom_name}</span>
              <span className="block text-xs font-cinzel text-gold/60 tracking-widest italic">with</span>
              <span className="block text-gold text-3xl font-cinzel leading-tight">{wedding.host_selection === 'bride_side' ? wedding.groom_name : wedding.bride_name}</span>
            </h1>

            <div className="text-white/80 text-[10px] uppercase font-bold tracking-wider">
              <p>{wedding.host_selection === 'bride_side' ? 'S/O' : 'D/O'} {wedding.host_selection === 'bride_side' ? `${wedding.groom_father_name} & ${wedding.groom_mother_name}` : `${wedding.bride_father_name} & ${wedding.bride_mother_name}`}</p>
            </div>

            {wedding.nikah_date && (
              <div className="pt-6 border-t border-gold/10 space-y-2">
                <p className="text-gold text-[10px] font-black uppercase tracking-widest">The Nikah Ceremony</p>
                <div className="flex justify-center items-center gap-3 text-white text-sm">
                  <span>{format(new Date(`2000-01-01T${wedding.nikah_time}`), "h:mm a")}</span>
                  <div className="w-1 h-1 bg-gold rounded-full" />
                  <span>{new Date(wedding.nikah_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span>
                </div>
                <p className="text-white/60 text-[9px] uppercase">{wedding.nikah_location}</p>
              </div>
            )}

            <div className="pt-6 border-t border-gold/10 space-y-2">
              <p className="text-gold text-[10px] font-black uppercase tracking-widest">Wedding Reception</p>
              <div className="flex justify-center items-center gap-3 text-white text-sm">
                <span>{format(date, "h:mm a")}</span>
                <div className="w-1 h-1 bg-gold rounded-full" />
                <span>{format(date, "EEEE, d MMM")}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-white/80 text-[10px] font-bold">
                <MapPin size={10} className="text-gold" />
                <span>{wedding.venue_name}</span>
              </div>
            </div>
          </div>
        </main>

        <div className="w-full border-2 border-gold/20 rounded-[2rem] bg-white/5 backdrop-blur-md p-6 text-center space-y-4">
          <p className="text-gold text-[10px] font-bold tracking-widest uppercase">Countdown</p>
          <Countdown targetDate={wedding.wedding_date} />
        </div>

        <div className="w-full border-2 border-gold/20 rounded-[2rem] bg-white/5 backdrop-blur-md p-8 text-center space-y-6">
          <h3 className="text-white font-cinzel text-xl tracking-wider">Will you attend?</h3>
          <div className="flex flex-col gap-3">
            <button onClick={onAttend} className="w-full py-4 bg-gold text-white font-bold rounded-xl tracking-widest uppercase text-xs">Insha&apos;Allah will attend</button>
            <button onClick={onNotAttend} className="w-full py-4 border border-white/20 text-white/60 font-bold rounded-xl tracking-widest uppercase text-xs">No, we can&apos;t</button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Noto+Naskh+Arabic:wght@700&family=Cinzel:wght@400;700&display=swap');
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-arabic { font-family: 'Noto Naskh Arabic', serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        @keyframes floatDust {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.2; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-120vh) translateX(20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
