"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { App } from "@capacitor/app";

/**
 * CapacitorNavigationHandler - Handles Android hardware back button
 * and ensures it navigates through the app history instead of closing the app.
 */
export function CapacitorNavigationHandler() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let backButtonListener: any;

    const setupBackButton = async () => {
      // Robust native check
      const isNative = typeof window !== 'undefined' && (window as any).Capacitor?.platform && (window as any).Capacitor?.platform !== 'web';
      
      if (!isNative) return;

      backButtonListener = await App.addListener('backButton', ({ canGoBack }) => {
        // Exit app if on these paths OR if no more history
        const rootPaths = ["/", "/admin/login", "/admin"];
        
        if (rootPaths.includes(pathname) || !canGoBack) {
          App.exitApp();
        } else {
          // Use standard history for better reliability in some WebViews
          window.history.back();
        }
      });
    };

    setupBackButton();

    return () => {
      if (backButtonListener) {
        backButtonListener.remove();
      }
    };
  }, [pathname]);

  return null; // This component has no UI
}
