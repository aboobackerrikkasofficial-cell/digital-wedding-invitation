"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import AdminLogin from "./login/page";
import { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

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
    
    // Safety check for mobile: if loading hangs for more than 2.5 seconds, force a reload once
    const isNative = typeof window !== 'undefined' && (window as any).Capacitor?.platform && (window as any).Capacitor?.platform !== 'web';
    if (isNative && authorized === null) {
      const timer = setTimeout(() => {
        const reloadCount = sessionStorage.getItem("adminReloadCount") || "0";
        if (parseInt(reloadCount) < 1) {
          console.warn("Mobile Dashboard Hang Detected: Forcing one-time recovery reload");
          sessionStorage.setItem("adminReloadCount", "1");
          window.location.reload();
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [authorized]);

  useEffect(() => {
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
          // Auto-redirect to login if not authorized
          if (!isLoginPage) {
            router.push("/admin/login");
          }
          return;
        }

        localStorage.setItem("isAdmin", "true");
        setAuthorized(true);
      } catch (err) {
        console.error("Auth check failed:", err);
        // If network fails on mobile, we trust the local hint if it exists
        if (hasLocalHint) setAuthorized(true);
        else {
          setAuthorized(false);
          router.push("/admin/login");
        }
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

  // On Login page, show content directly
  if (mounted && isLoginPage) {
    return <div className="min-h-screen bg-[#fdfbf0]">{children}</div>;
  }

  if (!mounted || authorized === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 p-6">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gold" />
        <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Initializing Dashboard...</p>
        
        {/* Mobile Debug Helper: Visible only if it hangs on mobile */}
        {mounted && typeof window !== 'undefined' && (window as any).Capacitor?.platform !== 'web' && (
          <div className="mt-8 p-4 bg-white rounded-xl border border-gray-100 shadow-sm text-center animate-fade-in">
            <p className="text-[9px] text-gray-400 uppercase tracking-tighter mb-2">Mobile Status: Checking Session...</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-[10px] font-black text-gold border-b border-gold/30 pb-1"
            >
              Click here if screen stays blank
            </button>
          </div>
        )}
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-[10px] uppercase tracking-widest text-red-500 font-bold mb-2">Unauthorized Access</p>
        <p className="text-gray-400 text-xs mb-4">Please log in to continue.</p>
        <button 
          onClick={() => window.location.href = "/admin/login"}
          className="bg-black text-white px-6 py-2 rounded-xl text-xs font-bold"
        >
          Go to Login
        </button>
      </div>
    );
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
