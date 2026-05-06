"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { MapPin, Calendar, Navigation, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { Wedding } from "@/types/wedding";

interface Particle {
  size: number;
  duration: number;
  delay: number;
  left: number;
  color: string;
}

const getParticle = (i: number): Particle => ({
  size: (i * 7.13 % 2) + 1,
  duration: (i * 13.17 % 15) + 10,
  delay: (i * 19.23 % 20) - 20,
  left: (i * 37.41 % 100),
  color: i % 2 === 0 ? '#D4AF37' : '#E6C76B'
});

const GoldDustBackground = ({ particles }: { particles: Particle[] }) => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#251a36] via-[#2b1e3f] to-[#3a2455] animate-gradient-slow" />
    {particles.map((particle, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-gold opacity-20"
        style={{
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          left: `${particle.left}%`,
          top: '110%',
          animation: `floatDust ${particle.duration}s linear infinite`,
          animationDelay: `${particle.delay}s`,
          backgroundColor: particle.color,
        }}
      />
    ))}
  </div>
);

interface RsvpData {
  is_attending: boolean;
  name?: string;
  [key: string]: unknown;
}

interface ThankYouProps {
  wedding: Wedding;
  rsvpData: RsvpData;
}

export function RoyalPurpleThankYou({ wedding, rsvpData }: ThankYouProps) {
  const isAttending = rsvpData?.is_attending ?? true;
  const date = new Date(wedding.wedding_date);
  const particles = useMemo(() => [...Array(40)].map((_, i) => getParticle(i)), []);

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

  // Detect if running in standalone "Web App" mode to adjust for the SystemTitleBar
  const isStandalone = typeof window !== 'undefined' && 
    (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone);

  return (
    <div className={`fixed left-0 right-0 z-40 w-full overflow-hidden flex items-center justify-center font-serif p-4 md:p-10 bg-[#2b1e3f] top-0 h-[100dvh] ${isStandalone ? 'pt-8' : ''}`}>
      <GoldDustBackground particles={particles} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-2xl h-fit max-h-[82dvh] flex flex-col items-center justify-center p-8 lg:p-16 text-center border-2 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-white/5 backdrop-blur-md border-gold/25 shadow-[12px_12px_30px_rgba(212,175,55,0.12)] lg:py-[85px]"
      >
        <h1 className="text-xl lg:text-5xl mb-1 lg:mb-6 tracking-wider px-2 text-white font-cinzel">
          <span className="block text-[clamp(1rem,5vw,2.375rem)] mb-0.5 lg:mb-2 text-wrap-balance leading-[1.3] py-0.5 text-gold font-script">
            {isAttending ? "Alhamdulillah!" : "Thank You"}
          </span>
          {isAttending ? "Successful" : "Message Received"}
        </h1>

        <p className="text-[clamp(11px,3vw,16px)] lg:text-xl mb-3 lg:mb-8 px-4 leading-relaxed max-w-lg mx-auto break-words text-white/80 font-cinzel italic">
          {isAttending 
            ? `We are honored to have you join us for our celebration, ${rsvpData?.name || "Guest"}.`
            : "Thank you for the update. Although we will miss you, your well-wishes mean a lot to us."
          }
        </p>

        {isAttending && (
          <div className="w-full space-y-3 lg:space-y-6 mb-2 lg:mb-4">
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-2 uppercase tracking-[0.2em] text-[8px] lg:text-[12px] font-bold text-gold opacity-60">
                <Calendar size={10} />
                <span>Save The Date</span>
              </div>
              <p className="text-white text-[13px] lg:text-2xl break-words px-4 font-cinzel font-bold">
                {format(date, "EEEE, d MMMM yyyy")}
              </p>
            </div>
 
            <div className="flex flex-col items-center gap-0.5 mt-1">
              <div className="flex items-center gap-2 uppercase tracking-[0.2em] text-[8px] lg:text-[12px] font-bold text-gold opacity-60">
                <MapPin size={10} />
                <span>The Venue</span>
              </div>
              <p className="text-white text-[13px] lg:text-2xl leading-tight break-words px-8 max-w-[320px] lg:max-w-md mx-auto font-cinzel font-bold">
                {wedding.venue_name}
              </p>
            </div>

            {wedding.google_maps_url && (
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={wedding.google_maps_url}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 lg:py-5 border-2 font-black rounded-full tracking-[0.1em] uppercase text-[9px] lg:text-sm transition-all mt-3 border-gold text-gold bg-gold/10 hover:bg-gold/20"
              >
                <Navigation size={14} />
                Navigate to Location
              </motion.a>
            )}
          </div>
        )}

        <div className="flex flex-col items-center opacity-40">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent mb-3" />
          <Sparkles className="text-gold" size={20} />
        </div>

        <p className="uppercase leading-relaxed tracking-[0.3em] text-gold opacity-60 font-cinzel font-black text-[10px] lg:text-[14px] mt-2 mb-0 pb-0">
           {wedding.groom_name} & {wedding.bride_name}
        </p>

      </motion.div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Great+Vibes&family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap');
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-nunito { font-family: 'Nunito', sans-serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .text-gold { 
          color: #d4af37;
          background: linear-gradient(135deg, #ad924d 0%, #f7ef8a 50%, #ad924d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes floatDust {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: inherit; }
          90% { opacity: inherit; }
          100% { transform: translateY(-120vh) translateX(20px); opacity: 0; }
        }

        @keyframes gradient-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradient-slow 20s ease-in-out infinite;
        }
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
