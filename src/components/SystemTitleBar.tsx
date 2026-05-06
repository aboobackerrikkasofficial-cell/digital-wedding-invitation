"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SystemTitleBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isNative = typeof window !== 'undefined' && (window as any).Capacitor?.platform;
    const hideOn = ["/", "/admin/login", "/admin"];
    const shouldHide = hideOn.includes(pathname);
    
    // Always visible on mobile except on root pages
    setIsVisible(!shouldHide);
  }, [pathname]);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleGoHome = (e: React.MouseEvent) => {
    const isNative = typeof window !== 'undefined' && (window as any).Capacitor?.platform && (window as any).Capacitor?.platform !== 'web';
    if (isNative) {
      e.preventDefault();
      router.push("/");
    }
  };

  if (!isVisible) return null;

  const isAdjustedPage = pathname === '/admin/create' || pathname.startsWith('/admin/edit/');

  return (
    <div className={cn(
      "fixed top-6 left-0 right-0 z-[9999] flex items-center justify-between px-6 pointer-events-none",
      isAdjustedPage && "md:left-72 md:px-0 md:pl-1 md:pr-3"
    )}>
      {/* Glass Back Button */}
      <button
        onClick={handleBack}
        className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl text-gray-900 active:scale-90 transition-all"
        aria-label="Go back"
      >
        <ChevronLeft size={28} strokeWidth={2.5} />
      </button>

      {/* Glass Home Button */}
      <Link
        href="/"
        onClick={handleGoHome}
        className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl text-gray-900 active:scale-90 transition-all"
        aria-label="Go to Home"
      >
        <Home size={22} strokeWidth={2.5} />
      </Link>
    </div>
  );
}
