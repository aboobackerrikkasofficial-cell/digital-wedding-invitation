'use client';

/**
 * TEST PWA INSTALL FEATURE
 * This is an isolated component for testing the 'Add to Home Screen' experience.
 * It can be safely removed by deleting this file and its reference in layout.tsx.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    const checkStandalone = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches 
        || (window.navigator as any).standalone 
        || document.referrer.includes('android-app://');
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Show the prompt if not already in standalone mode
      if (!isStandalone) {
        setIsVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isStandalone]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the PWA install prompt');
    }
    
    // We've used the prompt, and can't use it again, so clear it
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (isStandalone || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 20 }}
          className="fixed bottom-24 right-4 z-[9999] md:hidden"
        >
          <div className="relative group">
            {/* Minimal Floating Button */}
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-gold/30 p-2 pl-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-gold/20 active:scale-95 transition-all"
            >
              <span className="text-[10px] font-bold text-gold uppercase tracking-tighter">Install</span>
              <div className="w-7 h-7 bg-gold rounded-full flex items-center justify-center text-white shadow-inner">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </button>

            {/* Subtle Dismiss X */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute -top-1 -left-1 w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border border-gray-200 hover:text-gray-600 shadow-sm"
            >
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
