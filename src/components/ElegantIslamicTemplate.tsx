"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { MapPin } from "lucide-react";

interface Wedding {
  wedding_date: string;
  bride_name: string;
  groom_name: string;
  venue_name: string;
  google_maps_url?: string;
  custom_message?: string;
  [key: string]: unknown;
}

interface ElegantTemplateProps {
  wedding: Wedding;
  onAttend: () => void;
  onNotAttend: () => void;
}

export function ElegantIslamicTemplate({ wedding, onAttend, onNotAttend }: ElegantTemplateProps) {
  const date = new Date(wedding.wedding_date);
  
  return (
    <div className="relative min-h-[100dvh] bg-[#fdfbf0] flex items-center justify-center p-4 md:p-8 overflow-hidden font-serif selection:bg-gold/20">
      
      {/* 1. BACKGROUND LAYER: Watercolor and Florals */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/elegant-bg.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf0]/20 via-transparent to-[#fdfbf0]/20" />
      </div>

      {/* 2. MAIN CARD CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl bg-white/40 backdrop-blur-sm p-10 md:p-20 text-center border border-white/50 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] rounded-[0.5rem]"
      >
        {/* Shimmer effect for gold elements */}
        <div className="absolute inset-0 rounded-[0.5rem] overflow-hidden pointer-events-none">
            <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[30deg]"
            />
        </div>

        {/* Header: Calligraphy */}
        <div className="mb-12 space-y-4">
            <motion.img 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                src="/bismillah.png" 
                alt="Bismillah" 
                className="h-16 md:h-24 mx-auto object-contain drop-shadow-[0_2px_4px_rgba(212,175,55,0.2)]"
            />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-gold font-sans font-bold opacity-70">
                In the name of Allah, the most gracious, the most merciful.
            </p>
        </div>

        {/* Content Section */}
        <div className="space-y-12">
            <p className="text-[11px] md:text-sm uppercase tracking-[0.3em] text-gray-500 max-w-md mx-auto leading-relaxed">
                Together with our families, we request the honor of your presence at the
            </p>

            <div className="space-y-4">
                <p className="text-3xl md:text-4xl font-playfair italic text-gold opacity-80">Wedding of</p>
                <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 2 }}
                    className="text-6xl md:text-8xl font-playfair text-transparent bg-clip-text bg-gradient-to-b from-[#ad924d] via-[#d4af37] to-[#ad924d] py-2"
                >
                    {wedding.bride_name} <br className="md:hidden" /> & <br className="md:hidden" /> {wedding.groom_name}
                </motion.h1>
            </div>

            <p className="text-base md:text-lg text-gray-600 italic tracking-wide">
                Invite you to celebrate our ceremony in sha Allah
            </p>

            {/* SYMMETRICAL DATE SECTION */}
            <div className="py-12 flex flex-col items-center">
                <div className="text-gold font-sans font-bold tracking-[0.5em] text-xs mb-4 uppercase">
                    {format(date, "MMMM")}
                </div>
                
                <div className="flex items-center gap-8 md:gap-12">
                    <div className="flex-1 text-right">
                        <div className="text-[10px] md:text-xs font-sans font-bold tracking-[0.3em] text-gray-400 uppercase">
                            {format(date, "EEEE")}
                        </div>
                    </div>
                    
                    <div className="h-16 w-px bg-gold/30" />
                    
                    <div className="text-5xl md:text-7xl font-playfair text-gray-900 leading-none">
                        {format(date, "d")}
                    </div>
                    
                    <div className="h-16 w-px bg-gold/30" />
                    
                    <div className="flex-1 text-left">
                        <div className="text-[10px] md:text-xs font-sans font-bold tracking-[0.3em] text-gray-400 uppercase">
                            AT {format(date, "h:mm a")}
                        </div>
                    </div>
                </div>
                
                <div className="text-gold font-sans font-bold tracking-[0.5em] text-xs mt-4 uppercase">
                    {format(date, "yyyy")}
                </div>
            </div>

            {/* Venue Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-gold opacity-60">
                    <MapPin size={18} />
                </div>
                <p className="text-lg md:text-xl font-playfair text-gray-900 px-6 leading-relaxed">
                    {wedding.venue_name}
                </p>
                {wedding.google_maps_url && (
                    <a 
                        href={wedding.google_maps_url} 
                        target="_blank" 
                        className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold hover:underline"
                    >
                        Navigate to Venue →
                    </a>
                )}
            </div>

            {wedding.custom_message && (
                <div className="max-w-lg mx-auto py-8">
                    <p className="text-gray-500 italic text-base leading-relaxed">
                        &quot;{wedding.custom_message}&quot;
                    </p>
                </div>
            )}
        </div>

        {/* Action Buttons */}
        <div className="mt-20 flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
            <button 
                onClick={onAttend}
                className="flex-1 bg-gold text-white font-bold py-6 rounded-full shadow-[0_20px_50px_rgba(212,175,55,0.3)] hover:bg-gold/90 transition-all active:scale-[0.98] text-sm uppercase tracking-widest"
            >
                Confirm Attendance
            </button>
            <button 
                onClick={onNotAttend}
                className="flex-1 bg-white border border-gold/20 text-gray-400 font-bold py-6 rounded-full hover:bg-gray-50 transition-all active:scale-[0.98] text-sm uppercase tracking-widest"
            >
                Decline
            </button>
        </div>

        <div className="mt-16 pt-8 border-t border-gold/10">
            <p className="text-[10px] font-sans font-bold text-gold/30 uppercase tracking-[0.8em]">RSVP BY {format(new Date(), "MMM d")}</p>
        </div>
      </motion.div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
      `}</style>
    </div>
  );
}
