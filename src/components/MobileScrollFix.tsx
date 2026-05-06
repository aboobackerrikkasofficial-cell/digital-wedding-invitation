"use client";

import { useEffect } from "react";

/**
 * MobileScrollFix - Applies CSS fixes specifically for the mobile app environment.
 * Ensures that pages can scroll vertically when content overflows, while keeping
 * the desktop/web experience unchanged.
 */
export function MobileScrollFix() {
  useEffect(() => {
    // Detect if running as a native app
    const isNative = typeof window !== 'undefined' && (window as any).Capacitor?.platform && (window as any).Capacitor?.platform !== 'web';
    
    if (isNative) {
      // 1. Disable Service Workers to prevent white screen caching
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          for (const registration of registrations) {
            registration.unregister();
            console.log("Mobile App: Service Worker Unregistered successfully.");
          }
        });
      }

      // 2. Apply global mobile-only styles to fix scrolling
      const style = document.createElement('style');
      style.id = 'mobile-scroll-fix';
      style.innerHTML = `
        /* FORCE EVERYTHING TO SCROLL ON MOBILE */
        html, body, #__next, main {
          overflow-y: auto !important;
          overflow-x: hidden !important;
          height: auto !important;
          min-height: 100% !important;
          position: relative !important;
          -webkit-overflow-scrolling: touch !important;
        }

        /* Override fixed height invitation layouts */
        div[class*="h-screen"], 
        div[class*="h-[100dvh]"],
        div[class*="h-[calc(100dvh"] {
          height: auto !important;
          min-height: 100vh !important;
          overflow: visible !important;
        }

        /* Fix invitation templates that use fixed positioning */
        div[class*="fixed left-0 right-0 z-40 w-full"],
        div[class*="min-h-screen w-full overflow-x-hidden"] {
          position: relative !important;
          height: auto !important;
          min-height: 100vh !important;
          overflow-y: visible !important;
          overflow-x: hidden !important;
          display: flex !important;
          flex-direction: column !important;
        }

        /* Specifically target the invitation landing container */
        .relative.min-h-\\[100dvh\\] {
          height: auto !important;
          min-height: 100vh !important;
          overflow: visible !important;
          display: flex !important;
          flex-direction: column !important;
          padding-bottom: 5rem !important; /* Extra room for glass buttons */
        }

        /* Ensure card components take full width/height naturally */
        .wedding-card-container {
          min-height: 100vh !important;
          width: 100% !important;
        }

        /* Allow inner containers to expand naturally */
        main.relative.z-10, 
        aside.relative {
          height: auto !important;
          min-height: min-content !important;
        }

        /* Force show scrollbar if needed */
        ::-webkit-scrollbar {
          display: block !important;
          width: 4px !important;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1) !important;
          border-radius: 10px !important;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        const el = document.getElementById('mobile-scroll-fix');
        if (el) el.remove();
      };
    }
  }, []);

  return null;
}
