"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone, Monitor, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if it's already installed
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    // Check if it's iOS
    const ua = window.navigator.userAgent;
    const isIPad = !!ua.match(/iPad/i);
    const isIPhone = !!ua.match(/iPhone/i);
    const iOS = isIPad || isIPhone;
    
    // Use requestAnimationFrame for all state updates to avoid cascading renders
    requestAnimationFrame(() => {
      setIsStandalone(isStandaloneMode);
      setIsIOS(iOS);
    });

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default browser prompt
      e.preventDefault();
      // Save the event
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show our custom popup
      if (!isStandaloneMode) {
        setShowPopup(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Auto-show iOS instructions if not standalone
    if (iOS && !isStandaloneMode) {
        const timer = setTimeout(() => setShowPopup(true), 3000);
        return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the browser install prompt
    deferredPrompt.prompt();

    // Wait for the user response
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install: ${outcome}`);

    // Reset
    setDeferredPrompt(null);
    setShowPopup(false);
  };

  if (isStandalone) return null;

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[9999] max-w-sm"
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gold/10 relative overflow-hidden group">
            {/* Elegant Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/5 rounded-full -ml-12 -mb-12" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold to-gold/70 flex items-center justify-center shadow-lg shadow-gold/20">
                        <Download className="text-white" size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-serif font-extrabold text-gray-900 leading-none">Install App</h3>
                        <p className="text-[10px] uppercase tracking-widest text-gold font-bold mt-1">Wedding Invitation</p>
                    </div>
                </div>
                <button 
                  onClick={() => setShowPopup(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>

              {isIOS ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    To install on iPhone/iPad:
                  </p>
                  <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-gray-600 font-medium">
                        <div className="w-6 h-6 rounded-lg bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                            <Share size={12} className="text-blue-500" />
                        </div>
                        <span>Tap the <span className="font-bold">Share</span> button</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600 font-medium">
                        <div className="w-6 h-6 rounded-lg bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                            <Plus size={12} className="text-gray-900" />
                        </div>
                        <span>Select <span className="font-bold">&quot;Add to Home Screen&quot;</span></span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    Add this invitation to your home screen for quick access and offline viewing.
                  </p>
                  
                  <button
                    onClick={handleInstallClick}
                    className="w-full bg-gray-900 text-white py-4 rounded-2xl text-sm font-bold shadow-xl shadow-gray-200 active:scale-[0.98] transition-all hover:bg-black flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Add to Home Screen
                  </button>
                </>
              )}

              <div className="mt-6 flex items-center justify-center gap-4 text-[9px] text-gray-300 font-black uppercase tracking-[0.2em]">
                <div className="flex items-center gap-1.5">
                  <Monitor size={10} />
                  <span>Desktop</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-200" />
                <div className="flex items-center gap-1.5">
                  <Smartphone size={10} />
                  <span>Mobile</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const Plus = ({ size, className }: { size?: number, className?: string }) => (
    <svg 
        width={size || 24} 
        height={size || 24} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);
