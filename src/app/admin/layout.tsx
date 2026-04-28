"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isLoginPage = pathname === "/admin/login";
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const checkSession = async () => {
      console.log(`Checking session (Attempt ${retryCount + 1})...`);
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Supabase Session Error:", sessionError);
          setError(sessionError.message);
          setAuthorized(false);
          return;
        }

        const userEmail = session?.user?.email?.toLowerCase() || "";
        const expectedEmail = adminEmail?.toLowerCase()?.trim() || "";
        
        console.log("Session User:", userEmail || "None");
        console.log("Target Admin:", expectedEmail || "Not Set");

        const isUserAdmin = userEmail === expectedEmail && userEmail !== "";

        if (session && isUserAdmin) {
          console.log("Admin Access Verified.");
          setAuthorized(true);
        } else {
          if (!isLoginPage) {
            console.warn("No valid admin session. Redirecting...");
            setAuthorized(false);
            router.push("/admin/login");
          } else {
            setAuthorized(false);
          }
        }
      } catch (err: any) {
        console.error("Critical Auth Exception:", err);
        setError(err.message || "Security system failure");
        setAuthorized(false);
      }
    };

    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth Event:", event);
      const isUserAdmin = session?.user?.email?.toLowerCase() === adminEmail?.toLowerCase();
      if (session && isUserAdmin) {
        setAuthorized(true);
      } else if (event === 'SIGNED_OUT') {
        setAuthorized(false);
        if (!isLoginPage) router.push("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router, isLoginPage, adminEmail, retryCount]);

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <h1 className="text-xl font-bold mb-2">Security System Error</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-gray-900 text-white px-6 py-2 rounded-lg font-bold">Retry System</button>
      </div>
    );
  }

  // CRITICAL: If we are on the login page, just show the login form immediately
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#fdfbf0]">
        <main className="w-full">{children}</main>
      </div>
    );
  }

  // While checking /admin, show spinner
  if (authorized === null) {
    return (
      <div className="min-h-screen bg-[#fdfbf0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gold" />
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Securing Session...</p>
            <button 
                onClick={() => setRetryCount(prev => prev + 1)}
                className="text-[10px] text-gray-400 underline uppercase tracking-tighter"
            >
                Taking too long? Click to retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If not authorized and not on login page, we'll be redirecting anyway, but show a message
  if (authorized === false && !isLoginPage) {
    return (
        <div className="min-h-screen bg-[#fdfbf0] flex items-center justify-center">
            <p className="text-xs text-gray-500">Redirecting to login...</p>
        </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <AdminSidebar />
      <main className="flex-1 w-full md:ml-64 p-4 pt-20 md:p-8">
        {children}
      </main>
    </div>
  );
}
