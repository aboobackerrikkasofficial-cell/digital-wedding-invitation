"use client";

import { RsvpFlow } from "@/components/RsvpFlow";
import { useParams, useRouter } from "next/navigation";
import { useWedding } from "../WeddingContext";

export default function RsvpPage() {
  const { slug } = useParams();
  const router = useRouter();
  const wedding = useWedding();

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

  return (
    <RsvpFlow 
      wedding={wedding}
      onComplete={handleComplete}
      onBack={handleBack}
    />
  );
}
