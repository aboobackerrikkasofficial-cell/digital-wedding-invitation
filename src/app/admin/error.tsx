"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
        <AlertTriangle size={32} />
      </div>
      
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-500 text-sm max-w-xs mb-8">
        We encountered an error while loading the dashboard. This might be due to a slow connection or a temporary issue.
      </p>

      <button
        onClick={() => reset()}
        className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-[0.98]"
      >
        <RefreshCw size={20} />
        Try Again
      </button>

      <p className="mt-8 text-[10px] text-gray-300 uppercase tracking-widest font-mono">
        Error Digest: {error.digest || "N/A"}
      </p>
    </div>
  );
}
