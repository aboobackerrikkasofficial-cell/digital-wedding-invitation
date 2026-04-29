"use client";
// Admin Dashboard for managing wedding invitations and tracking RSVPs

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Calendar, Link as LinkIcon, Download, Trash2, Eye, PlusCircle, Pencil } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { useToast } from "@/components/Toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ weddings: 0, rsvps: 0, guests: 0 });
  const [weddings, setWeddings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const formatDate = (dateString: string, formatStr: string = "MMM d, yyyy") => {
    try {
      if (!dateString) return "Pending";
      return format(new Date(dateString), formatStr);
    } catch (err) {
      console.error("Date formatting error:", err);
      return "Invalid Date";
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: weddingsData, error } = await supabase
        .from("weddings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch stats separately to avoid join issues
      const { data: rsvpsData } = await supabase
        .from("rsvps")
        .select("guest_count, is_attending");

      const totalWeddings = weddingsData?.length || 0;
      let totalRsvps = 0;
      let totalGuests = 0;

      if (rsvpsData) {
        const attending = rsvpsData.filter(r => r.is_attending);
        totalRsvps = attending.length;
        totalGuests = attending.reduce((acc, curr) => acc + (curr.guest_count || 0), 0);
      }

      setStats({ weddings: totalWeddings, rsvps: totalRsvps, guests: totalGuests });
      setWeddings(weddingsData || []);
    } catch (err: any) {
      console.error("Dashboard data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteWedding = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await supabase.from("weddings").delete().eq("id", id);
    await fetchData();
  };

  const copyToClipboard = async (text: string, successMsg: string) => {
    try {
      // Modern approach
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToast(successMsg, "success");
        return;
      }
      
      // Fallback for non-secure contexts (like IP access on mobile)
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        showToast(successMsg, "success");
      } else {
        throw new Error("Copy failed");
      }
    } catch (err) {
      console.error("Copy error:", err);
      showToast("Could not copy link. Please copy it manually.", "error");
    }
  };

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/invite/${slug}`;
    copyToClipboard(url, "Invitation link copied to clipboard!");
  };

  const copyTrackingLink = (slug: string) => {
    const url = `${window.location.origin}/track/${slug}`;
    copyToClipboard(url, "Tracking link copied! Share this with your client.");
  };

  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm">Manage invitations and RSVPs</p>
        </div>
        <Link 
          href="/admin/create" 
          className="bg-black text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center gap-2"
        >
          <PlusCircle size={18} />
          New Invitation
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-500 rounded-xl"><Calendar size={24}/></div>
          <div><p className="text-xs text-gray-500 uppercase font-bold">Weddings</p><p className="text-2xl font-bold text-gray-900">{stats.weddings}</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-pink-50 text-pink-500 rounded-xl"><Users size={24}/></div>
          <div><p className="text-xs text-gray-500 uppercase font-bold">Total RSVPs</p><p className="text-2xl font-bold text-gray-900">{stats.rsvps}</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-500 rounded-xl"><Users size={24}/></div>
          <div><p className="text-xs text-gray-500 uppercase font-bold">Total Guests</p><p className="text-2xl font-bold text-gray-900">{stats.guests}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {/* Responsive Layout: Table on desktop, Cards on mobile */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
              <tr>
                <th className="px-6 py-4 border-b border-gray-100">Names</th>
                <th className="px-6 py-4 border-b border-gray-100">Date</th>
                <th className="px-6 py-4 border-b border-gray-100">Status</th>
                <th className="px-6 py-4 text-right border-b border-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {weddings.map((w) => (
                <tr key={w.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold text-gray-900">{w.bride_name} & {w.groom_name}</div>
                        <div className="text-xs text-gray-400 truncate max-w-[150px]">/{w.slug}</div>
                      </div>
                      <Link 
                        href={`/track/${w.slug}?source=admin`}
                        className="ml-auto text-[10px] font-black bg-gold/10 text-gold px-3 py-1.5 rounded-lg uppercase tracking-widest hover:bg-gold/20 transition-colors"
                      >
                        Track List
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(w.wedding_date)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-green-50 text-green-600">
                      {w.rsvps?.length || 0} RSVPs
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/admin/edit/${w.id}`}
                        className="p-2.5 hover:bg-gray-100 rounded-xl text-blue-600 transition-colors"
                        title="Edit Invitation"
                      >
                        <Pencil size={18}/>
                      </Link>
                      <button 
                        onClick={() => copyLink(w.slug)} 
                        className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors"
                        title="Copy Link"
                      >
                        <LinkIcon size={18}/>
                      </button>
                      <button 
                        onClick={() => copyTrackingLink(w.slug)} 
                        className="p-2.5 hover:bg-gray-100 rounded-xl text-gold transition-colors"
                        title="Copy Tracking Link"
                      >
                        <Users size={18}/>
                      </button>
                      <Link 
                        href={`/invite/${w.slug}`} 
                        className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors"
                        title="View Invitation"
                      >

                        <Eye size={18}/>
                      </Link>
                      <button 
                        onClick={() => deleteWedding(w.id)} 
                        className="p-2.5 hover:bg-red-50 rounded-xl text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden divide-y divide-gray-100">
          {weddings.map((w) => (
            <div key={w.id} className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-gray-900 text-lg">{w.bride_name} & {w.groom_name}</div>
                  <div className="text-xs text-gray-400">/invite/{w.slug}</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-green-50 text-green-600 uppercase tracking-wider">
                  {w.rsvps?.length || 0} RSVPs
                </span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 gap-2">
                <Calendar size={14} className="text-gray-400" />
                {formatDate(w.wedding_date, "MMMM d, yyyy")}
              </div>

              <div className="grid grid-cols-5 gap-2 pt-2">
                <button 
                  onClick={() => copyLink(w.slug)} 
                  className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-2xl text-gray-500 active:bg-gray-100 transition-colors"
                >
                  <LinkIcon size={18}/>
                  <span className="text-[10px] font-bold uppercase">Link</span>
                </button>
                <button 
                  onClick={() => copyTrackingLink(w.slug)} 
                  className="flex flex-col items-center gap-1 p-3 bg-gold/5 rounded-2xl text-gold active:bg-gold/10 transition-colors"
                >
                  <Users size={18}/>
                  <span className="text-[10px] font-bold uppercase">Share</span>
                </button>
                <Link 
                  href={`/admin/edit/${w.id}`} 
                  className="flex flex-col items-center gap-1 p-3 bg-blue-50 rounded-2xl text-blue-600 active:bg-blue-100 transition-colors"
                >
                  <Pencil size={18}/>
                  <span className="text-[10px] font-bold uppercase">Edit</span>
                </Link>
                <Link 
                  href={`/invite/${w.slug}`} 
                  className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-2xl text-gray-400 active:bg-gray-100 transition-colors"
                >

                  <Eye size={18}/>
                  <span className="text-[10px] font-bold uppercase">View</span>
                </Link>
                <button 
                  onClick={() => deleteWedding(w.id)} 
                  className="flex flex-col items-center gap-1 p-3 bg-red-50 rounded-2xl text-red-500 active:bg-red-100 transition-colors"
                >
                  <Trash2 size={18}/>
                  <span className="text-[10px] font-bold uppercase">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {weddings.length === 0 && !loading && (
          <div className="px-6 py-12 text-center text-gray-500">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlusCircle size={32} className="text-gray-200" />
            </div>
            <p className="font-medium">No invitations found.</p>
            <p className="text-sm">Click "New Invitation" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
