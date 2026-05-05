"use client";

import Link from "next/link";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { Countdown } from "./Countdown";
import { PinkPantherBackground } from "./PinkPantherBackground";

import { Wedding } from "@/types/wedding";


interface ElegantTemplateProps {
  wedding: Wedding;
  onAttend?: () => void;
  onNotAttend?: () => void;
}



const DiamondJewel = ({ className = "", animate = true, src = "" }) => (
  <motion.div 
    animate={animate ? { scale: [1, 1.03, 1], rotate: [0, 360] } : {}}
    transition={animate ? { 
      scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: 20, repeat: Infinity, ease: "linear" } 
    } : {}}
    className={`relative w-12 h-12 flex items-center justify-center ${className}`}
    style={{ willChange: "transform" }}
  >
    {src ? (
      <img src={`${src}?v=3`} alt="icon" className="w-full h-full object-contain mix-blend-multiply" />
    ) : (
      <div className="absolute inset-0 border-[2px] border-white/40 rounded-[5px] bg-white/20 backdrop-blur-sm" />
    )}
  </motion.div>
);

export function ElegantIslamicTemplate({ wedding, onAttend, onNotAttend }: ElegantTemplateProps) {
  const date = new Date(wedding.wedding_date);
  const hasNikah = !!wedding.nikah_date;
  
  useEffect(() => {
    // Ensure scrolling is enabled
    document.body.style.overflow = "auto";
  }, []);

  // Detect if running in standalone "Web App" mode to adjust for the SystemTitleBar
  const isStandalone = typeof window !== 'undefined' && 
    (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone);

  return (
    <div className={`fixed left-0 right-0 z-40 w-full bg-[#fdfbf0] overflow-hidden flex items-center justify-center font-serif p-6 lg:py-2 lg:px-8 cream-gold-theme ${isStandalone ? 'top-8 h-[calc(100dvh-2rem)]' : 'top-0 h-[100dvh]'}`}>
      <PinkPantherBackground bgColor="#FF8DA1" />

      <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-[60px] items-center justify-center w-full max-w-6xl h-full" style={{ perspective: "1000px" }}>
        {/* 2. THE MAIN CARD CANVAS (LEFT) */}
        <motion.main 
          whileHover={{ 
            rotateY: -3, 
            rotateX: 2, 
            z: 10,
            scale: 1.01
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-[420px] lg:max-w-lg h-[712px] lg:h-[715px] flex flex-col justify-between text-center border-[1px] border-[#c5a059]/30 bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] overflow-hidden shrink-0 rounded-[5px] preserve-3d"
        >
          {/* Subtle 3D Shine Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine" />
          
          {/* Background Image Template */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/pinkpanther3d.png" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3,
                  delayChildren: 0.6
                }
              }
            }}
            initial="hidden"
            animate="show"
            className="relative z-10 w-full flex-grow flex flex-col items-center justify-start text-center mt-[100px] px-6 lg:px-10 pb-[70px] lg:pb-[10px] overflow-hidden no-scrollbar"
            style={{ willChange: "transform, opacity" }}
          >
            {/* A. BISMILLAH LINE */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="text-pink-primary font-cartoon text-[8px] lg:text-[9px] tracking-[0.05em] [word-spacing:0.1em] font-normal uppercase mt-0 mb-[12px] whitespace-nowrap in-the-name-of-allah"
            >
              {wedding.template_id === 'default' 
                ? "IN THE NAME OF GOD, THE MOST GRACIOUS, THE MOST KIND" 
                : "IN THE NAME OF ALLAH THE MOST BENEFICENT THE MOST MERCIFUL"}
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="flex flex-col items-center mb-6"
            >
              <p className="text-pink-primary font-poppins text-[clamp(8px,2.5vw,10px)] lg:text-[11px] font-extrabold uppercase tracking-[0.05em] [word-spacing:0.1em] mb-1 whitespace-nowrap overflow-hidden text-ellipsis px-4">
                {wedding.host_selection === 'bride_side' 
                  ? `${wedding.bride_father_name || ""} & ${wedding.bride_mother_name || ""}` 
                  : `${wedding.groom_father_name || ""} & ${wedding.groom_mother_name || ""}`}
              </p>
              {/* C. LOCATION (UNDER PARENTS) */}
              <p className="text-pink-muted font-poppins text-[8px] lg:text-[9px] uppercase tracking-[0.05em] [word-spacing:0.1em] font-bold mt-[-8px] whitespace-nowrap">
                {wedding.host_selection === 'bride_side' ? (wedding.bride_place || "") : (wedding.groom_place || "")}
              </p>
            </motion.div>

            {/* D. REQUEST LINE */}
              <motion.p
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              className="text-pink-primary font-poppins text-[8px] lg:text-[9px] tracking-[0.05em] [word-spacing:0.1em] font-medium uppercase mt-[-14px] mb-[10px] flex flex-col items-center gap-0 leading-none"
            >
              <span>REQUEST THE PLEASURE OF YOUR COMPANY AT THE WEDDING CEREMONY</span>
              <span>OF OUR BELOVED {wedding.host_selection === 'bride_side' ? 'DAUGHTER' : 'SON'}</span>
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}
              className="flex flex-col items-center w-full mb-[2px]"
              style={{ willChange: "transform, opacity" }}
            >
              <h1 className="w-full text-center font-cartoon text-pink-dark text-[clamp(9px,6vw,26px)] font-extrabold tracking-[0.02em] uppercase leading-tight px-6 max-w-full whitespace-nowrap groom-bride-names drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]">
                {(wedding.host_selection === 'bride_side' ? wedding.bride_name : wedding.groom_name).split(' ').map((word: string, i: number) => (
                  <span key={i} className="inline-block mx-[0.1em]">
                    <span className="text-[1.1em]">{word[0]}</span>{word.slice(1)}
                  </span>
                ))}
              </h1>
              
              <p className="text-pink-muted font-cartoon text-[11px] tracking-[0.4em] uppercase my-1 opacity-60 drop-shadow-sm">WITH</p>

              <h1 className="w-full text-center font-cartoon text-pink-dark text-[clamp(9px,6vw,26px)] font-extrabold tracking-[0.02em] uppercase leading-tight px-6 max-w-full whitespace-nowrap groom-bride-names drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]">
                {(wedding.host_selection === 'bride_side' ? wedding.groom_name : wedding.bride_name).split(' ').map((word: string, i: number) => (
                  <span key={i} className="inline-block mx-[0.1em]">
                    <span className="text-[1.1em]">{word[0]}</span>{word.slice(1)}
                  </span>
                ))}
              </h1>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="flex flex-col items-center mb-[13px]"
            >
              <p className="text-pink-primary font-poppins text-[10px] lg:text-[11px] font-extrabold uppercase tracking-[0.05em] [word-spacing:0.1em] mb-1 whitespace-nowrap">
                {wedding.host_selection === 'bride_side' 
                  ? (wedding.groom_father_name ? `S/O ${wedding.groom_father_name} & ${wedding.groom_mother_name || ""}` : "") 
                  : (wedding.bride_father_name ? `D/O ${wedding.bride_father_name} & ${wedding.bride_mother_name || ""}` : "")}
              </p>
              <p className="text-pink-muted font-poppins text-[8px] lg:text-[9px] uppercase tracking-[0.05em] [word-spacing:0.1em] font-bold mt-[-8px] whitespace-nowrap">
                {wedding.host_selection === 'bride_side' ? wedding.groom_place : wedding.bride_place}
              </p>
            </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="w-full flex flex-col items-center gap-0"
              >
               <p className={`text-pink-primary font-poppins tracking-[0.05em] [word-spacing:0.1em] font-medium uppercase ${hasNikah ? 'text-[11px] lg:text-[12px]' : 'text-[13px] lg:text-[14px]'}`}>
                 {wedding.template_id === 'default' ? "BY THE GRACE OF GOD" : "IN SHAA ALLAH"}
               </p>
              
              <div className="flex flex-col items-center">
                <p className={`text-pink-primary font-poppins font-bold uppercase tracking-[0.05em] [word-spacing:0.1em] mb-0 mt-[-3px] ${hasNikah ? 'text-[11px] lg:text-[12px]' : 'text-[13px] lg:text-[14px]'}`}>
                  {format(date, "EEEE, MMMM do")} AT {format(date, "h:mm a")}
                </p>
                
                <div className="mt-1 flex flex-col items-center gap-1">
                   <p className={`text-pink-primary font-cinzel font-normal uppercase tracking-[0.1em] mb-1 ${hasNikah ? 'text-[11px] lg:text-[12px]' : 'text-[13px] lg:text-[14px]'}`}>
                     {wedding.venue_name.split(' ').map((word: string, i: number) => (
                       <span key={i} className="inline-block mx-[0.1em]">
                         <span className="text-[1.1em]">{word[0]}</span>{word.slice(1)}
                       </span>
                     ))}
                   </p>
                  {wedding.venue_address && (
                     <p className={`text-pink-primary font-cinzel uppercase tracking-[0.08em] font-normal leading-relaxed max-w-[320px] ${hasNikah ? 'text-[9px] lg:text-[10px]' : 'text-[11px] lg:text-[12px]'}`}>
                       {wedding.venue_address.split(' ').map((word: string, i: number) => (
                         <span key={i} className="inline-block mx-[0.1em]">
                           <span className="text-[1.1em]">{word[0]}</span>{word.slice(1)}
                         </span>
                       ))}
                     </p>
                  )}
                </div>

                <div className={`${wedding.template_id === 'default' ? 'mt-[-5px]' : 'mt-[7px] lg:mt-[20px]'} flex flex-col items-center w-full`}>
                  {hasNikah ? (
                    <div className="flex flex-col items-center w-full px-4">
                      {wedding.template_id === 'default' && (
                        <div className="w-full flex flex-col items-center py-[10px] gap-1">
                           <div className="flex items-center gap-4 w-full px-8">
                              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-pink-primary/30 to-pink-primary/50" />
                              <motion.img 
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.8 }}
                                src="/pinkpantherlogo.png" 
                                alt="logo" 
                                className="w-16 h-16 object-contain" 
                              />
                              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-pink-primary/30 to-pink-primary/50" />
                           </div>
                           <div className="font-cartoon text-pink-muted text-[10px] tracking-[0.5em] uppercase opacity-50 mt-1">
                              Pink Celebration
                           </div>
                        </div>
                      )}
                      {/* Line 1: Nikah Ceremony Label */}
                      <p className="text-pink-primary font-cinzel text-[13px] lg:text-[15px] font-black uppercase tracking-[0.2em] mb-1">
                        {wedding.template_id === 'default' ? "Wedding Ceremony" : "Nikah Ceremony"}
                      </p>
                      
                      {/* Line 2: Date, Time & Islamic Date */}
                      <p className="text-pink-primary font-poppins text-[11px] lg:text-[12px] font-bold uppercase tracking-widest leading-tight mb-0.5">
                        {wedding.nikah_date ? format(new Date(wedding.nikah_date), "EEEE, MMMM do") : ""} • {wedding.nikah_time ? format(new Date(`2000-01-01T${wedding.nikah_time as string}`), "h:mm a") : ""}
                      </p>
                      {wedding.template_id !== 'default' && (
                        <p className="text-pink-muted font-poppins text-[10px] lg:text-[11px] font-medium uppercase tracking-[0.15em] mb-1.5">
                          {wedding.nikah_islamic_date}
                        </p>
                      )}
                      
                      {/* Line 3: Location */}
                      <p className="text-pink-primary font-cinzel text-[11px] lg:text-[12px] font-bold uppercase tracking-wider line-clamp-1">
                        {wedding.nikah_location}
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Decorative Divider */}
                      <div className="flex items-center gap-4 mb-4 opacity-40">
                        <div className="h-px w-8 bg-pink-muted" />
                        <div className="w-1.5 h-1.5 rotate-45 bg-pink-muted" />
                        <div className="h-px w-8 bg-pink-muted" />
                      </div>

                      <p className="text-pink-primary font-cinzel text-[11px] lg:text-[12px] uppercase tracking-widest mb-1">
                        With Best Compliments From:
                      </p>
                      <p className="text-pink-primary font-cinzel text-[13px] lg:text-[14px] font-bold uppercase tracking-widest friends-family">
                        Family & Friends
                      </p>
                    </>
                  )}
                </div>


              </div>
            </motion.div>
          </motion.div>
          
        </motion.main>

        {/* 6. DIVIDER */}
        <div className="hidden lg:flex flex-col items-center justify-center h-[60vh] opacity-40">
          <DiamondJewel animate={true} className="w-16 h-16" src="/pink_panther_paw.png" />
        </div>

        {/* 5. SECONDARY BLOCK (RIGHT) */}
        <motion.aside 
          whileHover={{ 
            rotateY: 3, 
            rotateX: 2, 
            z: 10,
            scale: 1.01
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-[420px] lg:max-w-lg h-fit lg:h-[715px] flex flex-col items-center justify-between p-0 lg:py-[20px] lg:px-10 text-center bg-[#FF8DA1] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] overflow-visible gap-5 lg:gap-0 border-[1px] border-white/30 rounded-[5px] preserve-3d">
          
          {/* Countdown */}
          <div className="w-full p-8 lg:p-0 border-[1px] lg:border-none border-white/20 rounded-[5px] lg:rounded-none bg-[#FF8DA1] lg:bg-transparent shadow-xl lg:shadow-none">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="w-full"
            >
              <p className="text-white/80 font-cartoon text-[11px] lg:text-[10px] font-black tracking-[0.4em] uppercase mb-8">Countdown to Celebration</p>
              <Countdown 
                targetDate={wedding.wedding_date} 
                numberClassName="font-cartoon font-medium text-white tracking-[0.1em]"
                labelClassName="font-cartoon text-white/70 font-medium"
                separatorClassName="text-white/40"
              />
            </motion.div>
          </div>

          <div className="hidden lg:flex flex-col items-center my-4">
            <DiamondJewel animate={false} src="/pink_panther_icon.png" className="w-[90px] h-[90px]" />
          </div>

          {/* RSVP */}
          <div className="w-full p-8 lg:p-0 border-[1px] lg:border-none border-white/20 rounded-[5px] lg:rounded-none bg-[#FF8DA1] lg:bg-transparent shadow-xl lg:shadow-none">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white font-cartoon text-2xl font-normal mb-8 tracking-wide"
            >
              Will you attend?
            </motion.h3>

            <div className="flex flex-col gap-3 w-full px-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95, y: 0 }}
                onClick={onAttend}
                className="w-full py-4 bg-white text-pink-primary font-cartoon font-bold rounded-[5px] tracking-widest uppercase text-[10px] lg:text-xs transition-all shadow-[0_10px_0_rgb(233,30,99,0.2),0_15px_20px_rgba(0,0,0,0.1)] active:shadow-none border-b-4 border-pink-muted"
              >
                {wedding.template_id === 'default' ? "Happy to attend" : "Insha'Allah will attend"}
              </motion.button>
 
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95, y: 0 }}
                onClick={onNotAttend}
                className="w-full py-4 border-2 border-white text-white font-cartoon font-bold rounded-[5px] tracking-widest uppercase text-[10px] lg:text-xs hover:bg-white/10 transition-all shadow-lg"
              >
                No, we can&apos;t
              </motion.button>
            </div>
          </div>
        </motion.aside>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Fredoka:wght@400;600;700&display=swap');
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-cartoon { font-family: 'Fredoka', sans-serif; }
        .text-pink-primary { color: #E91E63; }
        .text-pink-muted { color: #F06292; }
        .text-pink-dark { color: #AD1457; }
        .bg-pink-muted { background-color: #F06292; }
        .bg-gold { background-color: #E91E63; }
        .bg-gold-muted { background-color: #E91E63; }

        @media (max-width: 768px) {
          .cream-gold-theme .in-the-name-of-allah {
            margin-top: 36px !important;
          }

          .cream-gold-theme .friends-family {
            margin-bottom: 0px !important;
          }

          .cream-gold-theme .groom-bride-names {
            display: block !important;
            width: 100% !important;
            max-width: 90% !important;
            margin: 0 auto !important;
            text-align: center !important;
            white-space: normal !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
            line-height: 1.1 !important;
            font-size: clamp(8px, 5.5vw, 22px) !important;
          }

          @keyframes silk-blob-1 {
            0%, 100% { transform: translate(0, 0); }
            33% { transform: translate(100px, 50px); }
            66% { transform: translate(-50px, 100px); }
          }
          @keyframes silk-blob-2 {
            0%, 100% { transform: translate(0, 0); }
            33% { transform: translate(-80px, -60px); }
            66% { transform: translate(60px, -40px); }
          }
          @keyframes silk-blob-3 {
            0%, 100% { transform: translate(0, 0); }
            33% { transform: translate(40px, -80px); }
            66% { transform: translate(-100px, -50px); }
          }
          @keyframes silk-sheen {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes jewel-shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-silk-blob-1 { animation: silk-blob-1 15s infinite ease-in-out; }
          .animate-silk-blob-2 { animation: silk-blob-2 18s infinite ease-in-out; }
          .animate-silk-blob-3 { animation: silk-blob-3 20s infinite ease-in-out; }
          .animate-silk-sheen { animation: silk-sheen 10s infinite linear; }
          .animate-jewel-shimmer { animation: jewel-shimmer 3s infinite linear; }
          .preserve-3d { transform-style: preserve-3d; }
          @keyframes shine {
            0% { transform: translateX(-100%) skewX(-15deg); }
            100% { transform: translateX(200%) skewX(-15deg); }
          }
          .animate-shine { animation: shine 1.5s ease-out; }
        }
      `}</style>
    </div>
  );
}

export default ElegantIslamicTemplate;
