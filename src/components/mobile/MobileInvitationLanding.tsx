"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { MobileElegantIslamicTemplate } from "./MobileElegantIslamicTemplate";
import { MobileRoyalPurpleIslamicTemplate } from "./MobileRoyalPurpleIslamicTemplate";
import { MobileCreamGoldIslamicTemplate } from "./MobileCreamGoldIslamicTemplate";
import { MobilePeachFloralTemplate } from "./MobilePeachFloralTemplate";
import { Wedding } from "@/types/wedding";

interface InvitationLandingProps {
  wedding: Wedding;
  onAttend: () => void;
  onNotAttend: () => void;
}

const Bismillah = () => (
  <motion.div 
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.2 }}
    className="mb-8 select-none"
  >
    <p className="text-2xl font-serif text-gold/80 italic text-center">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
    <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mt-4" />
  </motion.div>
);

export function MobileInvitationLanding({ wedding, onAttend, onNotAttend }: InvitationLandingProps) {
  const date = new Date(wedding.wedding_date);
  const tid = wedding.template_id?.toLowerCase() || 'default';

  // Mobile specific template switching
  if (tid === 'default') return <MobileElegantIslamicTemplate wedding={wedding} onAttend={onAttend} onNotAttend={onNotAttend} />;
  if (tid === 'royal' || tid === 'muslim-royal' || tid === 'muslim-purple') return <MobileRoyalPurpleIslamicTemplate wedding={wedding} onAttend={onAttend} onNotAttend={onNotAttend} />;
  if (tid === 'muslim-3' || tid === 'cream-gold') return <MobileCreamGoldIslamicTemplate wedding={wedding} onAttend={onAttend} onNotAttend={onNotAttend} />;
  if (tid === 'non-muslim-1' || tid === 'peach-floral') return <MobilePeachFloralTemplate wedding={wedding} onAttend={onAttend} onNotAttend={onNotAttend} />;

  return (
    <div className="relative min-h-screen w-full bg-[#fdfbf0] overflow-y-auto flex flex-col items-center font-sans">
      <main className="relative z-10 w-full px-4 py-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full bg-white/60 backdrop-blur-xl rounded-[3rem] overflow-hidden shadow-2xl border border-white/80 p-8 flex flex-col items-center text-center"
        >
          <Bismillah />
          
          <p className="text-gold font-serif text-xs tracking-[0.4em] uppercase font-black mb-4">Nikah Invitation</p>
          
          <h1 className="text-4xl font-serif font-bold text-gray-900 leading-tight mb-6">
            <span className="block">{wedding.bride_name}</span>
            <span className="text-gold font-playfair italic lowercase text-2xl opacity-60 my-2 block">&</span>
            <span className="block">{wedding.groom_name}</span>
          </h1>

          {wedding.custom_message && (
            <p className="text-gray-500 text-sm font-serif italic leading-relaxed mb-8 px-2">
                &quot;{wedding.custom_message}&quot;
            </p>
          )}

          <div className="w-full space-y-4 mb-10">
             <div className="bg-white/40 rounded-2xl p-4 border border-white/50">
                <p className="font-black text-gray-900 text-sm tracking-wide uppercase">{format(date, "EEEE, d MMM yyyy")}</p>
                <p className="text-gold text-xs font-bold mt-1">{format(date, "h:mm a")}</p>
             </div>
             <div className="bg-white/40 rounded-2xl p-4 border border-white/50">
                <p className="font-black text-gray-900 text-sm tracking-wide uppercase truncate px-2">{wedding.venue_name}</p>
             </div>
          </div>

          <div className="w-full flex flex-col gap-3">
             <button onClick={onAttend} className="w-full bg-gold text-white font-bold py-4 rounded-xl shadow-lg shadow-gold/20 active:scale-95 transition-all uppercase tracking-widest text-xs">
                I Will Attend
             </button>
             <button onClick={onNotAttend} className="w-full bg-white border border-gold/10 text-gray-400 font-bold py-4 rounded-xl active:scale-95 transition-all uppercase tracking-widest text-xs">
                Maybe Next Time
             </button>
          </div>
        </motion.div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,900&family=Inter:wght@400;700;900&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
      `}</style>
    </div>
  );
}
