"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Users, ArrowLeft, Download, Search, UserCheck, UserMinus, Plus } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TrackingPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [wedding, setWedding] = useState<any>(null);
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdminView, setIsAdminView] = useState(false);

  const formatDate = (dateString: string, formatStr: string = "MMM d, yyyy") => {
    try {
      if (!dateString) return "N/A";
      return format(new Date(dateString), formatStr);
    } catch (err) {
      return "Invalid date";
    }
  };

  useEffect(() => {
    // Check if we arrived from the admin dashboard via URL parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get('source') === 'admin') {
      setIsAdminView(true);
    }

    fetchData(true);

    // Re-fetch when window regains focus (user comes back to tab)
    const handleFocus = () => fetchData(false);
    window.addEventListener('focus', handleFocus);

    // Enable Realtime Updates
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'rsvps'
        },
        (payload) => {
          console.log('Realtime update received:', payload);
          fetchData(false); // Background refresh
        }
      )
      .subscribe();

    return () => {
      window.removeEventListener('focus', handleFocus);
      supabase.removeChannel(channel);
    };
  }, [slug]);

  const fetchData = async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      
      console.log("Fetching tracking data for slug:", slug);
      
      // Fetch Wedding with RSVPs in a single relational query
      // Explicitly ordering rsvps by created_at descending
      const { data: weddingData, error: weddingError } = await supabase
        .from("weddings")
        .select("*, rsvps(*)")
        .eq("slug", slug)
        .order('created_at', { referencedTable: 'rsvps', ascending: false })
        .single();
        
      if (weddingError) throw weddingError;
      
      console.log("Tracking data received:", weddingData);
      
      setWedding(weddingData);
      setRsvps(weddingData.rsvps || []);

    } catch (err) {
      console.error("Error fetching tracking data:", err);
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = ["Guest Name", "Status", "Guest Count", "Date", "Phone", "Message"];
    const csvData = (rsvps || []).map(r => [
      `"${r.name || 'Anonymous Guest'}"`,
      "Attending",
      r.guest_count,
      `"${formatDate(r.created_at, 'PPP')}"`,
      `"${r.phone || ''}"`,
      `"${r.message || ''}"`
    ]);
    
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${wedding?.bride_name || 'Wedding'}_RSVPs.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRsvps = (rsvps || []).filter(r => {
    const search = searchQuery.toLowerCase();
    const guestName = (r.name || "Honored Guest").toLowerCase();
    return guestName.includes(search);
  });

  const totalGuests = rsvps
    .filter(r => r.is_attending)
    .reduce((acc, r) => acc + (r.guest_count || 0), 0);
  const totalRsvps = rsvps.filter(r => r.is_attending).length;
  const totalDeclined = rsvps.filter(r => !r.is_attending).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gold" />
      </div>
    );
  }

  if (!wedding) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center p-4">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Invitation Not Found</h1>
              <Link href="/admin" className="text-gold font-bold underline">Back to Admin</Link>
          </div>
      )
  }

  return (
    <div className="h-[100dvh] bg-[#fafafa] flex flex-col overflow-hidden">
      {/* Header - Restored Font Sizes */}
      <div className="bg-black text-white py-6 px-4 flex-shrink-0">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
            <div>
              {isAdminView && (
                <Link href="/admin" className="inline-flex items-center text-white/60 hover:text-white mb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-colors">
                  <ArrowLeft size={16} className="mr-2" />
                  Admin Dashboard
                </Link>
              )}
              <p className="text-gold font-black text-[10px] uppercase tracking-[0.3em] mb-2">Guest Tracking for</p>
              <h1 className="text-2xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                {wedding.bride_name} & {wedding.groom_name}
              </h1>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex gap-8">
              <div>
                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Attending</p>
                <p className="text-2xl font-bold">{totalRsvps}</p>
              </div>
              <div className="w-px h-10 bg-white/10 self-center" />
              <div>
                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Declined</p>
                <p className="text-2xl font-bold text-red-300">{totalDeclined}</p>
              </div>
              <div className="w-px h-10 bg-white/10 self-center" />
              <div>
                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Total Guests</p>
                <p className="text-2xl font-bold text-gold">{totalGuests}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Fixed Height with Internal Scroll */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-2 md:px-4 pb-4 overflow-hidden -mt-10">
        <div className="bg-white h-full rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col">
          
          {/* Table Controls */}
          <div className="p-4 md:px-8 md:py-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 flex-shrink-0">
            <div className="relative w-full md:flex-1 md:max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search Guest Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border-transparent border-2 focus:border-gold/20 focus:bg-white rounded-2xl py-2.5 pl-12 pr-4 outline-none transition-all font-medium text-gray-900 text-sm"
              />
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button 
                type="button"
                onClick={() => fetchData(false)}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gold hover:text-gray-900 transition-colors"
                title="Refresh List"
              >
                <Plus size={14} className="rotate-45" />
                Refresh List
              </button>
              <button 
                type="button"
                onClick={exportCSV}
                className="flex items-center gap-2 bg-gray-50 md:bg-transparent px-4 py-2 md:p-0 rounded-xl md:rounded-none text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-black hover:bg-gray-100 md:hover:bg-transparent transition-colors whitespace-nowrap"
              >
                <Download size={14} />
                Export CSV
              </button>
            </div>
          </div>

          {/* Table Area - Scrollable */}
          <div className="flex-1 overflow-y-auto overflow-x-auto overscroll-contain">
            <table className="w-full text-left min-w-[600px] border-collapse">
              <thead className="sticky top-0 bg-white md:bg-gray-50 text-[10px] uppercase text-gray-400 font-black tracking-widest z-20 shadow-sm">
                <tr>
                  <th className="px-8 py-5">Guest Name</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Count</th>
                  <th className="px-8 py-5 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredRsvps.map((rsvp, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={rsvp.id} 
                    className="group hover:bg-gold/[0.02] transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gray-50 flex items-center justify-center font-bold text-gray-400 border border-gray-100 group-hover:border-gold/20 group-hover:text-gold transition-colors">
                           {rsvp.name?.charAt(0).toUpperCase() || "?"}
                         </div>
                         <div>
                            <p className="font-bold text-gray-900">
                              {rsvp.name || "Honored Guest"}
                            </p>
                            {(rsvp.name === "Honored Guest" || !rsvp.name) && (
                              <p className="text-[9px] text-red-400 font-bold uppercase tracking-widest mt-0.5 italic">Anonymous Guest</p>
                            )}
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      {rsvp.is_attending ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-widest">
                          <UserCheck size={12} />
                          Attending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest">
                          <UserMinus size={12} />
                          Declined
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-300" />
                        <span className="font-bold text-gray-700 text-lg">{rsvp.guest_count}</span>
                        <span className="text-gray-400 text-[10px] font-bold uppercase">People</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <p className="text-xs text-gray-500 font-medium">
                        {formatDate(rsvp.created_at, "MMM d")}
                      </p>
                    </td>
                  </motion.tr>
                ))}

                {filteredRsvps.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center text-gray-400">
                      <Users size={48} className="mx-auto mb-4 opacity-10" />
                      <p className="font-bold text-sm uppercase tracking-widest">No RSVPs found yet</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Total - Fixed at Bottom */}
          <div className="bg-gold/5 p-6 md:p-8 border-t border-gold/10 flex justify-between items-center flex-shrink-0">
             <div>
                <p className="text-gold font-black text-[10px] uppercase tracking-widest mb-1">Guest List Total</p>
                <p className="text-gray-500 text-xs">Total number of verified attendees</p>
             </div>
             <div className="text-right flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{totalGuests}</span>
                <span className="text-[10px] font-black text-gold uppercase tracking-tighter">Total Heads</span>
              </div>
          </div>
        </div>
      </div>
      
      {/* Visual Decor */}
      <div className="fixed bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-50 to-transparent -z-10 pointer-events-none" />
    </div>
  );
}
