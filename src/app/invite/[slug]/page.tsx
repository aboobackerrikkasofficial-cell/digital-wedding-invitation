"use client";

import { EntrySplashScreen } from "@/components/EntrySplashScreen";
import { useParams, useRouter } from "next/navigation";
import { useWedding } from "./WeddingContext";

export default function EntryPage() {
  const { slug } = useParams();
  const router = useRouter();
  const wedding = useWedding();

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
