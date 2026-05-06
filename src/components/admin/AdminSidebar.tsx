"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LayoutDashboard, PlusCircle, LogOut, Menu, X, Sparkles, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Create New", href: "/admin/create", icon: PlusCircle },
  { name: "View Live Demo", href: "/invite/demo", icon: Eye },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    localStorage.removeItem("isAdmin");
    await supabase.auth.signOut();
    
    const isNative = typeof window !== 'undefined' && (window as any).Capacitor?.platform && (window as any).Capacitor?.platform !== 'web';
    if (isNative) {
      router.push("/admin/login");
    } else {
      router.push("/admin/login");
    }
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 z-[55] shadow-sm">
        <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-gold to-gold/60 rounded-lg flex items-center justify-center shadow-md">
                <Sparkles className="text-white" size={18} />
            </div>
            <div>
                <h1 className="text-lg font-serif font-bold text-gray-900 leading-none">Wedding</h1>
                <span className="text-[10px] uppercase tracking-wider text-gold font-bold">Admin Portal</span>
            </div>
        </div>
        {!isOpen && (
          <button 
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-gray-50 rounded-lg text-gray-600 transition-colors"
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[58] md:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "w-72 bg-white border-r border-gray-100 flex flex-col h-screen fixed left-0 top-0 z-[60] md:translate-x-0 shadow-2xl md:shadow-none hidden md:flex",
      )}>
        <div className="p-8 pb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold/60 rounded-xl flex items-center justify-center shadow-lg shadow-gold/20">
                <Sparkles className="text-white" size={20} />
            </div>
            <div>
                <h1 className="text-xl font-serif font-bold text-gray-900 leading-none">Wedding</h1>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Admin Portal</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => {
                setIsOpen(false);
                const isNative = typeof window !== 'undefined' && (window as any).Capacitor?.platform && (window as any).Capacitor?.platform !== 'web';
                if (isNative) {
                  e.preventDefault();
                  router.push(item.href);
                }
              }}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                pathname === item.href 
                  ? "bg-gold/10 text-gold" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-50">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-72 bg-white flex flex-col h-screen fixed left-0 top-0 z-[60] shadow-2xl md:hidden"
          >
            <div className="p-6 pb-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold/60 rounded-xl flex items-center justify-center shadow-lg shadow-gold/20">
                      <Sparkles className="text-white" size={20} />
                  </div>
                  <div>
                      <h1 className="text-xl font-serif font-bold text-gray-900 leading-none">Wedding</h1>
                      <span className="text-[11px] uppercase tracking-widest text-gold font-bold">Admin Portal</span>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400">
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      setIsOpen(false);
                      const isNative = typeof window !== 'undefined' && (window as any).Capacitor?.platform && (window as any).Capacitor?.platform !== 'web';
                      if (isNative) {
                        e.preventDefault();
                        router.push(item.href);
                      }
                    }}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                      pathname === item.href 
                        ? "bg-gold/10 text-gold shadow-sm" 
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <item.icon size={20} />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mt-auto p-4 border-t border-gray-50">
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
