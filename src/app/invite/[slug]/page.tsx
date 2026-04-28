"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { InvitationLanding } from "@/components/InvitationLanding";
import { RsvpFlow } from "@/components/RsvpFlow";
import { ThankYouPage } from "@/components/ThankYouPage";
import { BackgroundMusic } from "@/components/BackgroundMusic";

import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

import { EntrySplashScreen } from "@/components/EntrySplashScreen";
import { AnimatePresence, motion } from "framer-motion";

export default function InvitePage() {
  const { slug } = useParams();
  const [wedding, setWedding] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"invitation" | "rsvp" | "thank-you">("invitation");
  const [rsvpData, setRsvpData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check admin status
    const adminStatus = localStorage.getItem("isAdmin");
    if (adminStatus === "true") setIsAdmin(true);

    async function fetchWedding() {
      if (!slug) return;
      
      // Handle demo case
      if (slug === "demo") {
        setWedding({
          bride_name: "Sarah",
          groom_name: "Deepak",
          wedding_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          venue_name: "Grand Royal Ballroom",
          google_maps_url: "https://maps.google.com",
          islamic_date: "12th Shawwal 1445",
          custom_message: "We are delighted to invite you to our wedding celebration. Your presence means the world to us!",
          template_id: "muslim-royal",
          music_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("weddings")
        .select("*")
        .eq("slug", slug)
        .maybeSingle(); // maybeSingle returns null instead of PGRST116 error
        
      if (error) {
        console.error("Error fetching wedding:", error);
        setError("Database error. Please try again later.");
      } else if (!data) {
        setError("Wedding invitation not found.");
      } else {
        const sideParam = new URLSearchParams(window.location.search).get('side');
        if (data) {
          if (sideParam === 'bride') {
            data.host_selection = 'bride_side';
          } else if (sideParam === 'groom') {
            data.host_selection = 'groom_side';
          }
        }
        setWedding(data);
      }
      setLoading(false);
    }
    
    fetchWedding();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (error || !wedding) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-3xl font-serif mb-4">Oops!</h1>
        <p className="text-gray-600">{error || "Something went wrong."}</p>
      </div>
    );
  }

  const handleNextStep = (next: "rsvp" | "thank-you", data?: any) => {
    if (data) setRsvpData((prev: any) => ({ ...prev, ...data }));
    setStep(next);
  };

  const handleAttend = () => {
    setStep("rsvp");
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
    handleNextStep("thank-you", { is_attending: false });
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Continuous Music Player - Mounted early to capture first click interaction */}
      <BackgroundMusic musicUrl={wedding.music_url} forcePlay={isOpened} />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <EntrySplashScreen 
            key="splash"
            wedding={wedding} 
            onOpen={() => setIsOpened(true)} 
          />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Admin Back to Dashboard Button */}
            {isAdmin && slug === "demo" && (
              <Link 
                href="/admin"
                className="fixed top-6 left-6 z-[100] flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-xs transition-all shadow-xl shadow-black/20"
              >
                <LayoutDashboard size={14} />
                Back to Dashboard
              </Link>
            )}

            {step === "invitation" && (
              <InvitationLanding 
                wedding={wedding} 
                onAttend={handleAttend} 
                onNotAttend={handleNotAttend}
              />
            )}
            
            {step === "rsvp" && (
              <RsvpFlow 
                wedding={wedding}
                onComplete={(data) => handleNextStep("thank-you", { ...data, is_attending: true })}
                onBack={() => setStep("invitation")}
              />
            )}
            
            {step === "thank-you" && (
              <ThankYouPage 
                wedding={wedding} 
                rsvpData={rsvpData} 
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
