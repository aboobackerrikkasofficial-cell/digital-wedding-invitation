"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { MapPin, Calendar, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { useEffect } from "react";
import { ElegantIslamicTemplate } from "./ElegantIslamicTemplate";
import { RoyalPurpleIslamicTemplate } from "./RoyalPurpleIslamicTemplate";
import { CreamGoldIslamicTemplate } from "./CreamGoldIslamicTemplate";
import { PeachFloralTemplate } from "./PeachFloralTemplate";

interface Wedding {
  id: string;
  template_id: string;
  wedding_date: string;
  bride_name: string;
  groom_name: string;
  venue_name: string;
  google_maps_url?: string;
  custom_message?: string;
  islamic_date?: string;
  [key: string]: unknown;
}

interface InvitationLandingProps {
  wedding: Wedding;
  onAttend: () => void;
  onNotAttend: () => void;
}

// Premium Islamic Geometric Pattern Overlay
const IslamicPattern = () => (
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
       style={{ 
         backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l5.878 18.09h19.022L39.46 29.18 45.338 47.27 30 36.18 14.662 47.27 20.54 29.18 5.1 18.09h19.022z' fill='%23d4af37' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
         backgroundSize: '40px 40px' 
       }} 
  />
);

const Bismillah = () => (
  <motion.div 
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.2 }}
    className="mb-8 select-none"
  >
    <p className="text-3xl font-serif text-gold/80 italic">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
    <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mt-4" />
  </motion.div>
);

// Particle Component for the background
const Particles = () => {
  const getParticle = (i: number) => ({
    x: (i * 13.57 % 100) + "%",
    y: (i * 17.13 % 100) + "%",
    opacity: (i * 7.41 % 0.5) + 0.2,
    duration: (i * 11.23 % 10) + 10,
    delay: (i * 5.17 % 10)
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => {
        const p = getParticle(i);
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full"
            initial={{ 
              x: p.x, 
              y: p.y,
              opacity: p.opacity
            }}
            animate={{ 
              y: ["-10%", "110%"],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              ease: "linear",
              delay: p.delay
            }}
          />
        );
      })}
    </div>
  );
};

export function InvitationLanding({ wedding, onAttend, onNotAttend }: InvitationLandingProps) {
  const date = new Date(wedding.wedding_date);

  // Parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 40);
      mouseY.set((clientY / innerHeight - 0.5) * 40);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);


  // Switch to specialized templates
  if (wedding.template_id === 'muslim-1' || wedding.template_id === 'muslim-2' || wedding.template_id === 'default') {
    return <ElegantIslamicTemplate wedding={wedding} onAttend={onAttend} onNotAttend={onNotAttend} />;
  }

  if (wedding.template_id === 'royal' || wedding.template_id === 'muslim-royal') {
    return <RoyalPurpleIslamicTemplate wedding={wedding} onAttend={onAttend} onNotAttend={onNotAttend} />;
  }

  if (wedding.template_id === 'muslim-3') {
    return <CreamGoldIslamicTemplate wedding={wedding} onAttend={onAttend} onNotAttend={onNotAttend} />;
  }

  if (wedding.template_id === 'non-muslim-1') {
    return <PeachFloralTemplate wedding={wedding} onAttend={onAttend} onNotAttend={onNotAttend} />;
  }
  
  // Unified premium redesign for all other templates


  return (
    <div className="relative h-[100dvh] w-full bg-[#fdfbf0] overflow-hidden flex items-center justify-center md:justify-start font-sans selection:bg-gold/30">
      
      {/* 1. CINEMATIC BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div style={{ x: springX, y: springY }} className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#fdfbf0] via-white to-[#fdfbf0]" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[180px] -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[180px] -ml-40 -mb-40" />
            <IslamicPattern />
            <Particles />
        </motion.div>
      </div>


      {/* 4. MAIN INVITATION CARD (LEFT ALIGNED) */}
      <main className="relative z-10 w-full max-w-2xl px-6 md:px-0 md:ml-32 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-white/40 backdrop-blur-2xl rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-30px_rgba(173,146,77,0.15)] border border-white/60 flex flex-col relative group"
        >
          {/* Subtle Border Motif */}
          <div className="absolute inset-0 border-[20px] border-gold/5 pointer-events-none m-4 rounded-[3rem]" />
          
          <div className="relative z-10 flex flex-col items-center text-center p-10 md:p-16">
            
            <Bismillah />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mb-12"
            >
                <p className="text-gold font-serif text-xs md:text-sm tracking-[0.5em] uppercase font-black mb-6">Nikah Invitation</p>
                
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-none mb-4">
                    <span className="block mb-2">{wedding.bride_name}</span>
                    <span className="text-gold font-playfair italic lowercase text-3xl opacity-60">and</span>
                    <span className="block mt-2">{wedding.groom_name}</span>
                </h1>

                {wedding.custom_message && (
                  <p className="max-w-md mx-auto text-gray-500 text-sm md:text-base font-serif italic leading-relaxed mt-8 opacity-80">
                      &quot;{wedding.custom_message}&quot;
                  </p>
                )}
            </motion.div>

            {/* Structured Details Grid */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 pb-12"
            >
               <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/50 flex flex-col items-center justify-center group/item hover:border-gold/30 transition-all duration-500">
                  <Calendar className="text-gold mb-4 group-hover/item:scale-110 transition-transform" size={28} strokeWidth={1.5} />
                  <div className="font-serif">
                    <p className="font-black text-gray-900 text-sm md:text-base tracking-wide uppercase">{format(date, "EEEE, d MMM yyyy")}</p>
                    <p className="text-gold text-xs font-bold mt-2 tracking-widest">{format(date, "h:mm a")}</p>
                    {wedding.islamic_date && <p className="text-gray-400 text-[10px] sm:text-xs font-serif italic mt-3 border-t border-gray-100 pt-3">{wedding.islamic_date}</p>}
                  </div>
               </div>

               <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/50 flex flex-col items-center justify-center group/item hover:border-gold/30 transition-all duration-500">
                  <MapPin className="text-gold mb-4 group-hover/item:scale-110 transition-transform" size={28} strokeWidth={1.5} />
                  <div className="font-serif w-full px-4">
                    <p className="font-black text-gray-900 text-sm md:text-base tracking-wide uppercase mb-2 truncate">{wedding.venue_name}</p>
                    {wedding.google_maps_url && (
                        <a 
                          href={wedding.google_maps_url} 
                          target="_blank" 
                          className="inline-flex items-center gap-2 text-[10px] text-gold font-black tracking-widest uppercase hover:text-gray-900 transition-colors"
                        >
                          View Map <Sparkles size={10} />
                        </a>
                    )}
                  </div>
               </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1.2 }}
               className="pt-8 w-full max-w-sm flex flex-col gap-4"
            >
               <button 
                  onClick={onAttend}
                  className="w-full bg-gold text-white font-bold py-4 rounded-2xl shadow-lg shadow-gold/20 hover:bg-gold/90 transition-all active:scale-[0.98] uppercase tracking-widest text-xs"
               >
                  I Will Attend
               </button>
               <button 
                  onClick={onNotAttend}
                  className="w-full bg-white border border-gold/10 text-gray-400 font-bold py-4 rounded-2xl hover:bg-gray-50 transition-all active:scale-[0.98] uppercase tracking-widest text-xs"
               >
                  Maybe Next Time
               </button>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.4 }}
               transition={{ delay: 1.5 }}
               className="pt-8 border-t border-gold/10 w-48 mt-8"
            >
               <p className="text-[10px] text-gray-400 uppercase tracking-[0.5em] font-black italic">May Allah Bless this Union</p>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,900&family=Inter:wght@400;700;900&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        body { background-color: #fdfbf0; }
      `}</style>
    </div>
  );
}
