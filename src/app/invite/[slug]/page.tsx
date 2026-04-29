"use client";

import { EntrySplashScreen } from "@/components/EntrySplashScreen";
import { useParams, useRouter } from "next/navigation";
import { useWedding } from "./WeddingContext";
import { useEffect } from "react";

export default function EntryPage() {
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

  const handleOpen = () => {
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
    <EntrySplashScreen 
      wedding={wedding} 
      onOpen={handleOpen} 
    />
  );
}
