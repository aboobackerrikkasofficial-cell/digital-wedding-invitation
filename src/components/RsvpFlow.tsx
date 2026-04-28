"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowLeft, Send, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./Toast";
import { CreamGoldBackground } from "./CreamGoldBackground";

interface Wedding {
  id: string;
  template_id: string;
  [key: string]: unknown;
}

interface RsvpData {
  name: string;
  guestCount: number;
}

interface RsvpFlowProps {
  wedding: Wedding;
  onComplete: (data: RsvpData) => void;
  onBack: () => void;
}

const liquidEase = [0.16, 1, 0.3, 1];

export function RsvpFlow({ wedding, onComplete, onBack }: RsvpFlowProps) {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRoyal = wedding.template_id === 'royal';
  const isCreamGold = wedding.template_id === 'muslim-3' || wedding.template_id === 'muslim-1' || wedding.template_id === 'muslim-2' || wedding.template_id === 'default';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const finalName = name.trim() || "Honored Guest";
      const { error } = await supabase
        .from("rsvps")
        .insert({
          wedding_id: wedding.id,
          name: finalName,
          guest_count: guestCount,
          is_attending: true
        });
        
      if (error) throw error;
      
      onComplete({ name: finalName, guestCount });
    } catch (err) {
      const error = err as Error;
      console.error("Error submitting RSVP:", error);
      if ("vibrate" in navigator) navigator.vibrate(200);
      showToast("Failed to submit RSVP. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-[100dvh] flex items-center justify-center p-4 md:p-6 overflow-hidden relative ${
      isRoyal ? 'bg-[#2b1e3f]' : isCreamGold ? 'bg-[#FF99CC]' : 'bg-[#fdfbf0]'
    }`}>
      <div className="absolute inset-0 z-0">
          {isRoyal ? (
             <>
               <div className="absolute inset-0 bg-gradient-to-b from-[#251a36] via-[#2b1e3f] to-[#3a2455]" />
               <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                    style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
                    }} 
               />
             </>
          ) : isCreamGold ? (
            <CreamGoldBackground />
          ) : (
             <>
               <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-white to-gold/10" />
               <motion.div 
                 animate={{ 
                     scale: [1, 1.2, 1],
                     rotate: [0, 5, 0]
                 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -mr-32 -mt-32" 
               />
             </>
          )}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: liquidEase }}
        className={`relative z-10 w-full max-w-xl rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[3.5rem] p-5 md:p-10 shadow-2xl flex flex-col relative border ${
          isRoyal 
            ? 'bg-white/5 backdrop-blur-sm border-gold/10 shadow-gold/5' 
            : isCreamGold
              ? 'bg-white border-gold/20 shadow-[0_20px_50px_rgba(197,160,89,0.15)]'
              : 'bg-white/70 backdrop-blur-3xl border-white'
        }`}
      >
        <motion.button 
          whileHover={{ x: -5 }}
          onClick={onBack}
          className={`inline-flex items-center mb-4 md:mb-6 lg:mb-8 transition-colors font-bold text-[10px] uppercase tracking-widest group ${
            isRoyal ? 'text-white/40 hover:text-gold' : isCreamGold ? 'text-gray-400 hover:text-gold' : 'text-gray-400 hover:text-gold'
          }`}
        >
          <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Invitation
        </motion.button>

        <div className="mb-4 md:mb-6 lg:mb-10 text-center">
            <h2 className={`text-xl md:text-2xl lg:text-4xl font-bold mb-0.5 ${isRoyal ? 'text-gold font-serif' : isCreamGold ? 'text-gray-900 font-poppins' : 'text-gray-900 font-serif'}`}>RSVP Details</h2>
            <p className={`text-sm lg:text-lg tracking-tight ${
              isRoyal ? 'text-white/60 font-serif italic' : 
              isCreamGold ? 'text-gray-500 font-poppins' : 
              'text-gray-500 font-serif italic'
            }`}>Confirm your presence with us.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 lg:space-y-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, ease: liquidEase }}
            className="space-y-2"
          >
            <label className={`block text-[8px] font-bold text-gold uppercase tracking-[0.2em] ml-1 ${isCreamGold ? 'font-poppins' : ''}`}>
              Your Name (Optional)
            </label>
            <div className="relative group">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mitchell Ross"
                    className={`w-full px-4 lg:px-5 py-3 lg:py-5 rounded-xl lg:rounded-3xl border outline-none transition-all text-base lg:text-xl placeholder:text-opacity-20 shadow-sm focus:shadow-xl ${
                      isRoyal 
                        ? 'bg-white/5 border-white/10 text-white focus:border-gold placeholder:text-white/20' 
                        : isCreamGold
                          ? 'bg-[#FF99CC]/50 border-gold/10 text-gray-900 focus:border-gold placeholder:text-gray-300'
                          : 'bg-white border-gray-100 text-gray-900 focus:border-gold placeholder:text-gray-200'
                    }`}
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                    <Sparkles className="text-gold" size={20} />
                </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, ease: liquidEase }}
            className="space-y-2 md:space-y-4"
          >
            <label className={`block text-[8px] font-bold text-gold uppercase tracking-[0.2em] ml-1 ${isCreamGold ? 'font-poppins' : ''}`}>
              How many guests will attend?
            </label>
            <div className={`flex items-center justify-between rounded-xl lg:rounded-[2.5rem] p-1.5 lg:p-3 border shadow-sm ${
              isRoyal ? 'bg-white/5 border-white/10' : isCreamGold ? 'bg-[#FF99CC]/50 border-gold/10' : 'bg-white border-gray-100'
            }`}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.8 }}
                onClick={() => {
                    setGuestCount(Math.max(1, guestCount - 1));
                    if ("vibrate" in navigator) navigator.vibrate(50);
                }}
                className={`w-10 h-10 lg:w-16 lg:h-16 flex items-center justify-center rounded-lg lg:rounded-2xl transition-all ${
                  isRoyal 
                    ? 'bg-white/10 text-white/40 hover:text-red-400 hover:bg-red-400/10' 
                    : isCreamGold
                      ? 'bg-white text-gray-400 hover:text-red-500 hover:bg-red-50'
                      : 'bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Minus size={20} />
              </motion.button>
              
              <div className="flex flex-col items-center px-4">
                <AnimatePresence mode="wait">
                    <motion.span 
                        key={guestCount}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`text-2xl lg:text-5xl font-bold ${
                          isRoyal ? 'text-white font-serif' : 
                          isCreamGold ? 'text-gray-900 font-poppins' : 
                          'text-gray-900 font-serif'
                        }`}
                    >
                        {guestCount}
                    </motion.span>
                </AnimatePresence>
                <span className={`text-[8px] font-bold uppercase tracking-widest mt-0.5 ${
                  isRoyal ? 'text-gold font-serif' : 
                  isCreamGold ? 'text-gray-400 font-poppins' : 
                  'text-gray-400'
                }`}>Guests</span>
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.8 }}
                onClick={() => {
                    setGuestCount(guestCount + 1);
                    if ("vibrate" in navigator) navigator.vibrate(50);
                }}
                className={`w-10 h-10 lg:w-16 lg:h-16 flex items-center justify-center rounded-lg lg:rounded-2xl transition-all ${
                  isRoyal 
                    ? 'bg-white/10 text-white/40 hover:text-gold hover:bg-gold/10' 
                    : isCreamGold
                      ? 'bg-white text-gray-400 hover:text-gold hover:bg-gold/5'
                      : 'bg-gray-50 text-gray-400 hover:text-green-500 hover:bg-green-50'
                }`}
              >
                <Plus size={20} />
              </motion.button>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gold text-white font-bold py-4 lg:py-7 rounded-xl lg:rounded-[2.5rem] shadow-2xl shadow-gold/20 hover:bg-gold/90 transition-all flex items-center justify-center gap-3 text-base lg:text-xl relative overflow-hidden group ${
              isCreamGold ? 'font-poppins' : ''
            }`}
          >
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
            ) : (
              <>
                Confirm Reservation
                <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
}
