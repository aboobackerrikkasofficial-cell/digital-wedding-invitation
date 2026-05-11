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
      
      {/* 1. CINEMATIC BACKGROUNDS */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Background */}
        <div className="block lg:hidden w-full h-full">
          <Image 
            src="/peachbackgroundmobile.png" 
            alt="Mobile Background" 
            fill 
            priority 
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        {/* Web Background */}
        <div className="hidden lg:block w-full h-full">
          <Image 
            src="/peachbackgroundweb.png" 
            alt="Web Background" 
            fill 
            priority 
            className="object-cover object-center"
            sizes="100vw"
          />
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
            <Image 
              src="/peacharch.png" 
              alt="Peach Arch Monogram" 
              fill 
              className="object-contain"
              priority
            />
            <div className="relative z-10 flex items-center gap-1.5 text-[#C5A059] mb-1">
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
