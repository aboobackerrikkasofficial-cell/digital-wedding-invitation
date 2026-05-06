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
    <div className="relative min-h-screen w-full bg-[#fdfbf0] overflow-y-auto flex flex-col items-center p-6 pt-24 pb-32 cream-gold-theme">
      <PinkPantherBackground bgColor="#FF8DA1" />

      <div className="relative z-10 flex flex-col gap-8 w-full max-w-md">
        <main className="relative w-full border-[1px] border-[#c5a059]/30 bg-white shadow-2xl rounded-[1.5rem] overflow-hidden p-6 pt-12 text-center">
          <div className="absolute inset-0 z-0">
            <img src="/pinkpanther3d.png" alt="Background" className="w-full h-full object-cover opacity-60" />
          </div>

          <div className="relative z-10 space-y-6">
            <p className="text-pink-primary font-cartoon text-[10px] tracking-[0.1em] uppercase">
              {wedding.template_id === 'default' ? "IN THE NAME OF GOD" : "IN THE NAME OF ALLAH"}
            </p>

            <div className="space-y-1">
              <p className="text-pink-primary font-poppins text-sm font-extrabold uppercase">
                {wedding.host_selection === 'bride_side' ? `${wedding.bride_father_name || ""} & ${wedding.bride_mother_name || ""}` : `${wedding.groom_father_name || ""} & ${wedding.groom_mother_name || ""}`}
              </p>
              <p className="text-pink-muted font-poppins text-[10px] uppercase font-bold tracking-widest">
                {wedding.host_selection === 'bride_side' ? (wedding.bride_place || "") : (wedding.groom_place || "")}
              </p>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-cartoon text-pink-dark font-extrabold uppercase leading-tight px-4">
                {wedding.host_selection === 'bride_side' ? wedding.bride_name : wedding.groom_name}
              </h1>
              <p className="text-pink-muted font-cartoon text-xs tracking-[0.4em] uppercase opacity-60">WITH</p>
              <h1 className="text-2xl font-cartoon text-pink-dark font-extrabold uppercase leading-tight px-4">
                {wedding.host_selection === 'bride_side' ? wedding.groom_name : wedding.bride_name}
              </h1>
            </div>

            <div className="pt-4 border-t border-pink-muted/10 space-y-2">
               <p className="text-pink-primary font-poppins font-bold uppercase text-xs">
                 {format(date, "EEEE, d MMM yyyy")} • {format(date, "h:mm a")}
               </p>
               <p className="text-pink-primary font-cinzel text-xs font-bold uppercase tracking-widest">{wedding.venue_name}</p>
            </div>

            {hasNikah && (
              <div className="pt-4 border-t border-pink-muted/10 space-y-1">
                <p className="text-pink-primary font-cinzel text-sm font-black uppercase tracking-widest">
                  {wedding.template_id === 'default' ? "Wedding Ceremony" : "Nikah Ceremony"}
                </p>
                <p className="text-pink-primary font-poppins text-[10px] font-bold uppercase">
                  {wedding.nikah_date ? format(new Date(wedding.nikah_date), "EEEE, d MMM") : ""} • {wedding.nikah_time ? format(new Date(`2000-01-01T${wedding.nikah_time as string}`), "h:mm a") : ""}
                </p>
                <p className="text-pink-primary font-cinzel text-[10px] font-bold uppercase tracking-widest">{wedding.nikah_location}</p>
              </div>
            )}
          </div>
        </main>

        <div className="w-full bg-[#FF8DA1] rounded-[1.5rem] p-8 text-center shadow-xl space-y-4">
          <p className="text-white/80 font-cartoon text-[10px] font-black tracking-widest uppercase">Countdown</p>
          <Countdown targetDate={wedding.wedding_date} numberClassName="text-white" labelClassName="text-white/70" separatorClassName="text-white/40" />
        </div>

        <div className="w-full bg-[#FF8DA1] rounded-[1.5rem] p-8 text-center shadow-xl space-y-6">
          <h3 className="text-white font-cartoon text-xl font-normal tracking-wide">Will you attend?</h3>
          <div className="flex flex-col gap-3">
            <button onClick={onAttend} className="w-full py-4 bg-white text-pink-primary font-cartoon font-bold rounded-[0.5rem] tracking-widest uppercase text-xs shadow-lg">Insha&apos;Allah will attend</button>
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
