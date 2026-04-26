"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDate: string;
  numberClassName?: string;
  labelClassName?: string;
  separatorClassName?: string;
}

export function Countdown({ targetDate, numberClassName, labelClassName, separatorClassName }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center min-w-[60px] md:min-w-[80px]">
      <motion.div 
        key={value}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`text-2xl md:text-3xl tabular-nums ${numberClassName || 'font-bold text-gold'}`}
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div className={`text-[10px] uppercase tracking-widest mt-1 ${labelClassName || 'text-white/50 font-sans'}`}>
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center">
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className={`text-xl font-light mb-4 w-4 flex justify-center ${separatorClassName || 'text-white/20'}`}>:</div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className={`text-xl font-light mb-4 w-4 flex justify-center ${separatorClassName || 'text-white/20'}`}>:</div>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <div className={`text-xl font-light mb-4 w-4 flex justify-center ${separatorClassName || 'text-white/20'}`}>:</div>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}
