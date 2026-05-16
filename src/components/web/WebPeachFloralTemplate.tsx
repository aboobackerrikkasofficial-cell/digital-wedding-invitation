"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { Wedding } from "@/types/wedding";
import { Countdown } from "../Countdown";
import Image from "next/image";

interface PeachFloralTemplateProps {
  wedding: Wedding;
  onAttend: () => void;
  onNotAttend: () => void;
}

export function WebPeachFloralTemplate({ wedding, onAttend, onNotAttend }: PeachFloralTemplateProps) {
  const date = new Date(wedding.wedding_date);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!mounted) return null;

  const brideInitial = wedding.bride_name?.[0] || "B";
  const groomInitial = wedding.groom_name?.[0] || "G";

  return (
    <div className="peach-floral-cinematic-final w-full relative h-[100dvh] overflow-hidden font-serif">
      
      {/* 1. CINEMATIC BACKGROUNDS - FORCE CSS RENDERING FOR VERCEL PATH STABILITY */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Background */}
        <div 
          className="block lg:hidden w-full h-full"
          style={{
            backgroundImage: "url('/peachbackground4mobile.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
        {/* Web Background */}
        <div 
          className="hidden lg:block w-full h-full"
          style={{
            backgroundImage: "url('/peachbackgroundweb.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
      </div>

      {/* 1.5 PREMIUM CINEMATIC ANIMATIONS - ADDED BETWEEN BG AND CONTENT */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* A. ATMOSPHERIC GLOWS (Behind elements) */}
        <div className="absolute inset-0 z-[1]">
          <motion.div 
            animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#C5A059]/15 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[350px] bg-[#C5A059]/10 rounded-full blur-[100px]"
          />
        </div>

        {/* B. RADIANT CINEMATIC SPARKLES (Fixed, Intense Bloom - Refined Pink/Purple Palette) */}
        <div className="absolute inset-0 z-[2] overflow-hidden">
          {[...Array(80)].map((_, i) => {
            const size = (i % 12 === 0 ? 48 : i % 5 === 0 ? 32 : 16);
            const starSize = size * 0.35;
            return (
              <motion.div
                key={`radiant-twinkle-${i}`}
                className="absolute"
                style={{ 
                  left: `${(i * 123.7) % 100}%`, 
                  top: `${(i * 157.3) % 100}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                }}
                animate={{ 
                  opacity: [0.15, 0.95, 0.15],
                  scale: [0.85, 1.1, 0.85],
                }}
                transition={{ 
                  duration: 4 + (i % 6), 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              >
                {/* 1. LAYERED BLOOM (Rosy-Pink to Wine-Magenta Gradient: #AA4465 to #861657) */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(170, 68, 101, 0.45) 40%, rgba(134, 22, 87, 0.3) 75%, transparent 100%)`,
                    boxShadow: `0 0 ${size * 0.8}px rgba(170, 68, 101, 0.35), 0 0 ${size * 1.2}px rgba(134, 22, 87, 0.25)`,
                    mixBlendMode: 'screen',
                    filter: 'blur(3px)'
                  }}
                />
                {/* 2. CRYSTAL STAR (Sharp White Radiant Center) */}
                <div 
                  className="absolute inset-0 m-auto bg-white"
                  style={{
                    width: `${starSize}px`,
                    height: `${starSize}px`,
                    clipPath: 'polygon(50% 0%, 53% 47%, 100% 50%, 53% 53%, 50% 100%, 47% 53%, 0% 50%, 47% 47%)',
                    filter: 'drop-shadow(0 0 4px #fff)',
                    boxShadow: '0 0 12px 2px #fff'
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. EXACT CONTENT OVERLAY (Matching Reference Layout) */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-start pt-4 lg:pt-10 px-6 no-scrollbar overflow-hidden">
        
        {/* TOP: MONOGRAM ARCH & INITIALS */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center shrink-0 mt-1"
        >
          <div className="relative w-[108px] h-[108px] lg:w-36 lg:h-36 flex items-center justify-center">
            {/* FIXED NEXT.JS IMAGE FOR ARCH */}
            <Image 
              src="/peacharch.png" 
              alt="Peach Arch" 
              width={180}
              height={180}
              priority
              unoptimized
              className="object-contain"
            />
            <div className="absolute inset-0 z-10 flex items-center justify-center text-[#C5A059] pointer-events-none">
              <div className="relative w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center">
                {/* First Initial - Upper Left */}
                <motion.span 
                  initial={{ opacity: 0, x: -3, y: -3 }}
                  animate={{ opacity: 1, x: -3, y: -3 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                  className="absolute z-20 text-[28px] lg:text-[34px] font-light drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] bg-gradient-to-b from-[#E5C06D] via-[#D6A24B] to-[#B8862F] bg-clip-text text-transparent leading-none monogram-letter"
                >
                  {brideInitial}
                </motion.span>
                
                {/* Second Initial - Lower Right */}
                <motion.span 
                  initial={{ opacity: 0, x: 3, y: 3 }}
                  animate={{ opacity: 1, x: 3, y: 3 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  className="absolute z-0 text-[28px] lg:text-[34px] font-light drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] bg-gradient-to-b from-[#E5C06D] via-[#D6A24B] to-[#B8862F] bg-clip-text text-transparent leading-none monogram-letter"
                >
                  {groomInitial}
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* MIDDLE SECTION: TYPOGRAPHY & COUNTDOWN */}
        <div className="flex-grow flex flex-col items-center justify-start w-full max-w-2xl mt-2 shrink-1 overflow-hidden min-h-0">
          
          {/* Subtitle */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-center text-[#D6A24B] uppercase text-center space-y-1"
          >
            <span className="text-[9px] lg:text-[11px] font-bold lg:font-medium tracking-[2.5px] lg:tracking-[0.5em]">YOU ARE INVITED TO</span>
            <span className="text-[11px] lg:text-[11px] font-bold lg:font-medium tracking-[0.5em]">THE WEDDING OF</span>
          </motion.div>

          {/* Bride Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-[46px] lg:text-[68px] font-light bg-gradient-to-b from-[#E5C06D] via-[#D6A24B] to-[#B8862F] bg-clip-text text-transparent text-center leading-[0.7] mt-2 max-w-[90%] lg:max-w-none script-name"
          >
            {wedding.bride_name}
          </motion.h1>

          {/* Ampersand */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-[#D6A24B] text-lg lg:text-2xl font-serif italic font-extralight opacity-80 my-1"
          >
            &
          </motion.div>

          {/* Groom Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[40px] lg:text-[60px] font-light bg-gradient-to-b from-[#E5C06D] via-[#D6A24B] to-[#B8862F] bg-clip-text text-transparent text-center leading-[0.7] mb-2 max-w-[90%] lg:max-w-none script-name"
          >
            {wedding.groom_name}
          </motion.h1>

          {/* Date Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col items-center mt-1"
          >
            {/* Ornament Divider */}
            <div className="flex items-center space-x-3 mb-1">
              <div className="w-10 lg:w-16 h-[0.5px] bg-[#D6A24B]/30" />
              <div className="w-1 h-1 rotate-45 bg-[#D6A24B]/50" />
              <div className="w-10 lg:w-16 h-[0.5px] bg-[#D6A24B]/30" />
            </div>
            
            {/* Date: 12 | DEC | 2025 */}
            <div className="flex items-center gap-3 text-[#E5C06D] font-serif uppercase tracking-[0.2em] text-[13px] lg:text-lg font-extralight py-0.5">
              <span>{format(date, "dd")}</span>
              <span className="text-[#D6A24B]/30 text-xs">|</span>
              <span>{format(date, "MMM")}</span>
              <span className="text-[#D6A24B]/30 text-xs">|</span>
              <span>{format(date, "yyyy")}</span>
            </div>
            <p className="text-[#D6A24B] font-serif uppercase tracking-[0.4em] text-[8px] lg:text-[11px] font-light mt-0.5">
              {format(date, "EEEE")}
            </p>
          </motion.div>

          {/* Countdown Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="w-full px-4 pt-2 lg:pt-6"
          >
            <Countdown 
              targetDate={wedding.wedding_date} 
              numberClassName="text-[20px] lg:text-3xl text-[#E5C06D] font-serif font-extralight"
              labelClassName="text-[6px] lg:text-[9px] uppercase tracking-[0.3em] text-[#D6A24B] font-light mt-0.5"
              separatorClassName="text-[#D6A24B]/20 text-base mx-1.5 font-light"
              separatorText="|"
              labels={['DAYS', 'HOURS', 'MINS', 'SECS']}
            />
          </motion.div>
        </div>

        {/* BOTTOM: RSVP BUTTON */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="w-full flex justify-center mt-4 mb-auto pb-4"
        >
          <button 
            onClick={onAttend}
            className="bg-gradient-to-r from-[#E5C06D] via-[#D6A24B] to-[#B8862F] text-white font-serif font-light py-2 px-10 rounded-full shadow-[0_4px_15px_rgba(214,162,75,0.2)] active:scale-95 transition-all duration-300 uppercase tracking-[0.4em] text-[9px] lg:text-xs border border-white/20"
          >
            RSVP NOW
          </button>
        </motion.div>

      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&display=swap');
        
        .peach-floral-cinematic-final {
          font-family: 'Playfair Display', serif;
        }

        .monogram-letter {
          font-family: 'Cinzel', serif;
        }

        .script-name {
          font-family: 'Great Vibes', cursive;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
