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
  const [wedding, setWedding] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    async function fetchWedding() {
      if (!slug) return;
      
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

      const { data, error } = await supabase
        .from("weddings")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
        
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

  // Handle the "Opened" state for music
  useEffect(() => {
    // If we are not on the root slug page, it means we've already opened the splash
    if (pathname !== `/invite/${slug}`) {
      setIsOpened(true);
    }
  }, [pathname, slug]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <BackgroundMusic musicUrl={wedding?.music_url || ""} forcePlay={isOpened} />
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


