"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { Countdown } from "../Countdown";
import { PinkPantherBackground } from "../PinkPantherBackground";
import { Wedding } from "@/types/wedding";

interface ElegantTemplateProps {
  wedding: Wedding;
  onAttend?: () => void;
  onNotAttend?: () => void;
}

export function MobileElegantIslamicTemplate({ wedding, onAttend, onNotAttend }: ElegantTemplateProps) {
  const date = new Date(wedding.wedding_date);
  const hasNikah = !!wedding.nikah_date;
  
  return (
    <div className="relative min-h-screen w-full bg-[#fdfbf0] overflow-y-auto overflow-x-hidden flex flex-col items-center p-6 pb-32 cream-gold-theme" style={{ paddingTop: 'calc(20px + env(safe-area-inset-top))' }}>
      <PinkPantherBackground bgColor="#FF8DA1" />

      {/* Floating Background Head */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.img 
          src="/pink_panther_icon.png"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[10%] w-24 h-24 opacity-10"
        />
      </div>

      <div className="relative z-10 flex flex-col gap-8 w-full max-w-md">
        <main className="relative w-full min-h-[calc(100dvh-20px)] border-[1px] border-[#c5a059]/30 bg-white shadow-2xl rounded-[1.5rem] overflow-hidden px-8 py-16 text-center flex flex-col items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img src="/pinkpanther3d.png" alt="Background" className="w-full h-full object-contain opacity-60 scale-110" />
          </div>

          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
            initial="hidden"
            animate="show"
            className="relative z-10 w-full flex-grow flex flex-col items-center justify-center text-center mt-4"
          >
            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="text-pink-primary font-cartoon text-[8px] tracking-[0.05em] font-normal uppercase mb-3 whitespace-nowrap"
            >
              {wedding.template_id === 'default' 
                ? "IN THE NAME OF GOD, THE MOST GRACIOUS, THE MOST KIND" 
                : "IN THE NAME OF ALLAH THE MOST BENEFICENT THE MOST MERCIFUL"}
            </motion.p>

            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="flex flex-col items-center mb-4">
              <p className="text-pink-primary font-poppins text-[10px] font-extrabold uppercase tracking-tight mb-0.5">
                {wedding.host_selection === 'bride_side' 
                  ? `${wedding.bride_father_name || ""} & ${wedding.bride_mother_name || ""}` 
                  : `${wedding.groom_father_name || ""} & ${wedding.groom_mother_name || ""}`}
              </p>
              <p className="text-pink-muted font-poppins text-[8px] uppercase tracking-widest font-bold">
                {wedding.host_selection === 'bride_side' ? (wedding.bride_place || "") : (wedding.groom_place || "")}
              </p>
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              className="text-pink-primary font-poppins text-[8px] tracking-tight font-medium uppercase mb-3 flex flex-col items-center gap-0 leading-tight"
            >
              <span>REQUEST THE PLEASURE OF YOUR COMPANY AT THE WEDDING CEREMONY</span>
              <span>OF OUR BELOVED {wedding.host_selection === 'bride_side' ? 'DAUGHTER' : 'SON'}</span>
            </motion.p>

            <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }} className="flex flex-col items-center w-full mb-3">
              <h1 className="text-pink-dark font-cartoon text-2xl font-black uppercase leading-tight px-4 drop-shadow-sm">
                {wedding.host_selection === 'bride_side' ? wedding.bride_name : wedding.groom_name}
              </h1>
              <p className="text-pink-muted font-cartoon text-[9px] tracking-[0.4em] uppercase my-1 opacity-60">WITH</p>
              <h1 className="text-pink-dark font-cartoon text-2xl font-black uppercase leading-tight px-4 drop-shadow-sm">
                {wedding.host_selection === 'bride_side' ? wedding.groom_name : wedding.bride_name}
              </h1>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="flex flex-col items-center mb-4">
              <p className="text-pink-primary font-poppins text-[9px] font-extrabold uppercase tracking-tight">
                {wedding.host_selection === 'bride_side' 
                  ? (wedding.groom_father_name ? `S/O ${wedding.groom_father_name} & ${wedding.groom_mother_name || ""}` : "") 
                  : (wedding.bride_father_name ? `D/O ${wedding.bride_father_name} & ${wedding.bride_mother_name || ""}` : "")}
              </p>
              <p className="text-pink-muted font-poppins text-[8px] uppercase tracking-widest font-bold">
                {wedding.host_selection === 'bride_side' ? wedding.groom_place : wedding.bride_place}
              </p>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="w-full flex flex-col items-center gap-0">
              <p className="text-pink-primary font-poppins text-[10px] font-medium uppercase tracking-tight mb-0.5">
                {wedding.template_id === 'default' ? "BY THE GRACE OF GOD" : "IN SHAA ALLAH"}
              </p>
              <p className="text-pink-primary font-poppins font-bold uppercase text-[11px] mb-0.5">
                {format(date, "EEEE, MMMM do")} AT {format(date, "h:mm a")}
              </p>
              <p className="text-pink-primary font-cinzel text-[11px] font-bold uppercase tracking-widest">{wedding.venue_name}</p>
              
              <div className="mt-4 flex flex-col items-center w-full">
                {hasNikah && (
                  <div className="flex flex-col items-center w-full px-4">
                    <p className="text-pink-primary font-cinzel text-xs font-black uppercase tracking-[0.1em] mb-1">
                      {wedding.template_id === 'default' ? "Wedding Ceremony" : "Nikah Ceremony"}
                    </p>
                    <p className="text-pink-primary font-poppins text-[10px] font-bold uppercase tracking-widest leading-tight">
                      {wedding.nikah_date ? format(new Date(wedding.nikah_date), "EEEE, d MMM") : ""} • {wedding.nikah_time ? format(new Date(`2000-01-01T${wedding.nikah_time as string}`), "h:mm a") : ""}
                    </p>
                    {wedding.nikah_islamic_date && (
                      <p className="text-pink-muted font-poppins text-[8px] font-bold uppercase tracking-widest mt-0.5">{wedding.nikah_islamic_date}</p>
                    )}
                    <p className="text-pink-primary font-cinzel text-[9px] font-bold uppercase tracking-wider">{wedding.nikah_location}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </main>

        {/* Scroll Indicator Block */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 py-4"
        >
          <div className="w-1 h-8 bg-gradient-to-b from-pink-primary to-transparent rounded-full opacity-40" />
          <p className="text-pink-primary font-cartoon text-[8px] uppercase tracking-[0.3em] font-bold">Scroll Down</p>
        </motion.div>

        <div className="w-full bg-[#FF8DA1] rounded-[1.5rem] p-8 text-center shadow-xl space-y-4">
          <p className="text-white/80 font-cartoon text-[10px] font-black tracking-widest uppercase">Countdown</p>
          <Countdown targetDate={wedding.wedding_date} numberClassName="text-white" labelClassName="text-white/70" separatorClassName="text-white/40" />
        </div>

        <div className="w-full bg-[#FF8DA1] rounded-[1.5rem] p-8 text-center shadow-xl space-y-6">
          <h3 className="text-white font-cartoon text-xl font-normal tracking-wide">Will you attend?</h3>
          <div className="flex flex-col gap-3">
            <button onClick={onAttend} className="w-full py-4 bg-white text-pink-primary font-cartoon font-bold rounded-[0.5rem] tracking-widest uppercase text-xs shadow-lg">
              {wedding.template_id === 'default' ? "Happy to attend" : "Insha'Allah will attend"}
            </button>
            <button onClick={onNotAttend} className="w-full py-4 border-2 border-white text-white font-cartoon font-bold rounded-[0.5rem] tracking-widest uppercase text-xs">No, we can&apos;t</button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&family=Fredoka:wght@400;600;700&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-cartoon { font-family: 'Fredoka', sans-serif; }
        .text-pink-primary { color: #E91E63; }
        .text-pink-muted { color: #F06292; }
        .text-pink-dark { color: #AD1457; }
      `}</style>
    </div>
  );
}
