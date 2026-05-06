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
  <div className="absolute -top-[100px] -left-[20px] inset-x-0 h-[45%] flex justify-center pointer-events-none overflow-hidden">
    <div className="relative w-[140%] md:w-[110%] h-full">
      <svg
        viewBox="0 0 1000 400"
        preserveAspectRatio="none"
        className="w-full h-full drop-shadow-[0_10px_30px_rgba(212,175,55,0.4)]"
      >
        <path
          d="M0,0 L1000,0 L1000,100 C1000,100 800,400 500,400 C200,400 0,100 0,100 Z"
          fill="none"
        />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ad924d" />
            <stop offset="50%" stopColor="#f7ef8a" />
            <stop offset="100%" stopColor="#ad924d" />
          </linearGradient>
          <pattern id="islamicPattern" patternUnits="userSpaceOnUse" width="40" height="40">
            <circle cx="20" cy="20" r="1" fill="#ad924d" />
            <path d="M20,0 L40,20 L20,40 L0,20 Z" fill="none" stroke="#ad924d" strokeWidth="0.5" strokeOpacity="0.2" />
          </pattern>
          <mask id="bottomFadeMask">
            <linearGradient id="fadeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0.1" stopColor="white" />
              <stop offset="0.5" stopColor="white" />
              <stop offset="0.9" stopColor="black" />
            </linearGradient>
            <rect width="1000" height="400" fill="url(#fadeGrad)" />
          </mask>
          <mask id="arcMask">
            <path d="M0,0 L1000,0 L1000,100 C1000,100 800,400 500,400 C200,400 0,100 0,100 Z" fill="white" />
          </mask>
        </defs>
        <g mask="url(#bottomFadeMask)">
          <path d="M0,100 C200,400 500,400 800,400 L1000,100" fill="none" stroke="#d4af37" strokeWidth="12" strokeDasharray="2,4" className="opacity-10" />
          <path d="M0,80 C200,380 500,380 800,380 L1000,80" fill="none" stroke="url(#goldGradient)" strokeWidth="4" className="opacity-30" />
          <path d="M0,120 C250,420 750,420 1000,120" fill="none" stroke="#d4af37" strokeWidth="1" className="opacity-10 translate-y-4" />
          <rect width="1000" height="400" fill="url(#islamicPattern)" mask="url(#arcMask)" />
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-8 pt-[116px] pl-[25px]">
        <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 1 }} className="text-gold font-arabic font-bold text-[32px] md:text-[40px] mt-[5px] mb-[-8px] drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">وَخَلَقْنَاكُمْ أَزْوَاجًا</motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="text-white font-cinzel font-medium text-[12px] md:text-[14px] tracking-[0.2em] uppercase">"AND WE CREATED YOU IN PAIRS"</motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="text-white font-cinzel font-normal text-[10px] md:text-[11px] tracking-[0.1em] mt-1">QURAN 78:8</motion.p>
      </div>
    </div>
  </div>
);

const GoldDustBackground = ({ particles }: { particles: Particle[] }) => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#251a36] via-[#2b1e3f] to-[#3a2455] animate-gradient-slow" />
    {particles.map((particle, i) => (
      <div key={i} className="absolute rounded-full" style={{ width: `${particle.size}px`, height: `${particle.size}px`, left: `${particle.left}%`, top: '110%', backgroundColor: particle.color, opacity: 0.2, animation: `floatDust ${particle.duration}s linear infinite`, animationDelay: `${particle.delay}s`, willChange: "transform" }} />
    ))}
  </div>
);

export function WebRoyalPurpleIslamicTemplate({ wedding, onAttend, onNotAttend }: TemplateProps) {
  const date = new Date(wedding.wedding_date);
  const particles = useMemo(() => [...Array(30)].map((_, i) => getParticle(i)), []);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 w-full h-[100dvh] bg-[#2b1e3f] font-serif overflow-hidden flex items-center justify-center p-6 py-2 px-8">
      <GoldDustBackground particles={particles} />
      <div className="relative z-10 flex flex-row gap-[60px] items-center justify-center w-full max-w-6xl h-full">
        <main className="relative w-full max-w-lg h-full max-h-[850px] flex flex-col justify-between text-center border-2 border-gold/25 rounded-[3rem] bg-white/5 backdrop-blur-sm shadow-[12px_12px_30px_rgba(212,175,55,0.12)] overflow-hidden pt-[20px] px-0">
          <GoldArc />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.3, delayChildren: 0.6 }} className="relative z-10 w-full flex-grow flex flex-col items-center justify-between text-center mt-[100px] px-4">
            <motion.div className="flex-shrink-0 flex flex-col items-center justify-start min-h-[140px] pt-8">
              {(wedding.host_selection === 'bride_side' && wedding.bride_father_name) ? (
                <div className={`flex flex-col items-center mb-2 ${wedding.nikah_date ? '' : 'mt-[20px]'}`}>
                  <p className="text-white font-sans text-[12px] tracking-tight font-bold uppercase px-4 mb-[-3px] leading-[1.4]">{wedding.bride_father_name} & {wedding.bride_mother_name}</p>
                  {wedding.bride_place && <p className="text-gold font-sans text-[8px] tracking-widest uppercase font-black">{wedding.bride_place}</p>}
                  <p className="text-white font-sans text-[9px] tracking-[0.15em] font-medium uppercase leading-[1.3] mt-1">REQUEST THE PLEASURE OF YOUR COMPANY<br />ON THE AUSPICIOUS OCCASION OF THE</p>
                </div>
              ) : (wedding.host_selection === 'groom_side' && wedding.groom_father_name) ? (
                <div className={`flex flex-col items-center mb-2 ${wedding.nikah_date ? '' : 'mt-[20px]'}`}>
                  <p className="text-white font-sans text-[12px] tracking-tight font-bold uppercase px-4 mb-[-3px] leading-[1.4]">{wedding.groom_father_name} & {wedding.groom_mother_name}</p>
                  {wedding.groom_place && <p className="text-gold/90 font-sans text-[8px] tracking-widest uppercase font-black">{wedding.groom_place}</p>}
                  <p className="text-white/80 font-sans text-[9px] tracking-[0.15em] font-medium uppercase leading-[1.3] mt-1">REQUEST THE PLEASURE OF YOUR COMPANY<br />ON THE AUSPICIOUS OCCASION OF THE</p>
                </div>
              ) : <div className="h-4 mt-[40px]" />}
              <div className="py-0 mt-1 mb-4">
                <h2 className="text-gold text-[28px] font-script italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Wedding</h2>
                <p className="text-white font-sans text-[9px] tracking-[0.15em] font-medium uppercase mt-[-3px]">OF OUR {wedding.host_selection === 'bride_side' ? 'DAUGHTER' : 'SON'}</p>
              </div>
            </motion.div>

            <motion.div className="flex-grow flex flex-col items-center justify-center w-full px-2 max-h-[300px]">
              <h1 className="w-full font-cinzel text-white leading-tight drop-shadow-[0_5px_20px_rgba(0,0,0,0.4)] px-2">
                <span className="block text-gold text-[clamp(11px,4vw,28px)] leading-[1.1] mt-[5px] px-2 max-w-[280px] mx-auto overflow-visible whitespace-normal">{wedding.host_selection === 'bride_side' ? wedding.bride_name : wedding.groom_name}</span>
                <span className="block text-base font-cinzel text-gold tracking-[0.2em] my-[1px]">with</span>
                <span className="block text-gold text-[clamp(11px,4vw,28px)] leading-[1.2] px-2 max-w-[280px] mx-auto overflow-visible whitespace-normal">{wedding.host_selection === 'bride_side' ? wedding.groom_name : wedding.bride_name}</span>
              </h1>
              <div className="mt-2 mb-1">
                <p className="text-white font-sans text-[9px] tracking-[0.1em] uppercase font-bold px-4 line-clamp-1 opacity-90">{wedding.host_selection === 'bride_side' ? 'S/O' : 'D/O'} {wedding.host_selection === 'bride_side' ? `${wedding.groom_father_name} & ${wedding.groom_mother_name}` : `${wedding.bride_father_name} & ${wedding.bride_mother_name}`}</p>
                <p className="text-white font-sans text-[8px] tracking-widest uppercase mt-0.5 opacity-70">{wedding.host_selection === 'bride_side' ? wedding.groom_place : wedding.bride_place}</p>
              </div>
            </motion.div>

            <motion.div className="flex-shrink-0 w-full flex flex-col items-center justify-end min-h-[160px] mt-[3px]">
              {wedding.nikah_date ? (
                <div className="mb-1.5 w-full px-6">
                  <div className="relative group overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 border-t border-l border-r border-gold/20 rounded-t-[3rem] -z-10" />
                    <div className="pt-3 pb-1 flex flex-col items-center">
                      <p className="text-gold font-sans text-[9px] font-black tracking-[0.3em] uppercase mb-2">The Nikah Ceremony</p>
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-4">
                           <p className="text-white font-serif italic text-lg tracking-wide">{format(new Date(`2000-01-01T${wedding.nikah_time}`), "h:mm a")}</p>
                           <div className="w-1 h-1 bg-gold rounded-full opacity-40 shadow-[0_0_5px_gold]" />
                           <p className="text-white font-sans text-[11px] font-bold uppercase tracking-widest">{new Date(wedding.nikah_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</p>
                        </div>
                        <p className="text-gold font-sans text-[10px] font-black uppercase tracking-widest">{wedding.nikah_islamic_date}</p>
                        <p className="text-white font-sans text-[9px] font-medium uppercase tracking-[0.1em] border-t border-white/5 pt-1 mt-1">{wedding.nikah_location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 mb-5 w-full px-8">
                  <div className="flex items-center justify-center gap-4 mb-4 opacity-80">
                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-gold" />
                    <Sparkles className="text-gold" size={12} />
                    <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-gold" />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gold font-sans text-[8px] font-black tracking-[0.4em] uppercase mb-2">Wedding Reception</p>
                    <div className="flex items-center justify-center gap-6 w-full max-w-[280px]">
                      <div className="flex flex-col items-center">
                         <p className="text-white font-serif italic text-2xl tracking-wide leading-none">{format(date, "h:mm a")}</p>
                         <p className="text-gold/70 font-sans text-[9px] font-bold uppercase tracking-[0.2em] mt-0.5">{date.getHours() >= 12 ? "Evening" : "Morning"}</p>
                      </div>
                      <div className="h-8 w-px bg-gold/30" />
                      <div className="flex flex-col items-center">
                         <p className="text-white font-sans text-[13px] font-bold uppercase tracking-widest">{format(date, "EEEE")}</p>
                         <p className="text-white font-sans text-[9px] font-medium uppercase tracking-[0.1em] opacity-60 mt-0.5">{format(date, "d MMMM")}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                       <MapPin className="text-gold" size={8} />
                       <p className="text-white/80 font-sans text-[8px] font-bold uppercase tracking-[0.1em]">{wedding.venue_name}</p>
                    </div>
                  </div>
                </div>
              )}
              {wedding.nikah_date && (
                <div className="mt-auto w-full px-0 relative z-[200]">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-3 w-full max-w-[340px] px-4">
                      <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                      <p className="text-gold font-sans text-[12px] font-black tracking-[0.2em] uppercase whitespace-nowrap">Wedding Reception</p>
                      <div className="h-[1px] flex-grow bg-gradient-to-r from-gold/40 via-gold/40 to-transparent" />
                    </div>
                    <div className="mt-1 w-full bg-white/[0.05] backdrop-blur-md border border-gold/20 rounded-t-[1.25rem] py-4 px-8">
                      <div className="flex items-center justify-between gap-4 max-w-sm mx-auto">
                        <div className="flex items-center gap-3">
                           <Clock className="text-gold" size={12} />
                           <p className="text-white font-sans text-[11px] font-bold uppercase whitespace-nowrap">{format(date, "h:mm a")} • {format(date, "EEEE, d MMMM")}</p>
                        </div>
                        <div className="flex items-center gap-3 border-l border-gold/10 pl-4 flex-grow justify-end">
                           <MapPin className="text-gold" size={12} />
                           <p className="text-white font-sans text-[10px] font-bold uppercase tracking-tight whitespace-nowrap overflow-hidden">{wedding.venue_name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </main>
        <div className="hidden lg:flex flex-col items-center justify-center h-[60vh] opacity-40">
          <div className="w-[0.5px] h-full bg-gradient-to-b from-transparent via-gold to-transparent" />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="my-8">
            <Sparkles className="text-gold" size={20} />
          </motion.div>
          <div className="w-[0.5px] h-full bg-gradient-to-b from-transparent via-gold to-transparent" />
        </div>
        <aside className="relative w-full max-w-lg h-full max-h-[850px] flex flex-col items-center justify-between p-10 text-center rounded-[3rem] bg-white/5 backdrop-blur-sm shadow-[12px_12px_30px_rgba(212,175,55,0.12)] overflow-hidden">
          <div className="w-full mt-10">
            <p className="text-gold font-sans text-[10px] font-bold tracking-[0.4em] uppercase mb-8">Countdown to Celebration</p>
            <Countdown targetDate={wedding.wedding_date} />
          </div>
          <div className="flex flex-col items-center my-0">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-4" />
            <Sparkles className="text-gold opacity-50" size={32} />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-4" />
          </div>
          <div className="w-full mb-10">
            <h3 className="text-white font-cinzel text-2xl mb-8 tracking-wider">Will you attend?</h3>
            <div className="flex flex-col gap-4 w-full px-4">
              <motion.button onClick={onAttend} className="w-full py-4 border border-gold text-gold font-bold rounded-2xl tracking-widest uppercase text-xs transition-colors bg-gold/10 shadow-lg shadow-gold/5">Insha&apos;Allah will attend</motion.button>
              <motion.button onClick={onNotAttend} className="w-full py-4 border border-white/20 text-white/60 font-bold rounded-2xl tracking-widest uppercase text-xs transition-colors hover:text-white">No, we can&apos;t</motion.button>
            </div>
          </div>
        </aside>
      </div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400&family=Great+Vibes&family=Noto+Naskh+Arabic:wght@700&family=Inter:wght@400;900&family=Cinzel:wght@400;700&display=swap');
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-arabic { font-family: 'Noto Naskh Arabic', serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .text-gold { 
          color: #d4af37;
          background: linear-gradient(135deg, #ad924d 0%, #f7ef8a 50%, #ad924d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes floatDust {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: inherit; }
          90% { opacity: inherit; }
          100% { transform: translateY(-120vh) translateX(30px); opacity: 0; }
        }
        @keyframes gradient-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradient-slow 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
