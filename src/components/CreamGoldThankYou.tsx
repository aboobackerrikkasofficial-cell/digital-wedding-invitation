"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { MapPin, Calendar, Navigation } from "lucide-react";
import { format } from "date-fns";
import { CreamGoldBackground } from "./CreamGoldBackground";
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

export function CreamGoldThankYou({ wedding, rsvpData }: ThankYouProps) {
  const isAttending = rsvpData?.is_attending ?? true;
  const date = new Date(wedding.wedding_date);

  // Detect if running in standalone "Web App" mode to adjust for the SystemTitleBar
  const isStandalone = typeof window !== 'undefined' && 
    (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone);

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
          colors: ['#d4af37', '#e6c76b', '#ffffff']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#d4af37', '#e6c76b', '#ffffff']
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [isAttending]);

  return (
    <div className={`fixed left-0 right-0 z-40 w-full overflow-hidden flex items-center justify-center font-serif p-4 lg:p-10 bg-[#fffcf2] cream-gold-thank-you top-0 h-[100dvh] ${isStandalone ? 'pt-8' : ''}`}>
      <CreamGoldBackground bgColor="#fffcf2" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-2xl h-fit max-h-[85dvh] flex flex-col items-center justify-center p-8 lg:p-16 text-center border-2 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-white border-gold/20 shadow-[0_20px_50px_rgba(197,160,89,0.1)]"
      >
        <h1 className="text-xl lg:text-5xl mb-1 lg:mb-6 tracking-wider px-2 text-gray-900 font-poppins font-normal">
          <span className="block text-[clamp(1rem,5vw,2.375rem)] mb-0.5 lg:mb-2 text-wrap-balance leading-[1.3] py-0.5 text-[#9E7E45] font-poppins">
            {isAttending ? "Alhamdulillah!" : "Thank You"}
          </span>
          {isAttending ? "Successful" : "Message Received"}
        </h1>

        <p className="text-[clamp(11px,3vw,16px)] lg:text-xl mb-1 lg:mb-2 px-4 leading-relaxed max-w-lg mx-auto break-words text-gray-700 font-poppins">
          {isAttending 
            ? `We are honored to have you join us for our celebration, ${rsvpData?.name || "Guest"}.`
            : "Thank you for the update. Although we will miss you, your well-wishes mean a lot to us."
          }
        </p>

        <div className="flex flex-col items-center gap-1 mb-3">
          <div className="flex items-center gap-3 opacity-40">
            <div className="h-px w-10 bg-[#9E7E45]" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#9E7E45]" />
            <div className="h-px w-10 bg-[#9E7E45]" />
          </div>
          <p className="font-poppins text-[9px] lg:text-sm text-[#735B32] uppercase tracking-[0.2em] font-medium px-4">
            Your presence will make our celebration truly special
          </p>
        </div>

        {isAttending && (
          <div className="w-full space-y-3 lg:space-y-6 mb-2 lg:mb-4">
            <div className="flex flex-col items-center gap-0.5 mt-[10px]">
              <div className="flex items-center gap-2 uppercase tracking-[0.2em] text-[8px] lg:text-[12px] font-bold text-[#735B32] opacity-100 font-poppins">
                <Calendar size={10} />
                <span>Save The Date</span>
              </div>
              <p className="text-gray-900 text-[13px] lg:text-2xl break-words px-4 font-poppins font-medium">
                {format(date, "EEEE, d MMMM yyyy")}
              </p>
            </div>
 
            <div className="flex flex-col items-center gap-0.5 mt-1">
              <div className="flex items-center gap-2 uppercase tracking-[0.2em] text-[8px] lg:text-[12px] font-bold text-[#735B32] opacity-100 font-poppins">
                <MapPin size={10} />
                <span>The Venue</span>
              </div>
              <p className="text-gray-900 text-[13px] lg:text-2xl leading-tight break-words px-8 max-w-[320px] lg:max-w-md mx-auto font-poppins font-medium">
                {wedding.venue_name}
              </p>
            </div>

            {(wedding.google_maps_url || wedding.venue_address || wedding.venue_name) && (
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={wedding.google_maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding.venue_address || wedding.venue_name)}`}
                rel="noopener noreferrer"
                target="_blank"
                className="inline-flex items-center gap-3 px-8 py-3 lg:py-4 border-2 border-[#C5A059] text-[#735B32] font-poppins font-bold rounded-full tracking-[0.2em] uppercase text-[10px] lg:text-sm transition-all mt-6 hover:bg-[#C5A059]/10 shadow-lg shadow-[#C5A059]/10"
              >
                <Navigation size={16} className="text-[#C5A059]" />
                Navigate to Location
              </motion.a>
            )}
          </div>
        )}

        <div className="flex flex-col items-center opacity-40">
           <div className="flex items-center gap-2">
             <div className="w-1 h-1 rounded-full bg-[#9E7E45] opacity-40" />
             <div className="w-1.5 h-1.5 rounded-full bg-[#9E7E45] opacity-60" />
             <div className="w-1 h-1 rounded-full bg-[#9E7E45] opacity-40" />
           </div>
        </div>

        <p className="uppercase leading-relaxed text-[#735B32] opacity-100 font-poppins font-bold text-[8px] lg:text-[12px] mt-[20px] mb-0 pb-0 whitespace-nowrap tracking-[0.1em] px-4">
           {wedding.groom_name} & {wedding.bride_name}
        </p>

      </motion.div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
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
