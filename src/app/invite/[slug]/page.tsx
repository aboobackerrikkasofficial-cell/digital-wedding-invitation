"use client";

import { EntrySplashScreen } from "@/components/EntrySplashScreen";
import { useParams, useRouter } from "next/navigation";
import { useWedding } from "./WeddingContext";

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

  return (
    <EntrySplashScreen 
      wedding={wedding} 
      onOpen={handleOpen} 
    />
  );
}
