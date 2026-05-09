"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { Sparkles, Clock, MapPin, Calendar } from "lucide-react";
import { useMemo, useEffect } from "react";
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
      <svg viewBox="0 0 1000 400" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_10px_30px_rgba(212,175,55,0.4)]">
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
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="text-white font-cinzel font-medium text-[12px] md:text-[14px] tracking-[0.2em] uppercase">&quot;AND WE CREATED YOU IN PAIRS&quot;</motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="text-white font-cinzel font-normal text-[10px] md:text-[11px] tracking-[0.1em] mt-1">QURAN 78:8</motion.p>
      </div>
    </div>
  </div>
);

const GoldDustBackground = ({ particles }: { particles: Particle[] }) => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1226] via-[#241935] to-[#2d1b44] animate-gradient-slow" />
    {particles.map((particle, i) => (
      <div key={i} className="absolute rounded-full" style={{ width: `${particle.size}px`, height: `${particle.size}px`, left: `${particle.left}%`, top: '110%', backgroundColor: particle.color, opacity: 0.2, animation: `floatDust ${particle.duration}s linear infinite`, animationDelay: `${particle.delay}s`, willChange: "transform" }} />
    ))}
  </div>
);

export function WebRoyalPurpleMajesticTemplate({ wedding, onAttend, onNotAttend }: TemplateProps) {
  const date = new Date(wedding.wedding_date);
  const particles = useMemo(() => [...Array(40)].map((_, i) => getParticle(i)), []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  return (
    <div className="web-template-container left-0 right-0 z-40 w-full bg-[#1a1226] font-serif p-0 lg:p-6 lg:py-2 lg:px-8 lg:fixed lg:top-0 lg:h-[100dvh] lg:overflow-hidden flex flex-col lg:flex-row items-center lg:justify-center overflow-y-auto min-h-screen relative">
      <GoldDustBackground particles={particles} />
      <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-[60px] items-center justify-center w-full max-w-6xl h-full">
        <main className="relative w-full royal-purple-main-card flex flex-col justify-between text-center border-2 border-gold/30 rounded-[2.5rem] lg:rounded-[3rem] bg-white/5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden px-0 pt-4 lg:pt-[20px] pb-0 lg:max-w-lg lg:h-full lg:max-h-[715px]">
          <GoldArc />
          
          <motion.div 
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.6 } } }} 
            initial="hidden" 
            animate="show" 
            className="relative z-10 w-full flex-grow flex flex-col items-center justify-between text-center mt-[75px] lg:mt-[100px] px-2 lg:px-4"
          >
            {/* Header Section */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="flex-shrink-0 flex flex-col items-center pt-4 lg:pt-8">
              {((wedding.host_selection === 'bride_side' && wedding.bride_father_name) || (wedding.host_selection === 'groom_side' && wedding.groom_father_name)) && (
                <div className="flex flex-col items-center mb-1 lg:mb-2 mt-[45px]">
                  <p className="text-white font-sans text-[10px] lg:text-[12px] tracking-tight font-bold uppercase mb-[-3px]">
                    {wedding.host_selection === 'bride_side' ? `${wedding.bride_father_name} & ${wedding.bride_mother_name}` : `${wedding.groom_father_name} & ${wedding.groom_mother_name}`}
                  </p>
                  <p className="text-gold font-sans text-[8px] lg:text-[8px] tracking-widest uppercase font-black">{wedding.host_selection === 'bride_side' ? wedding.bride_place : wedding.groom_place}</p>
                  <p className="text-white/80 font-sans text-[9px] tracking-[0.15em] uppercase mt-2">REQUEST THE PLEASURE OF YOUR COMPANY</p>
                </div>
              )}
              <div className="mt-4">
                <h2 className="text-gold text-[28px] lg:text-[32px] font-script italic drop-shadow-lg">Wedding</h2>
                <p className="text-white/90 font-sans text-[9px] tracking-[0.2em] uppercase mt-[-5px]">OF OUR {wedding.host_selection === 'bride_side' ? 'DAUGHTER' : 'SON'}</p>
              </div>
            </motion.div>

            {/* Names Section */}
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }} className="flex-grow flex flex-col items-center justify-center w-full my-6">
              <h1 className="w-full font-cinzel text-white drop-shadow-2xl">
                <span className="block text-gold text-[clamp(28px,8vw,36px)] lg:text-[32px] leading-tight mb-2 px-2 font-bold tracking-wider">{wedding.host_selection === 'bride_side' ? wedding.bride_name : wedding.groom_name}</span>
                <span className="block text-[12px] lg:text-base font-cinzel text-white/40 tracking-[0.4em] uppercase my-2 italic">With</span>
                <span className="block text-gold text-[clamp(28px,8vw,36px)] lg:text-[32px] leading-tight px-2 font-bold tracking-wider">{wedding.host_selection === 'bride_side' ? wedding.groom_name : wedding.bride_name}</span>
              </h1>
              <div className="mt-4 opacity-80">
                <p className="text-white font-sans text-[9px] tracking-[0.1em] uppercase font-bold">{wedding.host_selection === 'bride_side' ? 'S/O' : 'D/O'} {wedding.host_selection === 'bride_side' ? `${wedding.groom_father_name} & ${wedding.groom_mother_name}` : `${wedding.bride_father_name} & ${wedding.bride_mother_name}`}</p>
                <p className="text-white/60 font-sans text-[8px] tracking-widest uppercase mt-0.5">{wedding.host_selection === 'bride_side' ? wedding.groom_place : wedding.bride_place}</p>
              </div>
            </motion.div>

            {/* Events Section */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="w-full flex flex-col items-center">
              {wedding.nikah_date ? (
                <div className="mb-4 w-full px-6">
                  <div className="relative py-4 px-6 border border-gold/20 rounded-[2rem] bg-gold/5 backdrop-blur-sm overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                    <p className="text-gold font-sans text-[9px] font-black tracking-[0.4em] uppercase mb-3">The Nikah Ceremony</p>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Clock size={12} className="text-gold/60" />
                          <p className="text-white font-serif italic text-lg">{format(new Date(`2000-01-01T${wedding.nikah_time}`), "h:mm a")}</p>
                        </div>
                        <div className="w-1 h-1 bg-gold/40 rounded-full" />
                        <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-gold/60" />
                          <p className="text-white font-sans text-[11px] font-bold uppercase tracking-widest">{format(new Date(wedding.nikah_date), "d MMMM")}</p>
                        </div>
                      </div>
                      <p className="text-gold font-sans text-[10px] font-black uppercase tracking-widest border-t border-gold/10 pt-2 mt-1 w-full">{wedding.nikah_islamic_date}</p>
                      <p className="text-white/70 font-sans text-[9px] font-medium uppercase tracking-[0.1em] mt-1 italic">{wedding.nikah_location}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="my-8 w-full px-8">
                  <div className="flex items-center justify-center gap-4 mb-4 opacity-50">
                    <div className="h-[1px] w-20 bg-gold" />
                    <Sparkles className="text-gold" size={14} />
                    <div className="h-[1px] w-20 bg-gold" />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gold font-sans text-[11px] font-black tracking-[0.5em] uppercase mb-4">Wedding Reception</p>
                    <div className="flex items-center justify-center gap-8">
                      <p className="text-white font-serif italic text-3xl">{format(date, "h:mm a")}</p>
                      <div className="h-10 w-px bg-gold/20" />
                      <div className="flex flex-col items-start">
                        <p className="text-white font-sans text-[15px] font-bold uppercase tracking-widest">{format(date, "EEEE")}</p>
                        <p className="text-white/50 font-sans text-[10px] font-medium uppercase tracking-widest">{format(date, "d MMMM, yyyy")}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                      <MapPin className="text-gold" size={12} />
                      <p className="text-white/90 font-sans text-[10px] font-bold uppercase tracking-widest">{wedding.venue_name}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Perfectly Aligned Reception Block (at bottom when Nikah exists) */}
            {wedding.nikah_date && (
              <div className="mt-auto w-full px-0 relative z-20">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-3 w-full max-w-[320px] px-4 mb-0 opacity-80">
                    <div className="h-[1px] flex-grow bg-gold/30" />
                    <p className="text-gold font-sans text-[10px] font-black tracking-[0.4em] uppercase whitespace-nowrap">Wedding Reception</p>
                    <div className="h-[1px] flex-grow bg-gold/30" />
                  </div>
                  <div className="mt-0 w-full bg-white/[0.08] backdrop-blur-xl border-t border-gold/30 rounded-t-[3rem] p-4 lg:py-6 lg:px-10 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center justify-between gap-6 max-w-sm mx-auto">
                      <div className="flex items-center gap-3">
                        <Clock className="text-gold shadow-sm" size={14} />
                        <div className="flex flex-col items-start">
                          <p className="text-white font-sans text-[11px] font-bold uppercase leading-none">{format(date, "h:mm a")}</p>
                          <p className="text-white/50 font-sans text-[8px] uppercase tracking-tighter mt-0.5">{format(date, "EEEE, d MMM")}</p>
                        </div>
                      </div>
                      <div className="h-8 w-px bg-gold/10" />
                      <div className="flex items-center gap-3 flex-grow justify-end">
                        <MapPin className="text-gold" size={14} />
                        <p className="text-white font-sans text-[10px] font-bold uppercase tracking-tight text-right line-clamp-1">{wedding.venue_name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </main>

        <div className="hidden lg:flex flex-col items-center justify-center h-[60vh] opacity-30">
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-gold to-transparent" />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="my-8">
            <Sparkles className="text-gold" size={24} />
          </motion.div>
          <div className="w-[1px] h-full bg-gradient-to-t from-transparent via-gold to-transparent" />
        </div>

        <aside className="right-card-wrapper relative w-full max-w-[420px] lg:max-w-lg h-full max-h-[715px] flex flex-col items-center justify-between p-0 lg:p-10 text-center bg-transparent lg:bg-white/5 lg:backdrop-blur-md lg:rounded-[3rem] lg:border-2 lg:border-gold/20 shadow-2xl overflow-visible lg:overflow-hidden gap-6 lg:gap-0">
          <div className="w-full lg:mt-10">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <p className="text-gold font-sans text-[11px] font-black tracking-[0.5em] uppercase mb-6 lg:mb-10">Countdown to Celebration</p>
              <Countdown targetDate={wedding.wedding_date} />
            </motion.div>
          </div>
          
          <div className="hidden lg:flex flex-col items-center">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-6" />
            <Sparkles className="text-gold/60 animate-pulse" size={40} />
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold/40 to-transparent mt-6" />
          </div>

          <div className="w-full mb-10 px-6">
            <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-white font-cinzel text-2xl lg:text-3xl mb-8 tracking-[0.2em] font-bold">Will you attend?</motion.h3>
            <div className="flex flex-col gap-4 w-full">
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "rgba(212, 175, 55, 0.25)" }} 
                whileTap={{ scale: 0.98 }} 
                onClick={onAttend} 
                className="w-full py-4 lg:py-5 border-2 border-gold text-gold font-black rounded-2xl tracking-[0.3em] uppercase text-xs transition-all bg-gold/15 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
              >
                Insha'Allah will attend
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }} 
                whileTap={{ scale: 0.98 }} 
                onClick={onNotAttend} 
                className="w-full py-4 lg:py-5 border-2 border-white/10 text-white/40 font-bold rounded-2xl tracking-[0.2em] uppercase text-xs transition-all hover:text-white/80"
              >
                No, we can't
              </motion.button>
            </div>
          </div>
        </aside>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400&family=Great+Vibes&family=Noto+Naskh+Arabic:wght@700&family=Inter:wght@400;900&family=Cinzel:wght@400;700;900&display=swap');
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-arabic { font-family: 'Noto Naskh Arabic', serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .text-gold { 
          color: #d4af37; 
          background: linear-gradient(135deg, #ad924d 0%, #f7ef8a 50%, #ad924d 100%); 
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent; 
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }
        @keyframes floatDust { 
          0% { transform: translateY(0) translateX(0); opacity: 0; } 
          10% { opacity: 0.2; } 
          90% { opacity: 0.2; } 
          100% { transform: translateY(-120vh) translateX(30px); opacity: 0; } 
        }

        @media (max-width: 1024px) {
          .web-template-container {
            padding-top: env(safe-area-inset-top);
            padding-bottom: env(safe-area-inset-bottom);
          }
          .royal-purple-main-card {
            min-height: calc(90dvh) !important;
            height: calc(90dvh) !important;
            max-width: 420px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}
