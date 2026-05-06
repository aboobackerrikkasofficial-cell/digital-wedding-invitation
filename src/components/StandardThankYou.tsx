"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { MapPin, Calendar, Navigation, Heart, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { Wedding } from "@/types/wedding";

interface RsvpData {
  is_attending: boolean;
  name?: string;
  [key: string]: unknown;
}

interface ThankYouProps {
  wedding: Wedding;
  rsvpData: RsvpData;
}

export function StandardThankYou({ wedding, rsvpData }: ThankYouProps) {
  const isAttending = rsvpData?.is_attending ?? true;
  const date = new Date(wedding.wedding_date);
  const isPinkTheme = wedding.template_id === 'muslim-1' || wedding.template_id === 'muslim-2' || wedding.template_id === 'default';

  useEffect(() => {
    if (isAttending) {
      const duration = 5 * 1000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: isPinkTheme ? ['#E91E63', '#F06292', '#ffffff'] : ['#d4af37', '#e6c76b', '#ffffff']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: isPinkTheme ? ['#E91E63', '#F06292', '#ffffff'] : ['#d4af37', '#e6c76b', '#ffffff']
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [isAttending]);

  // Detect if running in standalone "Web App" mode to adjust for the SystemTitleBar
  // Detect if running in standalone "Web App" mode to adjust for the SystemTitleBar

  return (
    <div className={`fixed left-0 right-0 z-40 w-full overflow-hidden flex items-center justify-center font-serif p-4 md:p-10 ${
      isPinkTheme ? 'bg-[#FF8DA1]' : 'bg-[#fdfbf0]'
    } top-0 h-[100dvh]`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className={`relative z-10 w-full max-w-2xl flex flex-col items-center justify-center p-6 lg:p-10 text-center border-2 overflow-visible bg-white/80 backdrop-blur-md border-white shadow-xl ${
          isPinkTheme ? 'rounded-[5px] h-[82dvh]' : 'rounded-[2.5rem] md:rounded-[3rem] h-fit max-h-[calc(90dvh-40px)]'
        }`}
      >
        {isPinkTheme && (
           <motion.div
             animate={{ scale: [1, 1.05, 1] }}
             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
           >
             <img src="/pink_panther_icon.png?v=3" alt="Pink Panther" className="w-[70px] h-[70px] lg:w-[110px] lg:h-[110px] object-contain drop-shadow-2xl" />
           </motion.div>
        )}
        {!isPinkTheme && (
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-gold mb-2 lg:mb-10"
          >
            <Heart size={36} className="lg:w-[60px] lg:h-[60px] fill-gold drop-shadow-[0_0_15px_rgba(158,126,69,0.3)]" />
          </motion.div>
        )}

        <h1 className={`text-xl lg:text-5xl mb-1 lg:mb-4 tracking-wider px-2 font-cinzel ${isPinkTheme ? 'text-[#AD1457] mt-8 lg:mt-12' : 'text-white'}`}>
          <span className={`block text-[clamp(1rem,5vw,2.375rem)] mb-0.5 lg:mb-1 text-wrap-balance leading-[1.3] py-0.5 font-script ${isPinkTheme ? 'text-[#E91E63]' : 'text-gold'}`}>
            {isAttending ? (isPinkTheme ? "Blessed!" : "Alhamdulillah!") : "Thank You"}
          </span>
          {isAttending ? "Successful" : "Message Received"}
        </h1>

        <p className={`text-[clamp(11px,3vw,16px)] lg:text-xl mb-3 lg:mb-6 px-4 leading-relaxed max-w-lg mx-auto break-words italic ${isPinkTheme ? 'text-[#E91E63]/80 font-cartoon' : 'text-white/80 font-cinzel'}`}>
          {isAttending 
            ? `We are honored to have you join us for our celebration, ${rsvpData?.name || "Guest"}.`
            : "Thank you for the update. Although we will miss you, your well-wishes mean a lot to us."
          }
        </p>

        {isAttending && (
          <div className="w-full space-y-3 lg:space-y-6 mb-2 lg:mb-4">
            <div className="flex flex-col items-center gap-0.5">
              <div className={`flex items-center gap-2 uppercase tracking-[0.2em] text-[8px] lg:text-[12px] font-bold opacity-60 ${isPinkTheme ? 'text-[#E91E63] font-cartoon' : 'text-gold'}`}>
                <Calendar size={10} />
                <span>Save The Date</span>
              </div>
              <p className={`text-gray-900 text-[13px] lg:text-2xl break-words px-4 font-bold ${isPinkTheme ? 'font-cartoon' : 'font-cinzel'}`}>
                {format(date, "EEEE, d MMMM yyyy")}
              </p>
            </div>
 
            <div className="flex flex-col items-center gap-0.5 mt-1">
              <div className={`flex items-center gap-2 uppercase tracking-[0.2em] text-[8px] lg:text-[12px] font-bold opacity-60 ${isPinkTheme ? 'text-[#E91E63] font-cartoon' : 'text-gold'}`}>
                <MapPin size={10} />
                <span>The Venue</span>
              </div>
              <p className={`text-gray-900 text-[13px] lg:text-2xl leading-tight whitespace-nowrap truncate px-8 w-full max-w-full mx-auto font-bold ${isPinkTheme ? 'font-cartoon' : 'font-cinzel'}`}>
                {wedding.venue_name}
              </p>
            </div>

            {(wedding.google_maps_url || wedding.venue_name) && (
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={wedding.google_maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding.venue_name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-2.5 lg:py-4 border-2 font-black tracking-[0.1em] uppercase text-[9px] lg:text-sm transition-all mt-2 ${
                  isPinkTheme 
                    ? 'border-[#E91E63] text-[#E91E63] bg-[#E91E63]/10 hover:bg-[#E91E63]/20 font-cartoon rounded-[5px]' 
                    : 'border-gold text-gold bg-gold/10 hover:bg-gold/20 rounded-full'
                }`}
              >
                <Navigation size={14} />
                Navigate to Location
              </motion.a>
            )}
          </div>
        )}

        <div className={`flex flex-col items-center ${isPinkTheme ? 'opacity-100' : 'opacity-40'}`}>
           <div className={`h-px w-20 bg-gradient-to-r from-transparent to-transparent mb-4 ${isPinkTheme ? 'via-[#E91E63]' : 'via-gold'}`} />
           {isPinkTheme ? (
             <img src="/pink_panther_paw.png?v=3" alt="Paw" className="w-8 h-8 lg:w-12 lg:h-12 object-contain" />
           ) : (
             <Sparkles className="text-gold" size={20} />
           )}
        </div>

        <p className={`uppercase leading-relaxed tracking-[0.3em] font-black text-[10px] lg:text-[14px] mt-4 mb-0 pb-0 ${isPinkTheme ? 'text-[#E91E63] font-cartoon opacity-100' : 'text-gold font-cinzel opacity-60'}`}>
           {wedding.groom_name} & {wedding.bride_name}
        </p>

      </motion.div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Great+Vibes&family=Fredoka:wght@400;500;600;700&display=swap');
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-cartoon { font-family: 'Fredoka', sans-serif; }
        .text-gold { 
          color: #d4af37;
          background: linear-gradient(135deg, #ad924d 0%, #f7ef8a 50%, #ad924d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
