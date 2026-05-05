"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import AdminLogin from "./login/page";
import { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);
  const isLoginPage = pathname?.includes("login");
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    setMounted(true);
    
    let isMounted = true;
    const checkSession = async () => {
      // 1. Initial Quick Check (Mobile Optimization)
      const hasLocalHint = typeof window !== 'undefined' && localStorage.getItem("isAdmin") === "true";
      if (hasLocalHint && authorized === null) {
        setAuthorized(true);
      }

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (!isMounted) return;

        if (error || !session || session.user.email?.toLowerCase() !== adminEmail?.toLowerCase()) {
          console.warn("Unauthorized access attempt or session expired.");
          localStorage.removeItem("isAdmin");
          setAuthorized(false);
          return;
        }

        localStorage.setItem("isAdmin", "true");
        setAuthorized(true);
      } catch (err) {
        console.error("Auth check failed:", err);
        // If network fails on mobile, we trust the local hint if it exists
        if (hasLocalHint) setAuthorized(true);
        else setAuthorized(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      if (!isMounted) return;
      if (event === 'SIGNED_OUT') {
        localStorage.removeItem("isAdmin");
        setAuthorized(false);
        router.push("/admin/login");
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [adminEmail, isLoginPage, router]);

  // Prevent Hydration mismatch on mobile browsers
  if (!mounted) return null;

  // On Login page, show content directly
  if (isLoginPage) {
    return <div className="min-h-screen bg-[#fdfbf0]">{children}</div>;
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gold" />
        <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Loading Dashboard...</p>
      </div>
    );
  }

  if (authorized === false) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <AdminSidebar />
      <main className="flex-1 w-full md:ml-72 p-4 pt-20 pb-32 md:p-8 md:pb-8">
        {children}
      </main>
    </div>
  );
}
