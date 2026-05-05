"use client";

import { motion } from "framer-motion";
import { Sparkles, MailOpen } from "lucide-react";

import { Wedding } from "@/types/wedding";


interface EntrySplashScreenProps {
  wedding: Wedding;
  onOpen: () => void;
}

export function EntrySplashScreen({ wedding, onOpen }: EntrySplashScreenProps) {
  const tid = wedding.template_id?.toLowerCase() || 'default';
  const isPinkTheme = tid === 'default';
  const isCreamGold = tid === 'muslim-3' || tid === 'cream-gold';
  const isAnyGold = isPinkTheme || isCreamGold;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, pointerEvents: "none" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden ${
        isPinkTheme ? 'bg-[#FF8DA1]' : isCreamGold ? 'bg-[#fffcf2]' : 'bg-[#2b1e3f]'
      }`}
    >
      {/* Background Ornaments */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
           }} 
      />
      
      {/* Floating Gold Dust */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const p = {
            opacity: (i * 3.17 % 0.3),
            x: (i * 17.13 % 100) + "%",
            y: (i * 13.57 % 100) + "%",
            duration: (i * 5.23 % 5) + 5
          };
          return (
            <motion.div
              key={i}
              initial={{ 
                opacity: p.opacity,
                x: p.x,
                y: p.y
              }}
              animate={{ 
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{ 
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-1 h-1 bg-gold rounded-full blur-[1px]"
            />
          );
        })}
      </div>

      <div className="relative flex flex-col items-center text-center px-6 max-w-md md:max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br rounded-full flex items-center justify-center shadow-2xl mx-auto mb-4 md:mb-6 border-2 ${
            isPinkTheme ? 'from-[#ffb6c1] to-[#ff8da1] shadow-[#ff8da1]/30 border-white/40' :
            isCreamGold ? 'from-[#9E7E45] to-[#735B32] shadow-[#9E7E45]/30 border-[#9E7E45]/20' : 
            'from-gold to-gold/60 shadow-gold/30 border-white/20'
          }`}>
            <MailOpen className="text-white" size={28} />
          </div>
          
          <h2 className={`text-[10px] tracking-[0.3em] uppercase mb-2 px-4 ${
            isPinkTheme ? 'text-white font-poppins' :
            isCreamGold ? 'text-gray-900 font-poppins' : 
            'text-white/80 font-sans'
          }`}>
             You are invited to the wedding of
          </h2>
          
          <h1 className={`text-3xl md:text-5xl drop-shadow-lg mb-1 ${isAnyGold ? 'font-poppins font-bold' : 'font-script text-white'}`}>
            <span className={isPinkTheme ? 'text-white' : isCreamGold ? 'text-gray-900' : 'text-gold'}>{wedding.groom_name}</span> 
            <span className={`block my-1 opacity-60 ${isPinkTheme ? 'text-white text-base uppercase tracking-widest' : isCreamGold ? 'text-gray-900 text-base uppercase tracking-widest' : 'text-lg font-cinzel text-white'}`}>
              {isAnyGold ? 'and' : 'and'}
            </span>
            <span className={isPinkTheme ? 'text-white' : isCreamGold ? 'text-gray-900' : 'text-gold'}>{wedding.bride_name}</span>
          </h1>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Synchronously trigger music playback
            window.dispatchEvent(new CustomEvent('start-music'));
            
            // Also try the fallback for standard audio elements
            const audios = document.querySelectorAll('audio');
            audios.forEach(audio => {
              audio.play().catch(e => console.log("Splash music trigger", e));
            });
            onOpen();
          }}
          className={`group relative px-8 py-3.5 md:px-10 md:py-4 font-bold rounded-full overflow-hidden shadow-xl transition-all ${
            isPinkTheme ? 'bg-[#ffb6c1] text-white shadow-[#ff8da1]/20 hover:bg-[#ffa1b2] font-poppins' :
            isCreamGold ? 'bg-[#9E7E45] text-white shadow-[#9E7E45]/20 hover:bg-[#735B32] font-poppins' :
            'bg-gold text-white shadow-gold/20 hover:bg-gold/90'
          }`}
        >
          <span className="relative z-10 flex items-center gap-3 tracking-[0.2em] uppercase text-[10px]">
            Open Invitation
            <Sparkles size={14} className="animate-pulse" />
          </span>
          <motion.div 
            className="absolute inset-0 bg-white/20"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.button>
        
        <p className={`mt-6 text-[9px] tracking-widest uppercase ${isPinkTheme ? 'text-white/60 font-poppins' : isCreamGold ? 'text-gray-900/40 font-poppins' : 'text-white/30 font-sans'}`}>
           Click to experience the cinematic journey
        </p>
      </div>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .text-gold { 
          color: #d4af37;
          background: linear-gradient(135deg, #ad924d 0%, #f7ef8a 50%, #ad924d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </motion.div>
  );
}
