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

        {/* B. GALAXY TWINKLING STARS (Integrated into sky) */}
        <div className="absolute inset-0 z-[2]">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute"
              style={{ 
                left: `${(i * 137.5) % 100}%`, 
                top: `${(i * 97.1) % 55}%`,
                width: (i % 3 === 0 ? 6 : 3) + 'px',
                height: (i % 3 === 0 ? 6 : 3) + 'px',
                background: 'white',
                clipPath: 'polygon(50% 0%, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0% 50%, 42% 42%)',
                filter: `drop-shadow(0 0 2px #FFD700) drop-shadow(0 0 5px #FF1493) drop-shadow(0 0 8px #8B008B)`,
                opacity: i % 2 === 0 ? 0.8 : 0.4,
                blur: i % 4 === 0 ? '1px' : '0px'
              }}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.3, 1],
                rotate: i % 5 === 0 ? [0, 90, 0] : 0
              }}
              transition={{ 
                duration: 4 + (i % 4), 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          ))}
        </div>

        {/* C. DIAMOND GALAXY SPARKLES (Floating depth) */}
        <div className="absolute inset-0 z-[3]">
          {[...Array(35)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute"
              style={{ 
                left: `${(i * 123.7) % 100}%`, 
                top: `${(i * 157.3) % 100}%`,
                width: (i % 5 === 0 ? 8 : 4) + 'px',
                height: (i % 5 === 0 ? 8 : 4) + 'px',
                background: 'rgba(255, 255, 255, 0.95)',
                clipPath: 'polygon(50% 0%, 55% 45%, 100% 50%, 55% 55%, 50% 100%, 45% 55%, 0% 50%, 45% 45%)',
                filter: `drop-shadow(0 0 3px #FFD700) drop-shadow(0 0 6px #FF1493) drop-shadow(0 0 12px #8B008B)`,
                scaleX: i % 7 === 0 ? 1.5 : 1,
                opacity: 0,
              }}
              animate={{ 
                y: [0, -80],
                x: [0, (i % 2 === 0 ? 25 : -25)],
                opacity: [0, 0.8, 0.8, 0],
                scale: [0.5, 1.1, 1.1, 0.5]
              }}
              transition={{ 
                y: { duration: 25 + (i % 15), repeat: Infinity, ease: "linear" },
                x: { duration: 15 + (i % 10), repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 8 + (i % 5), repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 8 + (i % 5), repeat: Infinity, ease: "easeInOut" },
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      </div>

      {/* 2. EXACT CONTENT OVERLAY (Matching Reference Layout) */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12 lg:py-16 px-6 no-scrollbar overflow-y-auto lg:overflow-hidden">
        
        {/* TOP: MONOGRAM ARCH & INITIALS */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center mt-2 lg:mt-4"
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
            <div className="absolute inset-0 z-10 flex items-center justify-center gap-1.5 text-[#C5A059] mb-1">
              <span className="text-4xl lg:text-5xl font-serif font-bold italic drop-shadow-sm">{brideInitial}</span>
              <span className="text-xl lg:text-2xl font-serif mt-2 font-light opacity-60">+</span>
              <span className="text-4xl lg:text-5xl font-serif font-bold italic drop-shadow-sm">{groomInitial}</span>
            </div>
          </div>
        </motion.div>

        {/* MIDDLE SECTION: TYPOGRAPHY & COUNTDOWN */}
        <div className="flex-grow flex flex-col items-center justify-center w-full max-w-2xl space-y-6 lg:space-y-8 py-4">
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-[#C5A059] text-[10px] lg:text-xs uppercase tracking-[0.4em] font-medium text-center"
          >
            YOU ARE INVITED TO THE WEDDING OF
          </motion.p>

          {/* Bride Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-[#f9f6e5] text-center italic drop-shadow-md leading-[1.1] max-w-[90%] lg:max-w-none"
          >
            {wedding.bride_name}
          </motion.h1>

          {/* Ampersand */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-[#C5A059] text-3xl lg:text-4xl font-serif italic font-light opacity-90"
          >
            &
          </motion.div>

          {/* Groom Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-[#f9f6e5] text-center italic drop-shadow-md leading-[1.1] max-w-[90%] lg:max-w-none"
          >
            {wedding.groom_name}
          </motion.h1>

          {/* Date Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col items-center space-y-2 mt-4"
          >
            <div className="w-16 h-[1px] bg-[#C5A059]/30" />
            <div className="flex items-center gap-6 text-[#f9f6e5] font-serif uppercase tracking-[0.2em] text-xl lg:text-2xl font-bold py-1">
              <span>{format(date, "dd MMM")}</span>
              <span className="text-[#C5A059]/40 text-sm">|</span>
              <span>{format(date, "yyyy")}</span>
            </div>
            <p className="text-[#C5A059] font-serif uppercase tracking-[0.4em] text-[11px] lg:text-xs font-bold">
              {format(date, "EEEE")}
            </p>
            <div className="w-16 h-[1px] bg-[#C5A059]/30" />
          </motion.div>

          {/* Countdown Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="w-full px-4 pt-4"
          >
            <Countdown 
              targetDate={wedding.wedding_date} 
              numberClassName="text-3xl lg:text-4xl text-[#f9f6e5] font-serif font-bold drop-shadow-md"
              labelClassName="text-[9px] uppercase tracking-widest text-[#C5A059] font-bold mt-1"
              separatorClassName="text-[#f9f6e5]/10 text-2xl mx-1"
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
        
        .peach-floral-cinematic-final {
          font-family: 'Playfair Display', serif;
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
