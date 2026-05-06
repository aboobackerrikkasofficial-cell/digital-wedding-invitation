"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { Countdown } from "../Countdown";
import { CreamGoldBackground } from "../CreamGoldBackground";
import { Wedding } from "@/types/wedding";

interface TemplateProps {
  wedding: Wedding;
  onAttend?: () => void;
  onNotAttend?: () => void;
}

export function MobileCreamGoldIslamicTemplate({ wedding, onAttend, onNotAttend }: TemplateProps) {
  const date = new Date(wedding.wedding_date);
  const hasNikah = !!wedding.nikah_date;
  
  return (
    <div className="relative min-h-screen w-full bg-[#fffcf2] overflow-y-auto flex flex-col items-center p-6 pt-24 pb-32 cream-gold-theme">
      <CreamGoldBackground />

      <div className="relative z-10 flex flex-col gap-8 w-full max-w-md">
        <main className="relative w-full border-[1px] border-[#c5a059]/30 rounded-[1.8rem] bg-white shadow-2xl overflow-hidden p-6 pt-12 text-center">
          <div className="absolute inset-0 z-0">
            <img src="/invitationletter.jpg" alt="Background" className="w-full h-full object-cover opacity-60" />
          </div>

          <div className="relative z-10 space-y-6">
            <p className="text-gold-primary font-poppins text-[10px] tracking-[0.1em] uppercase">
              IN THE NAME OF ALLAH
            </p>

            <div className="space-y-1">
              <p className="text-gold-primary font-poppins text-sm font-extrabold uppercase">
                {wedding.host_selection === 'bride_side' ? `${wedding.bride_father_name} & ${wedding.bride_mother_name}` : `${wedding.groom_father_name} & ${wedding.groom_mother_name}`}
              </p>
              <p className="text-gold-muted font-poppins text-[10px] uppercase font-bold tracking-widest">
                {wedding.host_selection === 'bride_side' ? wedding.bride_place : wedding.groom_place}
              </p>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-cinzel text-gold-dark font-extrabold uppercase leading-tight px-4">
                {wedding.host_selection === 'bride_side' ? wedding.bride_name : wedding.groom_name}
              </h1>
              <p className="text-gold-muted font-serif text-xs tracking-[0.4em] uppercase opacity-60">WITH</p>
              <h1 className="text-2xl font-cinzel text-gold-dark font-extrabold uppercase leading-tight px-4">
                {wedding.host_selection === 'bride_side' ? wedding.groom_name : wedding.bride_name}
              </h1>
            </div>

            <div className="pt-4 border-t border-gold-muted/10 space-y-2">
               <p className="text-gold-primary font-poppins font-bold uppercase text-xs">
                 {format(date, "EEEE, d MMM yyyy")} • {format(date, "h:mm a")}
               </p>
               <p className="text-gold-primary font-cinzel text-xs font-bold uppercase tracking-widest">{wedding.venue_name}</p>
            </div>

            {hasNikah && (
              <div className="pt-4 border-t border-gold-muted/10 space-y-1">
                <p className="text-gold-primary font-cinzel text-sm font-black uppercase tracking-widest">Nikah Ceremony</p>
                <p className="text-gold-primary font-poppins text-[10px] font-bold uppercase">
                  {wedding.nikah_date ? format(new Date(wedding.nikah_date), "EEEE, d MMM") : ""} • {wedding.nikah_time ? format(new Date(`2000-01-01T${wedding.nikah_time as string}`), "h:mm a") : ""}
                </p>
                <p className="text-gold-primary font-cinzel text-[10px] font-bold uppercase tracking-widest">{wedding.nikah_location}</p>
              </div>
            )}
          </div>
        </main>

        <div className="w-full bg-white rounded-[1.8rem] p-8 text-center shadow-xl border border-gold-muted/20 space-y-4">
          <p className="text-gold-muted font-serif text-[10px] font-black tracking-widest uppercase">Countdown</p>
          <Countdown targetDate={wedding.wedding_date} numberClassName="text-gold-dark" labelClassName="text-gold-muted" separatorClassName="text-gold-muted/40" />
        </div>

        <div className="w-full bg-white rounded-[1.8rem] p-8 text-center shadow-xl border border-gold-muted/20 space-y-6">
          <h3 className="text-gray-900 font-poppins text-xl font-normal tracking-wide">Will you attend?</h3>
          <div className="flex flex-col gap-3">
            <button onClick={onAttend} className="w-full py-4 bg-gold-muted text-white font-poppins font-semibold rounded-xl tracking-widest uppercase text-xs shadow-lg shadow-gold-muted/20">Insha&apos;Allah will attend</button>
            <button onClick={onNotAttend} className="w-full py-4 border border-gold-muted/30 text-gold-muted font-poppins font-semibold rounded-xl tracking-widest uppercase text-xs">No, we can&apos;t</button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&family=Cinzel:wght@400;700&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .text-gold-primary { color: #9E7E45; }
        .text-gold-muted { color: #C5A059; }
        .text-gold-dark { color: #735B32; }
        .bg-gold-muted { background-color: #C5A059; }
      `}</style>
    </div>
  );
}
