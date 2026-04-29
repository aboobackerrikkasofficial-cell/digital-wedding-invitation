"use client";

import { RsvpFlow } from "@/components/RsvpFlow";
import { useParams, useRouter } from "next/navigation";
import { useWedding } from "../WeddingContext";
import { useEffect } from "react";

export default function RsvpPage() {
  const { slug } = useParams();
  const router = useRouter();
  const wedding = useWedding();

  if (!wedding) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gold" />
      </div>
    );
  }

  const handleComplete = (data: any) => {
    // Store RSVP data in session storage to pass to thank you page if needed
    // or just rely on the database and show a generic thank you.
    sessionStorage.setItem(`rsvp_${slug}`, JSON.stringify(data));
    router.push(`/invite/${slug}/thank-you?status=attending`);
  };

  const handleBack = () => {
    // Instead of state switching, we use browser back or explicit route push
    router.push(`/invite/${slug}/invitation`);
  };

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

  return (
    <div className="h-[calc(100dvh-2rem)] w-full overflow-hidden relative">
      <RsvpFlow 
        wedding={wedding}
        onComplete={handleComplete}
        onBack={handleBack}
      />
    </div>
  );
}
