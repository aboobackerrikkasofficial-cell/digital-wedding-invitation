"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { BackgroundMusic } from "@/components/BackgroundMusic";
import { AnimatePresence, motion } from "framer-motion";

import { WeddingProvider } from "./WeddingContext";

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { slug } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [wedding, setWedding] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    async function fetchWedding() {
      if (!slug) {
        setLoading(false);
        return;
      }
      
      // Handle demo case
      if (slug === "demo") {
        setWedding({
          id: "00000000-0000-0000-0000-000000000000",
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

      try {
        const { data, error } = await supabase
          .from("weddings")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();
          
        if (error) {
          console.error("Supabase error fetching wedding:", error);
          setError("Database error. Please try again later.");
        } else if (!data) {
          console.error("No wedding data found for slug:", slug);
          setError("Wedding invitation not found.");
        } else {
          console.log("Wedding data successfully fetched:", data);
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
      } catch (err: any) {
        console.error("Critical error in fetchWedding:", err);
        if (err.message?.includes('Failed to fetch')) {
          setError("Network Error: Could not connect to Supabase. Please check your internet connection and verify that your NEXT_PUBLIC_SUPABASE_URL in .env.local is correct. (You may need to restart your dev server if you recently changed it)");
        } else {
          setError("An unexpected error occurred while loading the invitation.");
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchWedding();
  }, [slug]);

  // Debug wedding state changes
  useEffect(() => {
    console.log("InviteLayout: Wedding state updated:", wedding?.id || 'NO_ID', wedding);
  }, [wedding]);

  // Handle the "Opened" state for music
  useEffect(() => {
    // If we are not on the root slug page, it means we've already opened the splash
    if (pathname !== `/invite/${slug}`) {
      setIsOpened(true);
    }
  }, [pathname, slug]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#fdfbf0] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gold" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#fdfbf0] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Invitation Not Found</h2>
        <p className="text-gray-500 mb-8">{error}</p>
        <button 
          onClick={() => router.push('/')}
          className="bg-gold text-white px-8 py-3 rounded-xl font-bold"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <BackgroundMusic 
        musicUrl={wedding?.music_url || ""} 
        forcePlay={isOpened} 
        templateId={wedding?.template_id} 
      />
      <WeddingProvider wedding={wedding}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="w-full"
        >
          {children}
        </motion.div>
      </WeddingProvider>
    </div>
  );
}


