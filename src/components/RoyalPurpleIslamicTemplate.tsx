"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { Sparkles, Clock, MapPin } from "lucide-react";
import { useMemo } from "react";

import { Countdown } from "./Countdown";

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

import { Wedding } from "@/types/wedding";


interface TemplateProps {
  wedding: Wedding;
  onAttend?: () => void;
  onNotAttend?: () => void;
}

const GoldArc = () => (
  <div className="absolute -top-[100px] -left-[20px] inset-x-0 h-[45%] flex justify-center pointer-events-none overflow-hidden">
    {/* The main ornamental arc */}
    <div className="relative w-[140%] md:w-[110%] h-full">
      <svg
        viewBox="0 0 1000 400"
        preserveAspectRatio="none"
        className="w-full h-full drop-shadow-[0_10px_30px_rgba(212,175,55,0.4)]"
      >
        {/* Main Background Arc Removed/Transparent */}
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

          {/* New Blending Fade Mask */}
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

        {/* Intricate Gold Border Pattern (Mosaic/Geometric) */}
        <g mask="url(#bottomFadeMask)">
          <path
            d="M0,100 C200,400 500,400 800,400 L1000,100"
            fill="none"
            stroke="#d4af37"
            strokeWidth="12"
            strokeDasharray="2,4"
            className="opacity-10"
          />

          {/* Main Bold Gold Border */}
          <path
            d="M0,80 C200,380 500,380 800,380 L1000,80"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="4"
            className="opacity-30"
          />

          {/* Outer Filigree Decoration */}
          <path
            d="M0,120 C250,420 750,420 1000,120"
            fill="none"
            stroke="#d4af37"
            strokeWidth="1"
            className="opacity-10 translate-y-4"
          />

          <rect width="1000" height="400" fill="url(#islamicPattern)" mask="url(#arcMask)" />
        </g>
      </svg>

      {/* Arabic Calligraphy Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-8 pt-[116px] pl-[25px]">
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-gold font-arabic font-bold text-[32px] md:text-[40px] mt-[5px] mb-[-8px] drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]"
        >
          وَخَلَقْنَاكُمْ أَزْوَاجًا
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-white font-cinzel font-medium text-[12px] md:text-[14px] tracking-[0.2em] uppercase"
        >
          &quot;AND WE CREATED YOU IN PAIRS&quot;
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-white font-cinzel font-normal text-[10px] md:text-[11px] tracking-[0.1em] mt-1"
        >
          QURAN 78:8
        </motion.p>
      </div>
    </div>
  </div>
);

const GoldDustBackground = ({ particles }: { particles: Particle[] }) => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Base Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#251a36] via-[#2b1e3f] to-[#3a2455] animate-gradient-slow" />

    {/* Golden Dust Layers */}
    {particles.map((particle, i) => (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          left: `${particle.left}%`,
          top: '110%',
          backgroundColor: particle.color,
          opacity: 0.2,
          animation: `floatDust ${particle.duration}s linear infinite`,
          animationDelay: `${particle.delay}s`,
          willChange: "transform"
        }}
      />
    ))}
  </div>
);

export function RoyalPurpleIslamicTemplate({ wedding, onAttend, onNotAttend }: TemplateProps) {
  const date = new Date(wedding.wedding_date);

  const particles = useMemo(() => [...Array(30)].map((_, i) => getParticle(i)), []);

  return (
    <div className="relative min-h-[calc(100dvh-2rem)] lg:h-[calc(100dvh-2rem)] w-full bg-[#2b1e3f] overflow-y-auto lg:overflow-hidden flex items-center justify-center font-serif p-6 lg:p-10">
      <GoldDustBackground particles={particles} />

      <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-[60px] items-center justify-center w-full max-w-6xl h-full">
        {/* 2. THE MAIN CARD CANVAS (LEFT) */}
        <main className="relative w-full max-w-[420px] lg:max-w-lg h-[95svh] lg:h-[calc(89dvh+25px)] max-h-[850px] flex flex-col justify-between text-center border-2 border-gold/25 rounded-[2.5rem] lg:rounded-[3rem] bg-white/5 backdrop-blur-sm shadow-[12px_12px_30px_rgba(212,175,55,0.12)] overflow-hidden pt-4 lg:pt-[20px] pb-0 px-0">

          <GoldArc />

          {/* 3. FIXED CONTENT WRAPPER */}
          {/* We use a structured flex column with specific segment heights to prevent content displacement */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3,
                  delayChildren: 0.6
                }
              }
            }}
            initial="hidden"
            animate="show"
            className="relative z-10 w-full flex-grow flex flex-col items-center justify-between text-center mt-[75px] lg:mt-[100px] px-2 lg:px-4"
            style={{ willChange: "transform, opacity" }}
          >
            {/* SEGMENT A: HOSTS & TITLE */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                show: {
                  opacity: 1, y: 0, scale: 1,
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                }
              }}
              style={{ willChange: "transform, opacity" }}
              className="flex-shrink-0 flex flex-col items-center justify-start min-h-[80px] lg:min-h-[140px] pt-4 lg:pt-8"
            >
              {/* Dynamic Host Line */}
              {(wedding.host_selection === 'bride_side' && wedding.bride_father_name) ? (
                <div className={`flex flex-col items-center mb-1 lg:mb-2 mt-[45px] ${wedding.nikah_date ? 'lg:mt-0' : 'lg:mt-[20px]'}`}>
                  <p className="text-white font-sans text-[10px] lg:text-[12px] tracking-tight font-bold uppercase whitespace-nowrap overflow-hidden text-ellipsis px-4 mb-[-3px] leading-[1.4]">
                    {wedding.bride_father_name} & {wedding.bride_mother_name}
                  </p>
                  {wedding.bride_place && (
                    <p className="text-gold font-sans text-[8px] lg:text-[8px] tracking-widest uppercase font-black">
                      {wedding.bride_place}
                    </p>
                  )}
                  <p className="text-white font-sans text-[9px] lg:text-[9px] tracking-[0.1em] lg:tracking-[0.15em] font-medium uppercase leading-[1.3] mt-1 whitespace-normal">
                    REQUEST THE PLEASURE OF YOUR COMPANY<br />
                    ON THE AUSPICIOUS OCCASION OF THE
                  </p>
                </div>
              ) : (wedding.host_selection === 'groom_side' && wedding.groom_father_name) ? (
                <div className={`flex flex-col items-center mb-1 lg:mb-2 mt-[45px] ${wedding.nikah_date ? 'lg:mt-0' : 'lg:mt-[20px]'}`}>
                  <p className="text-white font-sans text-[10px] lg:text-[12px] tracking-tight font-bold uppercase opacity-95 whitespace-nowrap overflow-hidden text-ellipsis px-4 mb-[-3px] leading-[1.4]">
                    {wedding.groom_father_name} & {wedding.groom_mother_name}
                  </p>
                  {wedding.groom_place && (
                    <p className="text-gold/90 font-sans text-[8px] lg:text-[8px] tracking-widest uppercase font-black">
                      {wedding.groom_place}
                    </p>
                  )}
                  <p className="text-white/80 font-sans text-[9px] lg:text-[9px] tracking-[0.1em] lg:tracking-[0.15em] font-medium uppercase leading-[1.3] mt-1 whitespace-normal">
                    REQUEST THE PLEASURE OF YOUR COMPANY<br />
                    ON THE AUSPICIOUS OCCASION OF THE
                  </p>
                </div>
              ) : <div className="h-4 mt-[35px] lg:mt-[40px]" />}

              {/* Wedding Title - Custom spacing for mobile (+20px down) vs desktop */}
              <div className="py-0 mt-6 mb-0 lg:mt-1 lg:mb-4">
                <h2 className="text-gold text-[27px] lg:text-[28px] font-script italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  Wedding
                </h2>
                <p className="text-white font-sans text-[9px] lg:text-[9px] tracking-[0.15em] font-medium uppercase mt-[-3px]">
                  OF OUR {wedding.host_selection === 'bride_side' ? 'DAUGHTER' : 'SON'}
                </p>
              </div>
            </motion.div>

            {/* SEGMENT B: COUPLE NAMES (DYNAMICS SCALING) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 1.05 },
                show: {
                  opacity: 1, scale: 1,
                  transition: { duration: 1.5, ease: "easeOut" }
                }
              }}
              style={{ willChange: "transform, opacity" }}
              className="flex-grow flex flex-col items-center justify-center w-full px-2 max-h-[180px] lg:max-h-[300px] mt-6 lg:mt-0"
            >
              <h1 className="w-full font-cinzel text-white leading-tight drop-shadow-[0_5px_20px_rgba(0,0,0,0.4)] px-2">
                <span className="block text-gold text-[clamp(25px,7.2vw,33px)] lg:text-[clamp(11px,4vw,28px)] leading-[1.1] mt-[3px] lg:mt-[5px] px-2 [text-wrap:balance] max-w-[90%] lg:max-w-[280px] mx-auto overflow-visible whitespace-normal">
                  {wedding.host_selection === 'bride_side' ? wedding.bride_name : wedding.groom_name}
                </span>
                <span className="block text-[11px] lg:text-base font-cinzel text-gold tracking-[0.2em] my-[2px] lg:my-[1px]">with</span>
                <span className="block text-gold text-[clamp(25px,7.2vw,33px)] lg:text-[clamp(11px,4vw,28px)] leading-[1.2] px-2 [text-wrap:balance] max-w-[90%] lg:max-w-[280px] mx-auto overflow-visible whitespace-normal">
                  {wedding.host_selection === 'bride_side' ? wedding.groom_name : wedding.bride_name}
                </span>
              </h1>

              {/* Secondary Parents (Counter-Host Side) - Now positioned directly under couple */}
              <div className="mt-2 mb-1">
                <p className="text-white font-sans text-[9px] lg:text-[9px] tracking-[0.1em] uppercase font-bold px-4 line-clamp-1 opacity-90">
                  {wedding.host_selection === 'bride_side' ? 'S/O' : 'D/O'} {wedding.host_selection === 'bride_side'
                    ? `${wedding.groom_father_name} & ${wedding.groom_mother_name}`
                    : `${wedding.bride_father_name} & ${wedding.bride_mother_name}`
                  }
                </p>
                <p className="text-white font-sans text-[8px] lg:text-[8px] tracking-widest uppercase mt-0.5 opacity-70">
                  {wedding.host_selection === 'bride_side' ? wedding.groom_place : wedding.bride_place}
                </p>
              </div>
            </motion.div>

            {/* SEGMENT C: LOGISTICS FOOTER */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1, y: 0,
                  transition: { duration: 1, ease: "easeOut" }
                }
              }}
              className="flex-shrink-0 w-full flex flex-col items-center justify-end pb-0 lg:pb-0 min-h-[100px] lg:min-h-[160px] mt-5 lg:mt-[3px]"
            >
              {/* ARCH-THEMED NIKAH BLOCK */}
              {wedding.nikah_date && (
                <div className="mb-1.5 w-full px-6 animate-fade-in">
                  <div className="relative group overflow-hidden">
                    {/* Subtle Arch Ornament */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 border-t border-l border-r border-gold/20 rounded-t-[3rem] -z-10" />
                    
                    <div className="pt-3 pb-1 flex flex-col items-center">
                      <p className="text-gold font-sans text-[9px] lg:text-[9px] font-black tracking-[0.3em] uppercase mb-2">The Nikah Ceremony</p>
                      
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-4">
                           <p className="text-white font-serif italic text-[17px] lg:text-lg tracking-wide">{format(new Date(`2000-01-01T${wedding.nikah_time}`), "h:mm a")}</p>
                           <div className="w-1 h-1 bg-gold rounded-full opacity-40 shadow-[0_0_5px_gold]" />
                           <p className="text-white font-sans text-[11px] font-bold uppercase tracking-widest">{new Date(wedding.nikah_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</p>
                        </div>
                        <p className="text-gold font-sans text-[10px] font-black uppercase tracking-widest">{wedding.nikah_islamic_date}</p>
                        <p className="text-white font-sans text-[9px] font-medium uppercase tracking-[0.1em] border-t border-white/5 pt-1 mt-1">{wedding.nikah_location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CONDITIONAL RECEPTION DISPLAY */}
              {!wedding.nikah_date ? (
                <div className="mt-5 lg:mt-4 mb-5 w-full px-8 animate-fade-in">
                  {/* Elegant Divider Ornament */}
                  <div className="flex items-center justify-center gap-4 mb-8 lg:mb-4 opacity-80">
                    <div className="h-[1px] w-12 lg:w-24 bg-gradient-to-r from-transparent to-gold" />
                    <Sparkles className="text-gold" size={12} />
                    <div className="h-[1px] w-12 lg:w-24 bg-gradient-to-l from-transparent to-gold" />
                  </div>

                  <div className="relative group p-2 transition-all">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-2 mb-2">
                         <Sparkles className="text-gold/40" size={8} />
                         <p className="text-gold font-sans text-[11px] lg:text-[8px] font-black tracking-[0.4em] uppercase whitespace-nowrap">Wedding Reception</p>
                         <Sparkles className="text-gold/40" size={8} />
                      </div>
                      
                      <div className="flex items-center justify-center gap-4 lg:gap-6 w-full max-w-[280px]">
                        <div className="flex flex-col items-center">
                           <p className="text-white font-serif italic text-[23px] lg:text-2xl tracking-wide leading-none">{format(date, "h:mm a")}</p>
                           <p className="text-gold/70 font-sans text-[9px] font-bold uppercase tracking-[0.2em] mt-0.5">
                              {date.getHours() >= 5 && date.getHours() < 12 ? "Morning" : 
                               date.getHours() >= 12 && date.getHours() < 17 ? "Afternoon" : 
                               date.getHours() >= 17 && date.getHours() < 21 ? "Evening" : "Night"}
                           </p>
                        </div>
                        
                        <div className="h-8 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
                        
                        <div className="flex flex-col items-center">
                           <p className="text-white font-sans text-[14px] lg:text-[13px] font-bold uppercase tracking-widest">{format(date, "EEEE")}</p>
                           <p className="text-white font-sans text-[11px] lg:text-[9px] font-medium uppercase tracking-[0.1em] opacity-60 mt-0.5">{format(date, "d MMMM")}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 w-full h-[0.5px] bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
                      
                      <div className="mt-2 flex items-center gap-1.5 transition-colors">
                         <MapPin className="text-gold" size={8} />
                         <p className="text-white/80 font-sans text-[10px] lg:text-[8px] font-bold uppercase tracking-[0.1em]">{wedding.venue_name}</p>
                      </div>
                    </div>
                  </div>
                </div>

              ) : (
                /* PREMIUM BOTTOM BAR RECEPTION (When Nikah is present) */
                <div className="mt-0 lg:mt-auto w-full px-0 animate-fade-in relative z-[200]">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-3 w-full max-w-[340px] px-4">
                      <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                      <p className="text-gold font-sans text-[11px] lg:text-[12px] font-black tracking-[0.2em] uppercase whitespace-nowrap drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">Wedding Reception</p>
                      <div className="h-[1px] flex-grow bg-gradient-to-r from-gold/40 via-gold/40 to-transparent" />
                    </div>
                    
                    <div className="mt-1 w-full bg-white/[0.05] backdrop-blur-md border border-gold/20 rounded-t-[1.25rem] p-3 lg:py-4 lg:px-8 shadow-none">
                      <div className="flex items-center justify-between gap-4 max-w-sm mx-auto">
                        <div className="flex items-center gap-3">
                           <Clock className="text-gold" size={12} />
                           <p className="text-white font-sans text-[10px] lg:text-[11px] font-bold uppercase whitespace-nowrap">
                             {format(date, "h:mm a")} • {format(date, "EEEE, d MMMM")}
                           </p>
                        </div>
                        <div className="flex items-center gap-3 border-l border-gold/10 pl-4 flex-grow justify-end">
                           <MapPin className="text-gold" size={12} />
                           <p className="text-white font-sans text-[9px] lg:text-[10px] font-bold uppercase tracking-tight whitespace-nowrap overflow-hidden">
                             {wedding.venue_name}
                           </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </main>

        {/* 6. ORNAMENTAL VERTICAL DIVIDER (DESKTOP ONLY) */}
        <div className="hidden lg:flex flex-col items-center justify-center h-[60vh] opacity-40">
          <div className="w-[0.5px] h-full bg-gradient-to-b from-transparent via-gold to-transparent" />
          <motion.div
            animate={{ rotate: [0, 90, 180, 270, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="my-8"
          >
            <Sparkles className="text-gold" size={20} />
          </motion.div>
          <div className="w-[0.5px] h-full bg-gradient-to-b from-transparent via-gold to-transparent" />
        </div>

        {/* 5. SECONDARY BLOCK (RIGHT) */}
        <aside className="right-card-wrapper relative w-full max-w-[420px] lg:max-w-lg h-fit lg:h-[calc(89dvh+25px)] max-h-[850px] flex flex-col items-center justify-between p-0 lg:p-10 text-center rounded-none lg:rounded-[3rem] bg-transparent lg:bg-white/5 lg:backdrop-blur-sm lg:shadow-[12px_12px_30px_rgba(212,175,55,0.12)] overflow-visible lg:overflow-hidden gap-5 lg:gap-0">

          {/* Block 1: Countdown - Card on mobile, Transparent on Desktop */}
          <div className="w-full flex-shrink-0 flex flex-col items-center justify-center p-6 lg:p-0 border-2 lg:border-none border-gold/25 rounded-[2.5rem] lg:rounded-none bg-white/5 lg:bg-transparent backdrop-blur-sm lg:backdrop-filter-none shadow-xl lg:shadow-none">
            <div className="w-full lg:mt-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-gold font-sans text-[11px] lg:text-[10px] font-bold tracking-[0.4em] uppercase mb-4 lg:mb-8">Countdown to Celebration</p>
                <Countdown targetDate={wedding.wedding_date} />
              </motion.div>
            </div>
          </div>

          {/* Middle Decorative Element - Shown only on desktop to keep mobile height tight */}
          <div className="hidden lg:flex flex-col items-center scale-50 lg:scale-100 my-1 lg:my-0">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-4" />
            <Sparkles className="hidden lg:block text-gold opacity-50" size={32} />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-4" />
          </div>

          {/* Block 2: RSVP Question - Card on mobile, Transparent on Desktop */}
          <div className="w-full flex-shrink-0 flex flex-col items-center justify-center p-6 lg:p-0 border-2 lg:border-none border-gold/25 rounded-[2.5rem] lg:rounded-none bg-white/5 lg:bg-transparent backdrop-blur-sm lg:backdrop-filter-none shadow-xl lg:shadow-none">
            <div className="w-full mb-2 lg:mb-10">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-white font-cinzel text-[19px] lg:text-2xl mb-4 lg:mb-8 tracking-wider"
              >
                Will you attend?
              </motion.h3>

              <div className="flex flex-col gap-2 lg:gap-4 w-full px-4">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(212, 175, 55, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onAttend}
                  className="w-full py-3 lg:py-4 border border-gold text-gold font-bold rounded-xl lg:rounded-2xl tracking-widest uppercase text-[11px] lg:text-xs transition-colors bg-gold/10 shadow-lg shadow-gold/5"
                >
                  Insha&apos;Allah will attend
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onNotAttend}
                  className="w-full py-3 lg:py-4 border border-white/20 text-white/60 font-bold rounded-xl lg:rounded-2xl tracking-widest uppercase text-[11px] lg:text-xs transition-colors hover:text-white"
                >
                  No, we can&apos;t
                </motion.button>
              </div>
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
          0% { 
            transform: translateY(0) translateX(0); 
            opacity: 0;
          }
          10% { opacity: inherit; }
          90% { opacity: inherit; }
          100% { 
            transform: translateY(-120vh) translateX(30px); 
            opacity: 0;
          }
        }

        @keyframes drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(20px); }
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


export default RoyalPurpleIslamicTemplate;
