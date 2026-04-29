"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { MapPin, Calendar, Heart, Sparkles, Navigation } from "lucide-react";
import { format } from "date-fns";
import { CreamGoldBackground } from "./CreamGoldBackground";

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

import { Wedding } from "@/types/wedding";


interface RsvpData {
  is_attending: boolean;
  name?: string;
  [key: string]: unknown;
}

interface ThankYouPageProps {
  wedding: Wedding;
  rsvpData: RsvpData;
}

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

export function ThankYouPage({ wedding, rsvpData }: ThankYouPageProps) {
  const isRoyal = wedding.template_id === 'royal' || wedding.template_id === 'muslim-royal';
  const isPinkTheme = wedding.template_id === 'muslim-1' || wedding.template_id === 'muslim-2' || wedding.template_id === 'default';
  const isCreamGold = wedding.template_id === 'muslim-3';
  const isAnyGold = isPinkTheme || isCreamGold;
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

  return (
    <div className={`relative h-[calc(100dvh-32px)] w-full overflow-hidden flex items-center justify-center font-serif p-4 md:p-10 ${
      isRoyal ? 'bg-[#2b1e3f]' : isPinkTheme ? 'bg-[#FF8DA1]' : isCreamGold ? 'bg-[#fffcf2]' : 'bg-[#fdfbf0]'
    }`}>
      {isRoyal ? <GoldDustBackground particles={particles} /> : isAnyGold ? (
        <CreamGoldBackground bgColor={isPinkTheme ? "#FF8DA1" : "#fffcf2"} />
      ) : null}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className={`relative z-10 w-full max-w-2xl h-fit max-h-[80dvh] flex flex-col items-center justify-center p-8 lg:p-16 text-center border-2 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden ${
          isRoyal 
            ? 'bg-white/5 backdrop-blur-md border-gold/25 shadow-[12px_12px_30px_rgba(212,175,55,0.12)]' 
            : isAnyGold
              ? 'bg-white border-gold/20 shadow-[0_20px_50px_rgba(197,160,89,0.1)]'
              : 'bg-white/70 backdrop-blur-md border-white shadow-xl'
        }`}
      >
        {/* Animated Heart Icon */}
        {!isAnyGold && (
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className={`text-gold mb-2 lg:mb-10`}
          >
            <Heart size={36} className={`lg:w-[60px] lg:h-[60px] fill-gold drop-shadow-[0_0_15px_rgba(158,126,69,0.3)]`} />
          </motion.div>
        )}

        {/* Message Header */}
        <h1 className={`text-xl lg:text-5xl mb-1 lg:mb-6 tracking-wider px-2 ${
          isAnyGold ? 'text-gray-900 mt-[10px] font-poppins font-normal' : 'text-white font-cinzel'
        }`}>
          <span className={`block text-[clamp(1rem,5vw,2.375rem)] mb-0.5 lg:mb-2 text-wrap-balance leading-[1.3] py-0.5 ${
            isAnyGold ? 'text-[#9E7E45] font-poppins' : 'text-gold font-script'
          }`}>
            {isAttending ? "Alhamdulillah!" : "Thank You"}
          </span>
          {isAttending ? "Successful" : "Message Received"}
        </h1>

        <p className={`text-[clamp(11px,3vw,16px)] lg:text-xl mb-3 lg:mb-8 px-4 leading-relaxed max-w-lg mx-auto break-words ${
          isAnyGold ? 'text-gray-700 font-poppins' : 'text-white/80 font-cinzel italic'
        }`}>
          {isAttending 
            ? `We are honored to have you join us for our celebration, ${rsvpData?.name || "Guest"}.`
            : "Thank you for the update. Although we will miss you, your well-wishes mean a lot to us."
          }
        </p>

        {isAnyGold && (
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
        )}

        {isAttending && (
          <div className="w-full space-y-3 lg:space-y-6 mb-2 lg:mb-4">
            {/* Logistic Detail Rows */}
            <div className={`flex flex-col items-center gap-0.5 ${isAnyGold ? 'mt-[10px]' : ''}`}>
              <div className={`flex items-center gap-2 uppercase tracking-[0.2em] text-[8px] lg:text-[12px] font-bold ${
                isAnyGold ? 'text-[#735B32] opacity-100 font-poppins' : 'text-gold opacity-60'
              }`}>
                <Calendar size={10} />
                <span>Save The Date</span>
              </div>
              <p className={`${isRoyal ? 'text-white' : 'text-gray-900'} text-[13px] lg:text-2xl break-words px-4 ${
                isAnyGold ? 'font-poppins font-medium' : 'font-cinzel font-bold'
              }`}>
                {format(date, "EEEE, d MMMM yyyy")}
              </p>
            </div>
 
            <div className="flex flex-col items-center gap-0.5 mt-1">
              <div className={`flex items-center gap-2 uppercase tracking-[0.2em] text-[8px] lg:text-[12px] font-bold ${
                isAnyGold ? 'text-[#735B32] opacity-100 font-poppins' : 'text-gold opacity-60'
              }`}>
                <MapPin size={10} />
                <span>The Venue</span>
              </div>
              <p className={`${isRoyal ? 'text-white' : 'text-gray-900'} text-[13px] lg:text-2xl leading-tight break-words px-8 max-w-[320px] lg:max-w-md mx-auto ${
                isAnyGold ? 'font-poppins font-medium' : 'font-cinzel font-bold'
              }`}>
                {wedding.venue_name}
              </p>
            </div>

            {wedding.google_maps_url && (
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={wedding.google_maps_url}
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-2.5 lg:py-5 border-2 font-black rounded-full tracking-[0.1em] uppercase text-[9px] lg:text-sm transition-all mt-3 ${
                  isAnyGold 
                    ? 'border-[#9E7E45] text-[#9E7E45] bg-[#9E7E45]/5 hover:bg-[#9E7E45]/10 font-poppins' 
                    : 'border-gold text-gold bg-gold/10 hover:bg-gold/20'
                }`}
              >
                <Navigation size={14} />
                Navigate to Location
              </motion.a>
            )}
          </div>
        )}

        <div className="flex flex-col items-center opacity-40">
           {isAnyGold ? (
             <div className="flex items-center gap-2">
               <div className="w-1 h-1 rounded-full bg-[#9E7E45] opacity-40" />
               <div className="w-1.5 h-1.5 rounded-full bg-[#9E7E45] opacity-60" />
               <div className="w-1 h-1 rounded-full bg-[#9E7E45] opacity-40" />
             </div>
           ) : (
             <>
               <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent mb-3" />
               <Sparkles className="text-gold" size={20} />
             </>
           )}
        </div>

        <p className={`uppercase leading-relaxed ${
          isAnyGold 
            ? 'text-[#735B32] opacity-100 font-poppins font-bold text-[8px] lg:text-[12px] mt-[20px] mb-0 pb-0 whitespace-nowrap tracking-[0.1em] px-4' 
            : 'tracking-[0.3em] text-gold opacity-60 font-cinzel font-black text-[10px] lg:text-[14px] mt-2 mb-0 pb-0'
        }`}>
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
