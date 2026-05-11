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
    <div className="peach-floral-cinematic-theme w-full relative h-[100dvh] overflow-hidden bg-[#fff5f0] font-serif">
      
      {/* 1. CINEMATIC BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <Image 
          src="/peach_floral/bg.png" 
          alt="Peach Floral Background" 
          fill 
          priority 
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Soft overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-1" />
      </div>

      {/* 2. CINEMATIC CONTENT OVERLAY */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-10 lg:py-16 px-6">
        
        {/* TOP SECTION: Monogram & Names */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-6"
        >
          {/* Monogram */}
          <div className="relative w-32 h-32 lg:w-40 lg:h-40 flex items-center justify-center">
            <Image 
              src="/peach_floral/frame.png" 
              alt="Monogram Frame" 
              fill 
              className="object-contain"
            />
            <div className="relative z-10 flex items-center gap-1 text-[#d4af37] drop-shadow-lg">
              <span className="text-3xl lg:text-4xl font-serif font-bold italic">{brideInitial}</span>
              <span className="text-xl lg:text-2xl font-serif mt-2 font-light opacity-80">+</span>
              <span className="text-3xl lg:text-4xl font-serif font-bold italic">{groomInitial}</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[#f9f6e5]/80 text-xs lg:text-sm uppercase tracking-[0.4em] font-medium drop-shadow-md">
              YOU ARE INVITED TO THE WEDDING OF
            </p>
            <div className="flex flex-col items-center">
              <h1 className="text-5xl lg:text-7xl font-serif font-black text-[#f9f6e5] leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)] italic">
                {wedding.bride_name}
              </h1>
              <span className="text-3xl lg:text-4xl text-[#d4af37] font-serif my-1 font-light italic opacity-90">&</span>
              <h1 className="text-5xl lg:text-7xl font-serif font-black text-[#f9f6e5] leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)] italic">
                {wedding.groom_name}
              </h1>
            </div>
          </div>
        </motion.div>

        {/* CENTER SECTION: Date & Countdown */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-8 w-full max-w-lg bg-black/5 backdrop-blur-[2px] py-8 rounded-[2rem] border border-white/10"
        >
          {/* Elegant Date Block */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-[1px] bg-[#d4af37]/40 mb-2" />
            <div className="flex items-center gap-6 text-[#f9f6e5] font-serif uppercase tracking-[0.2em] text-lg lg:text-2xl font-bold">
              <span>{format(date, "dd")}</span>
              <span className="text-[#d4af37]/60 text-sm">|</span>
              <span>{format(date, "MMM")}</span>
              <span className="text-[#d4af37]/60 text-sm">|</span>
              <span>{format(date, "yyyy")}</span>
            </div>
            <p className="text-[#d4af37] font-serif uppercase tracking-[0.3em] text-xs lg:text-sm font-semibold">
              {format(date, "EEEE")}
            </p>
            <div className="w-12 h-[1px] bg-[#d4af37]/40 mt-2" />
          </div>

          {/* Luxury Countdown */}
          <div className="w-full px-4">
            <Countdown 
              targetDate={wedding.wedding_date} 
              numberClassName="text-3xl lg:text-4xl text-[#f9f6e5] font-serif font-bold drop-shadow-md"
              labelClassName="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold"
              separatorClassName="text-[#f9f6e5]/20 text-2xl"
            />
          </div>

          {/* RSVP Button */}
          <button 
            onClick={onAttend}
            className="group relative bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-white font-bold py-4 px-12 rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] active:scale-95 transition-all duration-300 uppercase tracking-[0.2em] text-xs lg:text-sm overflow-hidden"
          >
            <span className="relative z-10">RSVP NOW</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          </button>
        </motion.div>

        {/* BOTTOM SECTION: Subtle Spacing for the background artwork */}
        <div className="h-32 lg:h-48 pointer-events-none" />

      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');
        
        .peach-floral-cinematic-theme {
          font-family: 'Playfair Display', serif;
        }

        @keyframes floatGlow {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50% { opacity: 0.7; transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
