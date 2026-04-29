"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck, ArrowRight, Loader2, AlertTriangle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/Toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [envError, setEnvError] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    console.log("AdminLogin mounted (v2.0). Admin Email:", adminEmail);
    if (!adminEmail) {
      setEnvError(true);
    }

    // Fix for "Invalid Refresh Token" error:
    // If we're on the login page and Supabase has a stale session it can't refresh,
    // we should clear it to prevent the error overlay.
    const clearStaleSession = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        if (error && (error.message.includes("refresh_token_not_found") || error.message.includes("refresh token"))) {
          console.warn("Stale session detected, clearing...");
          await supabase.auth.signOut();
          localStorage.removeItem("isAdmin");
        }
      } catch (e) {
        console.error("Error checking session:", e);
      }
    };
    clearStaleSession();
  }, [adminEmail]);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.toLowerCase().trim();
    const cleanPassword = password.trim();

    console.log("Login attempt (v2.0) for:", cleanEmail);

    if (cleanEmail !== adminEmail?.toLowerCase().trim()) {
      showToast("Unauthorized: Incorrect admin email.", "error");
      return;
    }

    setLoading(true);
    try {
      console.log("Calling supabase.auth.signInWithPassword...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });

      if (error) throw error;

      if (data.session) {
        console.log("Login successful. Terminating other sessions...");
        
        // 1. Sign out other sessions for this user
        await supabase.auth.signOut({ scope: 'others' });
        
        // 2. Set flags for the layout
        localStorage.setItem("isAdmin", "true");
        
        showToast("Access granted!", "success");
        router.replace("/admin");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      let errorMessage = "Invalid credentials. Please try again.";
      
      if (err.message === "Invalid login credentials") {
        errorMessage = "Invalid email or password. Please check your credentials.";
      } else if (err.message?.includes("Email not confirmed")) {
        errorMessage = "Please confirm your email address in Supabase.";
      }
      
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  if (envError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100 text-center max-w-sm w-full">
          <AlertTriangle className="text-red-500 mx-auto mb-4" size={40} />
          <h2 className="text-xl font-bold mb-2">Admin Setup Error</h2>
          <p className="text-gray-600 text-sm mb-6">NEXT_PUBLIC_ADMIN_EMAIL is missing in .env.local</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-black text-white py-3 rounded-xl font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf0] px-4 font-sans text-black">
      <div className="max-w-md w-full bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-gold/20">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="text-gold" size={28} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-black mb-2">Admin Shield</h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black">Authorized Personnel Only</p>
          <span className="text-[8px] text-gray-300 mt-2 block">v2.0 (Password Mode)</span>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-5 rounded-2xl border-2 border-gray-100 focus:border-gold outline-none bg-gray-50 text-black font-medium transition-all"
                  placeholder="admin@example.com"
                  required
                  autoComplete="email"
                  style={{ color: 'black', backgroundColor: '#f9fafb' }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-5 rounded-2xl border-2 border-gray-100 focus:border-gold outline-none bg-gray-50 text-black font-medium transition-all"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  style={{ color: 'black', backgroundColor: '#f9fafb' }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                Unlock Dashboard
                <ArrowRight size={20} />
              </>
            )}
          </button>
          
          <div className="bg-gold/5 p-4 rounded-xl border border-gold/10">
            <p className="text-[10px] text-gold-dark font-medium leading-relaxed">
              <span className="font-bold uppercase mr-1">Security Policy:</span> 
              Logging in will automatically terminate all other active sessions for this account to ensure single-user access.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <details className="group">
              <summary className="flex items-center justify-center gap-2 cursor-pointer text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gold transition-colors list-none">
                <span>Need help with login?</span>
                <ArrowRight size={12} className="group-open:rotate-90 transition-transform" />
              </summary>
              <div className="mt-4 p-4 bg-gray-50 rounded-xl text-[10px] text-gray-500 space-y-2 leading-relaxed">
                <p>1. Ensure <code className="bg-gray-200 px-1 rounded">{adminEmail}</code> is created in your <strong>Supabase Dashboard &gt; Authentication</strong> section.</p>
                <p>2. Verify that the password you are using matches the one set in Supabase.</p>
                <p>3. If you haven't created the user yet, click <strong>"Add User"</strong> in Supabase and use the email above.</p>
              </div>
            </details>
          </div>
        </form>
      </div>
    </div>
  );
}
