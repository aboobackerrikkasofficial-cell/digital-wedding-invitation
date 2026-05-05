"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/Toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password: password.trim(),
      });

      if (error) throw error;

      if (data.user?.email?.toLowerCase() !== adminEmail?.toLowerCase()) {
        await supabase.auth.signOut();
        throw new Error("Unauthorized access.");
      }

      localStorage.setItem("isAdmin", "true");
      showToast("Access granted!", "success");
      
      // Hard redirect for mobile stability
      window.location.href = "/admin";
    } catch (err: any) {
      console.error("Login error:", err);
      showToast(err.message || "Invalid credentials", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf0] px-4 font-sans text-black">
      <div className="max-w-md w-full bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-gold/10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="text-gold" size={28} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-black mb-2">Admin Shield</h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black">Mobile Admin Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-5 rounded-2xl border-2 border-gray-100 focus:border-gold outline-none bg-gray-50 text-[#000000] font-medium transition-all"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-5 rounded-2xl border-2 border-gray-100 focus:border-gold outline-none bg-gray-50 text-[#000000] font-medium transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-lg active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>Unlock Dashboard <ArrowRight size={20} /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
