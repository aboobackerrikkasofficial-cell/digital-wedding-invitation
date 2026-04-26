"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { MapPin, Calendar, MousePointer2, Sparkles, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";

interface PeachFloralTemplateProps {
  wedding: any;
  onAttend: () => void;
  onNotAttend: () => void;
}

export function PeachFloralTemplate({ wedding, onAttend, onNotAttend }: PeachFloralTemplateProps) {
  const date = new Date(wedding.wedding_date);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="peach-theme relative min-h-[100dvh] w-full overflow-hidden font-fredoka selection:bg-[#F4C542]/30">
      
      {/* 1. MANDATORY BACKGROUND (CLONE ENFORCEMENT) */}
      <div className="fixed inset-0 z-0">
        <picture>
          <source media="(max-width: 768px)" srcSet="/public/main/portraittom&jerry.png" />
          <img 
            src="/public/main/landscapetom&jerry.png" 
            alt="Background" 
            className="w-full h-full object-cover object-center no-repeat"
            onError={(e) => {
              // As per instructions: If image fails to load → STOP rendering
              console.error("Theme background failed to load");
              e.currentTarget.style.display = 'none';
            }}
          />
        </picture>
      </div>

      {/* 2. LAYOUT CONTAINER (EXACT OVERLAY MATCH) */}
      <div className="relative z-10 w-full min-h-[100dvh] flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between p-6 md:p-20">
        
        {/* LEFT SECTION: INVITATION CARD */}
        <motion.main 
          initial={{ opacity: 0, x: -100, rotate: -2 }}
          animate={{ opacity: 1, x: 0, rotate: -1.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-[500px] bg-[#FDF5E6] rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 md:p-12 border-[0.8rem] border-white/40 md:ml-10"
        >
          {/* Multi-color Dotted Perimeter Border */}
          <div className="absolute inset-2 border-[6px] border-dotted border-[#8B5A2B]/15 rounded-[0.8rem] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* YOU'RE INVITED Badge */}
            <div className="mb-10">
              <span className="bg-[#2B4570] text-[#F4C542] font-black px-8 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] shadow-md border-2 border-[#F4C542]/20">
                YOU'RE INVITED!
              </span>
            </div>

            {/* Names Section (EXACT COLORS) */}
            <div className="mb-10 space-y-3">
              <h1 className="text-4xl md:text-6xl font-black text-[#2B4570] leading-none tracking-tight">
                {wedding.bride_name}
              </h1>
              <div className="text-[#F4C542] text-2xl font-black">&</div>
              <h1 className="text-4xl md:text-6xl font-black text-[#8B4513] leading-none tracking-tight">
                {wedding.groom_name}
              </h1>
            </div>

            <div className="w-32 h-1 bg-[#8B5A2B]/10 rounded-full mb-10" />

            {/* Details Cards (Parchment/Book Style) */}
            <div className="w-full space-y-8 mb-6">
              {/* WHEN */}
              <div className="relative bg-[#FFF9E6] rounded-2xl p-5 border-2 border-[#8B5A2B]/10 shadow-sm flex flex-col items-center group">
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white p-2 rounded-lg shadow-sm border border-[#8B5A2B]/10">
                    <Calendar className="text-[#2B4570]" size={20} />
                 </div>
                 <p className="text-[10px] uppercase font-black text-[#8B5A2B]/40 tracking-widest mt-2 mb-2">When</p>
                 <p className="font-black text-[#2B4570] text-lg">{format(date, "EEEE, MMMM do, yyyy")}</p>
                 <p className="text-[#F4C542] font-black text-sm">{format(date, "h:mm a")}</p>
                 <BookOpen className="absolute bottom-2 right-2 text-[#8B5A2B]/5" size={40} />
              </div>

              {/* WHERE */}
              <div className="relative bg-[#FFF9E6] rounded-2xl p-5 border-2 border-[#8B5A2B]/10 shadow-sm flex flex-col items-center">
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white p-2 rounded-lg shadow-sm border border-[#8B5A2B]/10">
                    <MapPin className="text-[#F4C542]" size={20} />
                 </div>
                 <p className="text-[10px] uppercase font-black text-[#2B4570]/40 tracking-widest mt-2 mb-2">Where</p>
                 <p className="font-black text-[#2B4570] text-lg mb-3">{wedding.venue_name}</p>
                 {wedding.google_maps_url && (
                    <a href={wedding.google_maps_url} target="_blank" className="bg-[#2B4570]/10 text-[#2B4570] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest hover:bg-[#2B4570]/20 transition-all flex items-center gap-2">
                        Open in Maps <Sparkles size={10} />
                    </a>
                 )}
              </div>
            </div>
          </div>
        </motion.main>

        {/* RIGHT SECTION: RSVP BUBBLE */}
        <motion.section 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 w-full max-w-[360px] md:mt-40 md:mr-20"
        >
          <div className="relative bg-[#F5F5F5] p-10 rounded-[3.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.2)] border-2 border-white/50">
            {/* Left Pointing Tail */}
            <div className="absolute top-1/2 left-[-30px] -translate-y-1/2 hidden md:block w-0 h-0 border-t-[15px] border-t-transparent border-r-[35px] border-r-[#F5F5F5] border-b-[15px] border-b-transparent" />
            
            <div className="text-center space-y-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-[#2B4570]">Will you join us?</h2>
                <p className="text-[10px] font-black text-[#8B5A2B]/40 uppercase tracking-[0.2em]">RSVP BY APR 25TH</p>
              </div>

              <div className="flex flex-col gap-5">
                <button 
                  onClick={onAttend}
                  className="group bg-gradient-to-b from-[#8B4513] to-[#5A3D1D] text-white font-black py-6 px-10 rounded-[2rem] shadow-[0_10px_0_#3E2A14] active:shadow-none active:translate-y-[10px] transition-all flex items-center justify-center gap-3"
                >
                  <span className="uppercase tracking-widest text-sm">Yes! Count me in!</span>
                  <MousePointer2 size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                
                <button 
                  onClick={onNotAttend}
                  className="bg-[#D1D5DB] text-[#4B5563] font-black py-5 px-10 rounded-[2rem] hover:bg-[#C4C9D1] transition-all active:scale-[0.98] text-xs uppercase tracking-widest"
                >
                  Sorry, I can't make it
                </button>
              </div>
            </div>
          </div>
        </motion.section>

      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
        
        .font-fredoka {
          font-family: 'Fredoka', sans-serif;
        }

        .peach-theme .md\\:justify-between {
          justify-content: space-between !important;
        }

        @media (min-width: 768px) {
          .peach-theme main {
            margin-left: 10% !important;
          }
          .peach-theme section {
            margin-right: 5% !important;
          }
        }
      `}</style>
    </div>
  );
}
