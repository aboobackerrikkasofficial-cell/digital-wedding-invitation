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
            backgroundImage: "url('/peachbackgroundmobile.png')",
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
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-6 lg:py-10 px-6 no-scrollbar overflow-hidden">
        
        {/* TOP: MONOGRAM ARCH & INITIALS */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center shrink-0 mt-2"
        >
          <div className="relative w-36 h-36 lg:w-44 lg:h-44 flex items-center justify-center">
            {/* FIXED NEXT.JS IMAGE FOR ARCH */}
            <Image 
              src="/peacharch.png" 
              alt="Peach Arch" 
              width={220}
              height={220}
              priority
              unoptimized
              className="object-contain"
            />
            <div className="absolute inset-0 z-10 flex items-center justify-center text-[#C5A059] pointer-events-none">
              <div className="relative w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center">
                {/* First Initial - Upper Left (Top Layer, ~92% size) */}
                <motion.span 
                  initial={{ opacity: 0, x: -6, y: -6 }}
                  animate={{ opacity: 1, x: -10, y: -10 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                  className="absolute z-20 text-[58px] lg:text-[78px] font-normal drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] bg-gradient-to-b from-[#D4AF37] via-[#CFA64A] to-[#B8892D] bg-clip-text text-transparent leading-none monogram-letter"
                >
                  {brideInitial}
                </motion.span>
                
                {/* Second Initial - Lower Right (Larger 100%, Underneath) */}
                <motion.span 
                  initial={{ opacity: 0, x: 6, y: 6 }}
                  animate={{ opacity: 1, x: 10, y: 10 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  className="absolute z-0 text-[64px] lg:text-[86px] font-normal drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] bg-gradient-to-b from-[#D4AF37] via-[#CFA64A] to-[#B8892D] bg-clip-text text-transparent leading-none monogram-letter"
                >
                  {groomInitial}
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* MIDDLE SECTION: TYPOGRAPHY & COUNTDOWN */}
        <div className="flex-grow flex flex-col items-center justify-center w-full max-w-2xl space-y-3 lg:space-y-4 py-2 shrink-1 overflow-hidden min-h-0">
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-[#C5A059] text-[9px] lg:text-[11px] uppercase tracking-[0.4em] font-medium text-center"
          >
            YOU ARE INVITED TO THE WEDDING OF
          </motion.p>

          {/* Bride Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-[42px] lg:text-[60px] font-normal bg-gradient-to-b from-[#E8C67A] via-[#D9B56B] to-[#C89D4F] bg-clip-text text-transparent text-center leading-[1.1] max-w-[90%] lg:max-w-none script-name"
          >
            {wedding.bride_name}
          </motion.h1>

          {/* Ampersand */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-[#C5A059] text-xl lg:text-2xl font-serif italic font-light opacity-90 my-1 lg:my-2"
          >
            &
          </motion.div>

          {/* Groom Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[42px] lg:text-[60px] font-normal bg-gradient-to-b from-[#E8C67A] via-[#D9B56B] to-[#C89D4F] bg-clip-text text-transparent text-center leading-[1.1] max-w-[90%] lg:max-w-none script-name"
          >
            {wedding.groom_name}
          </motion.h1>

          {/* Date Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col items-center space-y-1.5 lg:space-y-2 mt-2 lg:mt-3"
          >
            <div className="w-12 lg:w-16 h-[1px] bg-[#C5A059]/30" />
            <div className="flex items-center gap-4 lg:gap-6 text-[#f9f6e5] font-serif uppercase tracking-[0.2em] text-lg lg:text-xl font-medium py-1">
              <span>{format(date, "dd MMM")}</span>
              <span className="text-[#C5A059]/40 text-xs lg:text-sm">|</span>
              <span>{format(date, "yyyy")}</span>
            </div>
            <p className="text-[#C5A059] font-serif uppercase tracking-[0.4em] text-[9px] lg:text-[11px] font-medium">
              {format(date, "EEEE")}
            </p>
            <div className="w-12 lg:w-16 h-[1px] bg-[#C5A059]/30" />
          </motion.div>

          {/* Countdown Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="w-full px-4 pt-2 lg:pt-3"
          >
            <Countdown 
              targetDate={wedding.wedding_date} 
              numberClassName="text-2xl lg:text-3xl text-[#f9f6e5] font-serif font-medium"
              labelClassName="text-[8px] lg:text-[9px] uppercase tracking-widest text-[#C5A059] font-medium mt-1"
              separatorClassName="text-[#f9f6e5]/10 text-xl mx-1"
            />
          </motion.div>
        </div>

        {/* BOTTOM: RSVP BUTTON */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="w-full flex justify-center pb-8 lg:pb-4"
        >
          <button 
            onClick={onAttend}
            className="bg-gradient-to-r from-[#d4af37] via-[#C5A059] to-[#b8860b] text-white font-serif font-bold py-3.5 px-16 rounded-full shadow-[0_10px_30px_rgba(197,160,89,0.3)] active:scale-95 transition-all duration-300 uppercase tracking-[0.3em] text-xs lg:text-sm border border-white/20"
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
