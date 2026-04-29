"use client";

import { InvitationLanding } from "@/components/InvitationLanding";
import { useParams, useRouter } from "next/navigation";
import { useWedding } from "../WeddingContext";
import { supabase } from "@/lib/supabase";

export default function InvitationPage() {
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

  const handleAttend = () => {
    router.push(`/invite/${slug}/rsvp`);
  };

  const handleNotAttend = async () => {
    if (slug !== "demo") {
      try {
        await supabase.from("rsvps").insert({
          wedding_id: wedding.id,
          name: "Honored Guest",
          guest_count: 0,
          is_attending: false
        });
      } catch (err) {
        console.error("Error saving no response:", err);
      }
    }
    // Redirect to thank you page with a query param for declined state
    router.push(`/invite/${slug}/thank-you?status=declined`);
  };

  return (
    <InvitationLanding 
      wedding={wedding} 
      onAttend={handleAttend} 
      onNotAttend={handleNotAttend}
    />
  );
}
