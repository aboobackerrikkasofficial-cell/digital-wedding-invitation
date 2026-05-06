"use client";

import { ThankYouPage } from "@/components/ThankYouPage";
import { useSearchParams } from "next/navigation";
import { useWedding } from "../WeddingContext";
import { useEffect, useState } from "react";

export default function ThankYouClient() {
  const wedding = useWedding();
  const searchParams = useSearchParams();
  const [rsvpData, setRsvpData] = useState<any>({ is_attending: true });

  useEffect(() => {
    // Lock scrolling on this specific page
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    
    return () => {
      // Restore scrolling when leaving the page
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, []);

  useEffect(() => {
    if (!wedding) return;

    const status = searchParams.get("status");
    const isAttending = status !== "declined";
    
    // Try to get more detailed RSVP data from session storage if available
    const stored = sessionStorage.getItem(`rsvp_${wedding.slug}`);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setRsvpData({ ...data, is_attending: isAttending });
      } catch (err) {
        setRsvpData({ is_attending: isAttending });
      }
    } else {
      setRsvpData({ is_attending: isAttending });
    }
  }, [searchParams, wedding?.slug]);

  if (!wedding) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gold" />
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full overflow-hidden relative">
      <ThankYouPage 
        wedding={wedding} 
        rsvpData={rsvpData} 
      />
    </div>
  );
}
