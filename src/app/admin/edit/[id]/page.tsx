"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { WEDDING_TEMPLATES } from "@/lib/templates";
import { Sparkles, ArrowLeft, Save, MessageCircle, Calendar, Clock, ChevronDown, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/Toast";

const liquidEase = [0.16, 1, 0.3, 1];

const SUGGESTED_MESSAGES = [
  "We can't wait to celebrate our special day with you!",
  "Joined in love, we invite you to our wedding celebration.",
  "Please join us as we start our new life together.",
  "Your presence will make our wedding truly complete.",
  "Together with our families, we invite you to share in our joy.",
  "A thousand lifetimes wouldn't be enough to love you.",
  "Our journey begins, and we'd love you to be part of it.",
  "Two hearts joining as one on this blessed day.",
  "A celebration of love, laughter, and happily ever after.",
  "The start of our greatest adventure begins with you.",
  "Witness the moment two souls become one.",
  "Love is the master key that opens the gates of happiness.",
  "You are invited to the wedding of the century.",
  "Come and celebrate our union in a night of elegance.",
  "Your smile is our favorite invitation.",
  "The best is yet to come, and it starts with our wedding.",
  "An evening of magic, music, and eternal love.",
  "Blessed with love, we request your presence.",
  "Two lives, two hearts, joined together in friendship.",
  "Hand in hand, we start our forever after.",
  "A cinematic night to remember as we say 'I Do'.",
  "Your friendship has meant the world; join us as we wed.",
  "Love is patient, love is kind, love is us today.",
  "Join us for a beautiful sunset wedding ceremony.",
  "Every love story is beautiful, but ours is our favorite."
];

export default function EditWedding() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isMessageFocused, setIsMessageFocused] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    brideName: "",
    groomName: "",
    date: "",
    time: "",
    venue: "",
    mapsLink: "",
    islamicDate: "",
    message: "",
    template: "default",
    slug: "",
    musicUrl: "",
    brideFatherName: "",
    brideMotherName: "",
    groomFatherName: "",
    groomMotherName: "",
    bridePlace: "",
    groomPlace: "",
    nikahDate: "",
    nikahTime: "",
    nikahLocation: "",
    nikahIslamicDate: "",
    hostSelection: "bride_side", 
  });

  useEffect(() => {
    if (id) {
      fetchWedding();
    }
  }, [id]);

  const fetchWedding = async () => {
    try {
      const { data, error } = await supabase
        .from("weddings")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        // Parse date and time from wedding_date (ISO string)
        const weddingDate = new Date(data.wedding_date);
        const dateStr = weddingDate.toISOString().split('T')[0];
        const timeStr = weddingDate.toTimeString().split(':').slice(0, 2).join(':');

        setFormData({
          brideName: data.bride_name || "",
          groomName: data.groom_name || "",
          date: dateStr,
          time: timeStr,
          venue: data.venue_name || "",
          mapsLink: data.google_maps_url || "",
          islamicDate: data.islamic_date || "",
          message: data.custom_message || "",
          template: data.template_id || "default",
          slug: data.slug || "",
          musicUrl: data.music_url || "",
          brideFatherName: data.bride_father_name || "",
          brideMotherName: data.bride_mother_name || "",
          groomFatherName: data.groom_father_name || "",
          groomMotherName: data.groom_mother_name || "",
          bridePlace: data.bride_place || "",
          groomPlace: data.groom_place || "",
          nikahDate: data.nikah_date || "",
          nikahTime: data.nikah_time || "",
          nikahLocation: data.nikah_location || "",
          nikahIslamicDate: data.nikah_islamic_date || "",
          hostSelection: data.host_selection || "bride_side",
        });
      }
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const weddingDate = `${formData.date}T${formData.time}:00`;

    const { error: updateError } = await supabase
      .from("weddings")
      .update({
        bride_name: formData.brideName,
        groom_name: formData.groomName,
        slug: formData.slug,
        wedding_date: weddingDate,
        venue_name: formData.venue,
        google_maps_url: formData.mapsLink,
        islamic_date: formData.islamicDate,
        custom_message: formData.message,
        template_id: formData.template,
        music_url: formData.musicUrl,
        bride_father_name: formData.brideFatherName,
        bride_mother_name: formData.brideMotherName,
        groom_father_name: formData.groomFatherName,
        groom_mother_name: formData.groomMotherName,
        bride_place: formData.bridePlace,
        groom_place: formData.groomPlace,
        nikah_date: formData.nikahDate || null,
        nikah_time: formData.nikahTime || null,
        nikah_location: formData.nikahLocation,
        nikah_islamic_date: formData.nikahIslamicDate,
        host_selection: formData.hostSelection,
      })
      .eq("id", id);

    if (updateError) {
      if (updateError.code === "23505") {
        showToast(`Link "/${formData.slug}" is taken.`, "error");
      } else {
        showToast(updateError.message, "error");
      }
    } else {
      showToast("Invitation updated successfully!", "success");
      router.push("/admin");
    }
    setSaving(false);
  };

  return (

    <div className="max-w-6xl mx-auto pt-[3px] pb-2 px-2 md:px-4 selection:bg-gold/30">
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gold" />
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden"
        >


        <div className="bg-black p-6 text-center text-white relative">
            <h1 className="text-2xl md:text-3xl font-serif font-bold mb-1">Edit Invitation</h1>
            <p className="text-white/60 text-[9px] uppercase tracking-[0.2em] font-black">Update the details for {formData.brideName} & {formData.groomName}</p>
        </div>

        <form onSubmit={handleUpdate} className="p-5 md:p-12 space-y-6 md:space-y-8">

          {/* BASIC INFO SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-50 pb-8">
            <section className="space-y-4">
               <div className="flex items-center gap-3">
                 <MessageCircle className="text-gold" size={20} />
                 <h3 className="text-sm font-black uppercase tracking-widest">Invitation Message</h3>
               </div>
               <div className="relative">
                  <input 
                      className="w-full py-3.5 px-4 bg-gray-50 border-2 border-transparent focus:border-gray-100 rounded-2xl outline-none text-base"
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      onFocus={() => setIsMessageFocused(true)}
                      required
                  />
                  
                  <AnimatePresence>
                      {isMessageFocused && (
                          <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute z-50 top-full left-0 right-0 mt-4 p-4 bg-white border border-gray-100 rounded-3xl shadow-2xl flex flex-wrap gap-2"
                          >
                              {SUGGESTED_MESSAGES.slice(suggestionIndex, suggestionIndex + 5).map((msg, i) => (
                                  <button
                                      key={i}
                                      type="button"
                                      onClick={() => {
                                          setFormData({...formData, message: msg});
                                          setIsMessageFocused(false);
                                          setSuggestionIndex(0);
                                      }}
                                      className="px-4 py-2 bg-gray-50 hover:bg-gold/10 hover:text-gold rounded-full text-[11px] font-bold transition-all border border-transparent text-left w-full truncate"
                                  >
                                      {msg}
                                  </button>
                              ))}
                              <div className="flex items-center gap-4 ml-auto pt-2 w-full justify-between">
                                <button 
                                    type="button" 
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setSuggestionIndex(prev => (prev + 5) % SUGGESTED_MESSAGES.length);
                                    }}
                                    className="text-[10px] font-black text-gold hover:text-gray-900 uppercase tracking-widest flex items-center gap-1 transition-colors"
                                >
                                    Next AI Suggestions →
                                </button>
                                <div className="flex items-center gap-4 ml-auto">
                                  <div className="w-[1px] h-3 bg-gray-100" />
                                  <button 
                                    type="button" 
                                    onClick={() => {
                                      setIsMessageFocused(false);
                                      setSuggestionIndex(0);
                                    }} 
                                    className="text-[10px] font-black text-gray-400 hover:text-black uppercase tracking-widest"
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                          </motion.div>
                      )}
                  </AnimatePresence>
               </div>
            </section>
            
            <section className="space-y-4">
               <div className="flex items-center gap-3">
                 <Sparkles className="text-gold" size={20} />
                 <h3 className="text-sm font-black uppercase tracking-widest">Music Link</h3>
               </div>
               <input 
                  className="w-full py-3.5 px-4 bg-gray-50 border-2 border-transparent focus:border-gray-100 rounded-2xl outline-none text-base"
                  value={formData.musicUrl} 
                  onChange={e => setFormData({...formData, musicUrl: e.target.value})}
                  placeholder="YouTube or MP3 URL"
              />
            </section>
          </div>

          {/* BRIDE & GROOM SECTION */}
          <div className="bg-gray-50/50 p-8 rounded-[2.5rem] space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
               <h3 className="text-sm font-black uppercase tracking-widest">Couple & Host</h3>
               <div className="flex bg-white p-1 rounded-xl border border-gray-100">
                  {['bride_side', 'groom_side'].map(side => (
                    <button 
                      key={side}
                      type="button"
                      onClick={() => setFormData({...formData, hostSelection: side as any})}
                      className={cn("px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all", formData.hostSelection === side ? "bg-gold text-white shadow-md" : "text-gray-400")}
                    >
                      {side.split('_')[0]}
                    </button>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-4">
                <input placeholder="Bride Name" className="w-full py-3.5 px-4 bg-white rounded-2xl border-2 border-transparent focus:border-gold/20 outline-none font-bold text-base" value={formData.brideName} onChange={e => setFormData({...formData, brideName: e.target.value})} />
                <input placeholder="Father" className="w-full py-3 px-4 bg-white/50 rounded-xl border border-gray-100 outline-none text-base" value={formData.brideFatherName} onChange={e => setFormData({...formData, brideFatherName: e.target.value})} />
                <input placeholder="Mother" className="w-full py-3 px-4 bg-white/50 rounded-xl border border-gray-100 outline-none text-base" value={formData.brideMotherName} onChange={e => setFormData({...formData, brideMotherName: e.target.value})} />
                <input placeholder="Place" className="w-full py-3 px-4 bg-white/50 rounded-xl border border-gray-100 outline-none text-base" value={formData.bridePlace} onChange={e => setFormData({...formData, bridePlace: e.target.value})} />
              </div>
              <div className="space-y-4">
                <input placeholder="Groom Name" className="w-full py-3.5 px-4 bg-white rounded-2xl border-2 border-transparent focus:border-blue-200 outline-none font-bold text-base" value={formData.groomName} onChange={e => setFormData({...formData, groomName: e.target.value})} />
                <input placeholder="Father" className="w-full py-3 px-4 bg-white/50 rounded-xl border border-gray-100 outline-none text-base" value={formData.groomFatherName} onChange={e => setFormData({...formData, groomFatherName: e.target.value})} />
                <input placeholder="Mother" className="w-full py-3 px-4 bg-white/50 rounded-xl border border-gray-100 outline-none text-base" value={formData.groomMotherName} onChange={e => setFormData({...formData, groomMotherName: e.target.value})} />
                <input placeholder="Place" className="w-full py-3 px-4 bg-white/50 rounded-xl border border-gray-100 outline-none text-base" value={formData.groomPlace} onChange={e => setFormData({...formData, groomPlace: e.target.value})} />
              </div>
            </div>
          </div>

          {/* LOGISTICS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section className="space-y-4">
               <h4 className="text-xs font-black uppercase tracking-widest text-gold flex items-center gap-2">
                 <Calendar size={14} /> Reception Details
               </h4>
               <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="w-full py-3 px-3 md:px-4 bg-gray-50 rounded-xl outline-none text-base font-bold" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                  <input type="time" className="w-full py-3 px-3 md:px-4 bg-gray-50 rounded-xl outline-none text-base font-bold" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
               </div>
               <input placeholder="Venue Name" className="w-full py-3 px-4 bg-gray-50 rounded-xl outline-none text-base font-bold uppercase" value={formData.venue} onChange={e => setFormData({...formData, venue: e.target.value})} />
               <input placeholder="Google Maps URL" className="w-full py-3 px-4 bg-gray-50 rounded-xl outline-none text-xs md:text-[10px] font-mono" value={formData.mapsLink} onChange={e => setFormData({...formData, mapsLink: e.target.value})} />
            </section>

            <section className="space-y-4">
               <h4 className="text-xs font-black uppercase tracking-widest text-gold flex items-center gap-2">
                 <Sparkles size={14} /> Nikah Details (Optional)
               </h4>
               <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="w-full py-3 px-3 md:px-4 bg-gray-50 rounded-xl outline-none text-base font-bold" value={formData.nikahDate} onChange={e => setFormData({...formData, nikahDate: e.target.value})} />
                  <input type="time" className="w-full py-3 px-3 md:px-4 bg-gray-50 rounded-xl outline-none text-base font-bold" value={formData.nikahTime} onChange={e => setFormData({...formData, nikahTime: e.target.value})} />
               </div>
               <input placeholder="Nikah Venue" className="w-full py-3 px-4 bg-gray-50 rounded-xl outline-none text-base uppercase" value={formData.nikahLocation} onChange={e => setFormData({...formData, nikahLocation: e.target.value})} />
               <input placeholder="Islamic Date" className="w-full py-3 px-4 bg-gray-50 rounded-xl outline-none text-base" value={formData.nikahIslamicDate} onChange={e => setFormData({...formData, nikahIslamicDate: e.target.value})} />
            </section>
          </div>

          {/* THEME SELECTION SECTION */}
          <div className="bg-gold/5 p-8 rounded-[2.5rem] border border-gold/10">
             <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-gold" size={20} />
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Invitation Theme</h3>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {WEDDING_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, template: template.id })}
                    className={cn(
                      "relative p-4 rounded-2xl border-2 transition-all text-left group",
                      formData.template === template.id 
                        ? "border-gold bg-white shadow-xl shadow-gold/10" 
                        : "border-transparent bg-white/50 hover:border-gray-200"
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className={cn(
                        "text-[10px] font-black uppercase tracking-widest",
                        formData.template === template.id ? "text-gold" : "text-gray-400"
                      )}>
                        {template.name}
                      </p>
                      {formData.template === template.id && (
                        <div className="w-4 h-4 bg-gold rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                    <div className="h-20 bg-gray-100 rounded-lg mb-2 overflow-hidden relative">
                       {template.thumbnail ? (
                         <img 
                           src={template.thumbnail} 
                           alt={template.name} 
                           className="w-full h-full object-cover"
                         />
                       ) : (
                         <>
                           <div className={cn(
                             "absolute inset-0 opacity-40",
                             template.id === 'royal' ? "bg-purple-900" : "bg-gold/20"
                           )} />
                           <div className="absolute inset-0 flex items-center justify-center">
                              <Sparkles className="text-gold/20" size={24} />
                           </div>
                         </>
                       )}
                    </div>
                  </button>
                ))}
             </div>
          </div>

          <div className="pt-10">
            <button 
                type="submit" 
                disabled={saving}
                className="w-full bg-black text-white py-4 px-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-2xl hover:bg-gray-900 transition-all active:scale-[0.98] disabled:bg-gray-200"
            >
                {saving ? "SAVING CHANGES..." : <>SAVE UPDATES <Save size={24} /></>}
            </button>
          </div>
        </form>
      </motion.div>
      )}
    </div>
  );
}

