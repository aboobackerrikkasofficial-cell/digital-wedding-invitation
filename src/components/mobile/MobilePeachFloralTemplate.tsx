"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { MapPin, Calendar, MousePointer2, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { Wedding } from "@/types/wedding";

interface PeachFloralTemplateProps {
  wedding: Wedding;
  onAttend: () => void;
  onNotAttend: () => void;
}

export function MobilePeachFloralTemplate({ wedding, onAttend, onNotAttend }: PeachFloralTemplateProps) {
  const date = new Date(wedding.wedding_date);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "auto";
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full overflow-y-auto flex flex-col items-center p-6 pt-24 pb-32 font-fredoka selection:bg-[#F4C542]/30 peach-theme">
      <div className="absolute inset-0 z-0">
        <img src="/main/portraittom&jerry.png" alt="Background" className="w-full h-full object-cover object-center no-repeat opacity-60" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center gap-8 max-w-md">
        <motion.main 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full bg-[#FDF5E6] rounded-[1.5rem] shadow-2xl p-8 border-[0.5rem] border-white/40"
        >
          <div className="absolute inset-2 border-[4px] border-dotted border-[#8B5A2B]/15 rounded-[0.8rem]" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-8">
              <span className="bg-[#2B4570] text-[#F4C542] font-black px-6 py-2 rounded-full text-[10px] uppercase tracking-widest shadow-md">YOU&apos;RE INVITED!</span>
            </div>
            <div className="mb-8 space-y-2">
              <h1 className="text-3xl font-black text-[#2B4570] tracking-tight">{wedding.bride_name}</h1>
              <div className="text-[#F4C542] text-xl font-black">&</div>
              <h1 className="text-3xl font-black text-[#8B4513] tracking-tight">{wedding.groom_name}</h1>
            </div>
            <div className="w-full space-y-6">
              <div className="relative bg-[#FFF9E6] rounded-xl p-4 border border-[#8B5A2B]/10 flex flex-col items-center">
                 <Calendar className="text-[#2B4570] mb-2" size={18} />
                 <p className="font-black text-[#2B4570] text-sm">{format(date, "EEEE, d MMM yyyy")}</p>
                 <p className="text-[#F4C542] font-black text-xs">{format(date, "h:mm a")}</p>
              </div>
              <div className="relative bg-[#FFF9E6] rounded-xl p-4 border border-[#8B5A2B]/10 flex flex-col items-center">
                 <MapPin className="text-[#F4C542] mb-2" size={18} />
                 <p className="font-black text-[#2B4570] text-sm">{wedding.venue_name}</p>
              </div>
            </div>
          </div>
        </motion.main>

        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 w-full"
        >
          <div className="bg-[#F5F5F5] p-8 rounded-[2.5rem] shadow-xl border border-white/50 text-center space-y-8">
            <h2 className="text-2xl font-black text-[#2B4570]">Will you join us?</h2>
            <div className="flex flex-col gap-4">
              <button onClick={onAttend} className="bg-gradient-to-b from-[#8B4513] to-[#5A3D1D] text-white font-black py-5 rounded-2xl shadow-[0_6px_0_#3E2A14] active:shadow-none active:translate-y-[6px] transition-all flex items-center justify-center gap-3">
                <span className="uppercase tracking-widest text-xs">Yes! Count me in!</span>
                <MousePointer2 size={16} />
              </button>
              <button onClick={onNotAttend} className="bg-[#D1D5DB] text-[#4B5563] font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest">Sorry, I can&apos;t make it</button>
            </div>
          </div>
        </motion.section>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&display=swap');
        .font-fredoka { font-family: 'Fredoka', sans-serif; }
      `}</style>
    </div>
  );
}
