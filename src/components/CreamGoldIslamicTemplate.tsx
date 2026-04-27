"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Sparkles, Clock, MapPin } from "lucide-react";
import { Countdown } from "./Countdown";
import { CreamGoldBackground } from "./CreamGoldBackground";

interface TemplateProps {
  wedding: any;
  onAttend?: () => void;
  onNotAttend?: () => void;
}

const BackgroundDecor = () => (
  <CreamGoldBackground />
);

const DiamondJewel = ({ className = "", animate = true }) => (
  <motion.div 
    animate={animate ? { scale: [1, 1.03, 1], rotate: [45, 405] } : { rotate: 45 }}
    transition={animate ? { 
      scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: 15, repeat: Infinity, ease: "linear" } 
    } : {}}
    className={`relative w-5 h-5 flex items-center justify-center ${className}`}
    style={{ willChange: "transform" }}
  >
    <div className="absolute inset-0 border-[2px] border-transparent rounded-[2px] [border-image:linear-gradient(135deg,#735B32,#9E7E45)_1] overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full ${animate ? 'animate-jewel-shimmer' : ''}`} />
    </div>
  </motion.div>
);

export function CreamGoldIslamicTemplate({ wedding, onAttend, onNotAttend }: TemplateProps) {
  const date = new Date(wedding.wedding_date);
  const hasNikah = !!wedding.nikah_date;

  return (
    <div className="relative min-h-[100dvh] lg:h-[100dvh] w-full bg-[#fffcf2] overflow-y-auto lg:overflow-hidden flex items-center justify-center font-serif p-2 md:p-6 lg:p-10 cream-gold-theme">
      <BackgroundDecor />

      <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-[60px] items-center justify-center w-full max-w-6xl h-full">
        {/* 2. THE MAIN CARD CANVAS (LEFT) */}
        <main className="relative w-full max-w-[420px] lg:max-w-lg h-[95svh] lg:h-[calc(89dvh+25px)] max-h-[850px] flex flex-col justify-between text-center border-[1px] border-[#c5a059]/30 rounded-[1.8rem] lg:rounded-[2.2rem] bg-white shadow-[0_20px_40px_rgba(197,160,89,0.1)] overflow-hidden">
          
          {/* Background Image Template */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/invitationletter.jpg" 
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
            className="relative z-10 w-full flex-grow flex flex-col items-center justify-start text-center mt-[200px] lg:mt-[230px] px-6 lg:px-10 pb-[70px] overflow-hidden no-scrollbar"
            style={{ willChange: "transform, opacity" }}
          >
            {/* A. BISMILLAH LINE */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="text-gold-primary font-poppins text-[8px] lg:text-[9px] tracking-[0.05em] [word-spacing:0.1em] font-normal uppercase mt-[30px] lg:mt-[27px] mb-[12px] whitespace-nowrap in-the-name-of-allah"
            >
              IN THE NAME OF ALLAH THE MOST BENEFICENT THE MOST MERCIFUL
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="flex flex-col items-center mb-6"
            >
              <p className="text-gold-primary font-poppins text-[clamp(8px,2.5vw,10px)] lg:text-[11px] font-extrabold uppercase tracking-[0.05em] [word-spacing:0.1em] mb-1 whitespace-nowrap overflow-hidden text-ellipsis px-4">
                {wedding.host_selection === 'bride_side' 
                  ? `${wedding.bride_father_name} & ${wedding.bride_mother_name}` 
                  : `${wedding.groom_father_name} & ${wedding.groom_mother_name}`}
              </p>
              {/* C. LOCATION (UNDER PARENTS) */}
              <p className="text-gold-muted font-poppins text-[8px] lg:text-[9px] uppercase tracking-[0.05em] [word-spacing:0.1em] font-bold mt-[-8px] whitespace-nowrap">
                {wedding.host_selection === 'bride_side' ? wedding.bride_place : wedding.groom_place}
              </p>
            </motion.div>

            {/* D. REQUEST LINE */}
            <motion.p
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              className="text-gold-primary font-poppins text-[8px] lg:text-[9px] tracking-[0.05em] [word-spacing:0.1em] font-medium uppercase mt-[-14px] mb-[10px] flex flex-col items-center gap-0 leading-none"
            >
              <span>REQUEST THE PLEASURE OF YOUR COMPANY AT THE WEDDING CEREMONY</span>
              <span>OF OUR BELOVED {wedding.host_selection === 'bride_side' ? 'DAUGHTER' : 'SON'}</span>
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}
              className="flex flex-col items-center w-full mb-[2px]"
              style={{ willChange: "transform, opacity" }}
            >
              <h1 className="w-full text-center font-cinzel text-gold-dark text-[clamp(9px,6vw,23px)] font-extrabold tracking-[0.02em] uppercase leading-tight px-6 max-w-full whitespace-nowrap groom-bride-names">
                {(wedding.host_selection === 'bride_side' ? wedding.bride_name : wedding.groom_name).split(' ').map((word: string, i: number) => (
                  <span key={i} className="inline-block mx-[0.1em]">
                    <span className="text-[1.1em]">{word[0]}</span>{word.slice(1)}
                  </span>
                ))}
              </h1>
              
              <p className="text-gold-muted font-serif text-[11px] tracking-[0.4em] uppercase my-1">WITH</p>

              <h1 className="w-full text-center font-cinzel text-gold-dark text-[clamp(9px,6vw,23px)] font-extrabold tracking-[0.02em] uppercase leading-tight px-6 max-w-full whitespace-nowrap groom-bride-names">
                {(wedding.host_selection === 'bride_side' ? wedding.groom_name : wedding.bride_name).split(' ').map((word: string, i: number) => (
                  <span key={i} className="inline-block mx-[0.1em]">
                    <span className="text-[1.1em]">{word[0]}</span>{word.slice(1)}
                  </span>
                ))}
              </h1>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="flex flex-col items-center mb-5"
            >
              <p className="text-gold-primary font-poppins text-[10px] lg:text-[11px] font-extrabold uppercase tracking-[0.05em] [word-spacing:0.1em] mb-1 whitespace-nowrap">
                {wedding.host_selection === 'bride_side' 
                  ? `S/O ${wedding.groom_father_name} & ${wedding.groom_mother_name}` 
                  : `D/O ${wedding.bride_father_name} & ${wedding.bride_mother_name}`}
              </p>
              <p className="text-gold-muted font-poppins text-[8px] lg:text-[9px] uppercase tracking-[0.05em] [word-spacing:0.1em] font-bold mt-[-8px] whitespace-nowrap">
                {wedding.host_selection === 'bride_side' ? wedding.groom_place : wedding.bride_place}
              </p>
            </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="w-full flex flex-col items-center gap-0"
              >
              <p className={`text-gold-primary font-poppins tracking-[0.05em] [word-spacing:0.1em] font-medium uppercase ${hasNikah ? 'text-[11px] lg:text-[12px]' : 'text-[13px] lg:text-[14px]'}`}>IN SHAA ALLAH</p>
              
              <div className="flex flex-col items-center">
                <p className={`text-gold-primary font-poppins font-bold uppercase tracking-[0.05em] [word-spacing:0.1em] mb-0 mt-[-3px] ${hasNikah ? 'text-[11px] lg:text-[12px]' : 'text-[13px] lg:text-[14px]'}`}>
                  {format(date, "EEEE, MMMM do")} AT {format(date, "h:mm a")}
                </p>
                
                <div className="mt-1 flex flex-col items-center gap-1">
                   <p className={`text-gold-primary font-cinzel font-normal uppercase tracking-[0.1em] mb-1 ${hasNikah ? 'text-[11px] lg:text-[12px]' : 'text-[13px] lg:text-[14px]'}`}>
                     {wedding.venue_name.split(' ').map((word: string, i: number) => (
                       <span key={i} className="inline-block mx-[0.1em]">
                         <span className="text-[1.1em]">{word[0]}</span>{word.slice(1)}
                       </span>
                     ))}
                   </p>
                  {wedding.venue_address && (
                     <p className={`text-gold-primary font-cinzel uppercase tracking-[0.08em] font-normal leading-relaxed max-w-[320px] ${hasNikah ? 'text-[9px] lg:text-[10px]' : 'text-[11px] lg:text-[12px]'}`}>
                       {wedding.venue_address.split(' ').map((word: string, i: number) => (
                         <span key={i} className="inline-block mx-[0.1em]">
                           <span className="text-[1.1em]">{word[0]}</span>{word.slice(1)}
                         </span>
                       ))}
                     </p>
                  )}
                </div>

                <div className="mt-[30px] md:mt-[50px] flex flex-col items-center w-full">
                  {hasNikah ? (
                    <div className="flex flex-col items-center w-full px-4">
                      {/* Line 1: Nikah Ceremony Label */}
                      <p className="text-gold-primary font-cinzel text-[13px] lg:text-[15px] font-black uppercase tracking-[0.2em] mb-1">
                        Nikah Ceremony
                      </p>
                      
                      {/* Line 2: Date, Time & Islamic Date */}
                      <p className="text-gold-primary font-poppins text-[11px] lg:text-[12px] font-bold uppercase tracking-widest leading-tight mb-0.5">
                        {format(new Date(wedding.nikah_date), "EEEE, MMMM do")} • {wedding.nikah_time ? format(new Date(`2000-01-01T${wedding.nikah_time}`), "h:mm a") : ""}
                      </p>
                      <p className="text-gold-muted font-poppins text-[10px] lg:text-[11px] font-medium uppercase tracking-[0.15em] mb-1.5">
                        {wedding.nikah_islamic_date}
                      </p>
                      
                      {/* Line 3: Location */}
                      <p className="text-gold-primary font-cinzel text-[11px] lg:text-[12px] font-bold uppercase tracking-wider line-clamp-1">
                        {wedding.nikah_location}
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Decorative Divider */}
                      <div className="flex items-center gap-4 mb-4 opacity-40">
                        <div className="h-px w-8 bg-gold-muted" />
                        <div className="w-1.5 h-1.5 rotate-45 bg-gold-muted" />
                        <div className="h-px w-8 bg-gold-muted" />
                      </div>

                      <p className="text-gold-primary font-cinzel text-[11px] lg:text-[12px] uppercase tracking-widest mb-1">
                        With Best Compliments From:
                      </p>
                      <p className="text-gold-primary font-cinzel text-[13px] lg:text-[14px] font-bold uppercase tracking-widest friends-family">
                        Family & Friends
                      </p>
                    </>
                  )}
                </div>


              </div>
            </motion.div>
          </motion.div>
        </main>

        {/* 6. DIVIDER */}
        <div className="hidden lg:flex flex-col items-center justify-center h-[60vh] opacity-20">
          <div className="w-px h-full bg-gold" />
          <DiamondJewel animate={true} className="my-8" />
          <div className="w-px h-full bg-gold" />
        </div>

        {/* 5. SECONDARY BLOCK (RIGHT) */}
        <aside className="relative w-full max-w-[420px] lg:max-w-lg h-fit lg:h-[calc(89dvh+25px)] max-h-[850px] flex flex-col items-center justify-between p-0 lg:p-10 text-center rounded-none lg:rounded-[2.2rem] bg-transparent lg:bg-white lg:shadow-[0_20px_50px_rgba(197,160,89,0.1)] overflow-visible gap-5 lg:gap-0 border-none lg:border-[1px] border-[#c5a059]/20">
          
          {/* Countdown */}
          <div className="w-full p-8 lg:p-0 border-[1px] lg:border-none border-gold-muted/30 rounded-[1.8rem] lg:rounded-none bg-white lg:bg-transparent shadow-xl lg:shadow-none">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="w-full"
            >
              <p className="text-gold-muted font-serif text-[11px] lg:text-[10px] font-black tracking-[0.4em] uppercase mb-8">Countdown to Celebration</p>
              <Countdown 
                targetDate={wedding.wedding_date} 
                numberClassName="font-poppins font-medium text-gold-dark tracking-[0.1em]"
                labelClassName="font-poppins text-gold-muted font-medium"
                separatorClassName="text-gold-muted/40"
              />
            </motion.div>
          </div>

          <div className="hidden lg:flex flex-col items-center my-8">
            <div className="h-px w-24 bg-gold/20 mb-4" />
            <DiamondJewel animate={false} />
            <div className="h-px w-24 bg-gold/20 mt-4" />
          </div>

          {/* RSVP */}
          <div className="w-full p-8 lg:p-0 border-[1px] lg:border-none border-[#c5a059]/20 rounded-[1.8rem] lg:rounded-none bg-white lg:bg-transparent shadow-xl lg:shadow-none">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-gray-900 font-poppins text-2xl font-normal mb-8 tracking-wide"
            >
              Will you attend?
            </motion.h3>

            <div className="flex flex-col gap-3 w-full px-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onAttend}
                className="w-full py-4 bg-gold-muted text-white font-poppins font-semibold rounded-xl tracking-widest uppercase text-[10px] lg:text-xs transition-shadow shadow-lg shadow-gold-muted/20 hover:shadow-gold-muted/40"
              >
                Insha'Allah will attend
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNotAttend}
                className="w-full py-4 border border-gold-muted/30 text-gold-muted font-poppins font-semibold rounded-xl tracking-widest uppercase text-[10px] lg:text-xs hover:bg-gold-muted/5 transition-colors"
              >
                No, we can't
              </motion.button>
            </div>
          </div>
        </aside>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@400;700&family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800;900&display=swap');
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .text-gold-primary { color: #9E7E45; }
        .text-gold-muted { color: #C5A059; }
        .text-gold-dark { color: #735B32; }
        .bg-gold-muted { background-color: #C5A059; }

        @media (max-width: 768px) {
          .cream-gold-theme .in-the-name-of-allah {
            margin-top: 75px !important;
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
        }
      `}</style>
    </div>
  );
}

export default CreamGoldIslamicTemplate;
