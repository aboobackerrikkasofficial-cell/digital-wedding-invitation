"use client";

import { motion, AnimatePresence } from "framer-motion";
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
    <div className="peach-floral-cinematic-v2 w-full relative h-[100dvh] overflow-hidden bg-[#fff5f0] font-serif">
      
      {/* STEP 1: CINEMATIC BACKGROUND SCENE */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/themes/peach-floral/bg-main.png" 
          alt="Wedding Stage Background" 
          fill 
          priority 
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle cinematic gradient overlay for text protection */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 z-1" />
      </div>

      {/* STEP 2: DECORATIVE ELEMENTS (LAYERED) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 z-10 h-1/3 pointer-events-none"
      >
        <Image 
          src="/themes/peach-floral/elements/lanterns.png" 
          alt="Hanging Lanterns" 
          fill 
          className="object-contain object-top scale-110"
          sizes="100vw"
        />
      </motion.div>

      {/* STEP 3: REAL HTML/CSS CONTENT LAYOUT */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-between py-12 lg:py-20 px-6 overflow-hidden">
        
        {/* TOP: MONOGRAM & BRANDING */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-4"
        >
          {/* Professional Monogram Frame Asset */}
          <div className="relative w-36 h-36 lg:w-44 lg:h-44 flex items-center justify-center">
            <Image 
              src="/themes/peach-floral/elements/frame.png" 
              alt="Monogram Frame" 
              fill 
              className="object-contain"
            />
            <div className="relative z-10 flex items-center gap-1 text-[#d4af37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              <span className="text-4xl lg:text-5xl font-serif font-bold italic tracking-tighter">{brideInitial}</span>
              <span className="text-xl lg:text-2xl font-serif mt-2 font-light opacity-80">&</span>
              <span className="text-4xl lg:text-5xl font-serif font-bold italic tracking-tighter">{groomInitial}</span>
            </div>
          </div>
          
          <p className="text-white/80 text-[10px] lg:text-xs uppercase tracking-[0.5em] font-medium drop-shadow-md">
            SAVE THE DATE
          </p>
        </motion.div>

        {/* MIDDLE: CINEMATIC TYPOGRAPHY & COUNTDOWN */}
        <div className="flex flex-col items-center text-center w-full max-w-lg space-y-8">
          
          {/* Bride & Groom Names (Real Typography) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl lg:text-7xl font-serif font-black text-[#f9f6e5] leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] tracking-wide">
              {wedding.bride_name}
            </h1>
            <div className="relative w-full flex items-center justify-center my-1">
              <div className="w-12 h-[1px] bg-[#d4af37]/40" />
              <span className="mx-4 text-2xl lg:text-3xl text-[#d4af37] font-serif italic font-light opacity-90">&</span>
              <div className="w-12 h-[1px] bg-[#d4af37]/40" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif font-black text-[#f9f6e5] leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] tracking-wide">
              {wedding.groom_name}
            </h1>
          </motion.div>

          {/* Date Block */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col items-center space-y-1"
          >
            <p className="text-[#d4af37] font-serif uppercase tracking-[0.4em] text-[11px] lg:text-xs font-bold mb-2">
              Wedding Invitation
            </p>
            <div className="flex items-center gap-6 text-[#f9f6e5] font-serif uppercase tracking-[0.2em] text-xl lg:text-2xl font-black border-y border-[#d4af37]/30 py-2">
              <span>{format(date, "dd")}</span>
              <span className="text-[#d4af37]/40 text-sm italic">|</span>
              <span>{format(date, "MMMM")}</span>
              <span className="text-[#d4af37]/40 text-sm italic">|</span>
              <span>{format(date, "yyyy")}</span>
            </div>
            <p className="text-[#f9f6e5]/90 font-serif uppercase tracking-[0.3em] text-[11px] lg:text-xs pt-2">
              {format(date, "EEEE")} • {format(date, "h:mm a")}
            </p>
          </motion.div>

          {/* Luxury Countdown Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-full px-4 lg:px-8 py-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] shadow-2xl"
          >
            <Countdown 
              targetDate={wedding.wedding_date} 
              numberClassName="text-3xl lg:text-4xl text-[#f9f6e5] font-serif font-black drop-shadow-md"
              labelClassName="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold mt-1"
              separatorClassName="text-[#f9f6e5]/20 text-2xl mx-1"
            />
          </motion.div>

          {/* RSVP Button */}
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            onClick={onAttend}
            className="group relative bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-white font-black py-5 px-14 rounded-full shadow-[0_15px_35px_rgba(212,175,55,0.3)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.5)] active:scale-95 transition-all duration-300 uppercase tracking-[0.3em] text-xs lg:text-sm"
          >
            <span className="relative z-10">RSVP NOW</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          </motion.button>
        </div>

        {/* BOTTOM: SUBTLE SPACING FOR STAGE ARTWORK */}
        <div className="h-20 lg:h-32" />

      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');
        
        .peach-floral-cinematic-v2 {
          font-family: 'Playfair Display', serif;
        }

        .peach-floral-cinematic-v2 h1 {
          font-weight: 900;
        }
      `}</style>
    </div>
  );
}
