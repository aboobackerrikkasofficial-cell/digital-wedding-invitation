"use client";

import { ThankYouPage } from "@/components/ThankYouPage";
import { useSearchParams } from "next/navigation";
import { useWedding } from "../WeddingContext";
import { useEffect, useState } from "react";

export default function ThankYouSubPage() {
  const wedding = useWedding();
  const searchParams = useSearchParams();
  const [rsvpData, setRsvpData] = useState<any>({ is_attending: true });

  useEffect(() => {
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
  }, [searchParams, wedding.slug]);

  return (
    <ThankYouPage 
      wedding={wedding} 
      rsvpData={rsvpData} 
    />
  );
}
