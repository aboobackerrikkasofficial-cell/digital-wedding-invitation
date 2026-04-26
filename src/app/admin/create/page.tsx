"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { WEDDING_TEMPLATES } from "@/lib/templates";
import { Sparkles, ArrowLeft, PlusCircle, Copy, Check, Calendar, Clock, ChevronDown, MessageCircle } from "lucide-react";
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
export default function CreateWedding() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMessageFocused, setIsMessageFocused] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const slug = formData.slug || `${formData.brideName}-${formData.groomName}`.toLowerCase().replace(/\s+/g, '-');
    const weddingDate = `${formData.date}T${formData.time}:00`;

    const { error: insertError } = await supabase.from("weddings").insert({
      bride_name: formData.brideName,
      groom_name: formData.groomName,
      slug: slug,
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
    });

    if (insertError) {
      if (insertError.code === "23505") {
        showToast(`The Custom Link Suffix "/${slug}" is already taken. Please choose a different link name.`, "error");
      } else {
        showToast(insertError.message, "error");
      }
    } else {
      showToast("Invitation created successfully!", "success");
      router.push("/admin");
    }
    setLoading(false);
  };

  const copySql = () => {
    const sql = `ALTER TABLE weddings ENABLE ROW LEVEL SECURITY;\nCREATE POLICY "Anyone can manage weddings" ON weddings FOR ALL USING (true);`;
    
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(sql);
      showToast("Migration script copied! Run this in Supabase SQL editor.", "info");
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = sql;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        showToast("Migration script copied! Run this in Supabase SQL editor.", "info");
      } catch (err) {
        showToast("Could not copy script. Please copy manually.", "error");
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-[3px] pb-2 px-2 md:px-4 selection:bg-gold/30">
      <div className="mb-4">
        <Link href="/admin" className="inline-flex items-center text-gray-400 hover:text-gray-900 transition-colors font-bold text-sm uppercase tracking-widest">
          <ArrowLeft size={14} className="mr-2" />
          BACK TO DASHBOARD
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: (liquidEase as any) }}
        className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
      >
        {/* Dark Header Section - Balanced Compact */}
        <div className="bg-black p-[1.125rem] md:p-[1.375rem] text-center text-white relative">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-900 rounded-xl border border-white/10 flex items-center justify-center mb-2">
                    <PlusCircle className="text-gold" size={20} />
                </div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold mb-0.5 tracking-tighter">New Invitation</h1>
                <p className="text-white font-black text-[9px] uppercase tracking-[0.2em]">Create a high-end cinematic experience</p>
            </div>
        </div>

        <form onSubmit={handleSave} className="px-5 md:px-12 py-6 md:py-10 space-y-4">

          {/* ROW 1: MESSAGE & MUSIC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-2 border-b border-gray-50">
            {/* 1. PERSONAL MESSAGE */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gold/10 text-gold rounded-lg flex items-center justify-center">
                  <MessageCircle size={18} />
                </div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Personal Message</h3>
              </div>
              <div className="relative group">
                  <input 
                      placeholder="Message (Join us)" 
                      className="w-full py-3 px-4 bg-gray-50 border-2 border-transparent focus:border-gray-100 focus:bg-white rounded-2xl outline-none transition-all text-gray-900 placeholder:text-gray-450 placeholder:text-[12px] placeholder:uppercase placeholder:tracking-widest text-base"
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
                                          setSuggestionIndex(0); // Reset index when selected
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
                                      setSuggestionIndex(0); // Reset on close
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

            {/* 2. BACKGROUND MUSIC */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gold/10 text-gold rounded-lg flex items-center justify-center">
                  <Sparkles size={18} />
                </div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Background Music</h3>
                <span className="ml-auto text-[9px] text-gray-300 font-bold uppercase tracking-widest">MP3 & YouTube</span>
              </div>
              <input placeholder="Music (YouTube Link)" className="w-full py-3 px-4 bg-gray-50 border-2 border-transparent focus:border-gray-100 focus:bg-white rounded-2xl outline-none text-gray-900 transition-all font-medium placeholder:text-[12px] placeholder:text-gray-450 placeholder:uppercase text-base" value={formData.musicUrl} onChange={e => setFormData({...formData, musicUrl: e.target.value})} />
            </section>
          </div>

          {/* PARENT DETAILS SECTION */}
          <div className="bg-gray-50/50 p-6 rounded-[2.5rem] border border-gray-100 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-100 pb-4">
               <div>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Family Details</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Add both sides of the family</p>
               </div>
               {/* Host Selection Toggle */}
               <div className="flex flex-col items-center justify-center space-y-2 min-w-[180px] mt-4 md:mt-0">
                  <p className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Invited By</p>
                  <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, hostSelection: 'bride_side'})}
                      className={cn("px-5 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest", formData.hostSelection === 'bride_side' ? "bg-gold text-white shadow-lg" : "text-gray-400 hover:text-gray-600")}
                    >
                      Bride
                    </button>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, hostSelection: 'groom_side'})}
                      className={cn("px-5 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest", formData.hostSelection === 'groom_side' ? "bg-gold text-white shadow-lg" : "text-gray-400 hover:text-gray-600")}
                    >
                      Groom
                    </button>
                  </div>
               </div>
            </div>

            {/* Parent Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bride's Side */}
              <div className="space-y-4">
                <div className="relative">
                  <p className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-black text-gold uppercase tracking-widest rounded-md border border-gold/10">Bride's Father</p>
                  <input 
                    placeholder="Father's Full Name" 
                    className="w-full py-3 px-4 bg-white border-2 border-transparent rounded-2xl focus:border-gold/20 outline-none text-base font-medium shadow-sm transition-all" 
                    value={formData.brideFatherName} 
                    onChange={e => setFormData({...formData, brideFatherName: e.target.value})} 
                  />
                </div>
                <div className="relative">
                  <p className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-black text-gold uppercase tracking-widest rounded-md border border-gold/10">Bride's Mother</p>
                  <input 
                    placeholder="Mother's Full Name" 
                    className="w-full py-3 px-4 bg-white border-2 border-transparent rounded-2xl focus:border-gold/20 outline-none text-base font-medium shadow-sm transition-all" 
                    value={formData.brideMotherName} 
                    onChange={e => setFormData({...formData, brideMotherName: e.target.value})} 
                  />
                </div>
                <div className="relative">
                  <p className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-black text-gold uppercase tracking-widest rounded-md border border-gold/10">Bride's Place</p>
                  <input 
                    placeholder="E.g. City, Region" 
                    className="w-full py-3 px-4 bg-white border-2 border-transparent rounded-2xl focus:border-gold/20 outline-none text-base font-medium shadow-sm transition-all" 
                    value={formData.bridePlace} 
                    onChange={e => setFormData({...formData, bridePlace: e.target.value})} 
                  />
                </div>
              </div>

              {/* Groom's Side */}
              <div className="space-y-4">
                <div className="relative">
                  <p className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-black text-blue-500 uppercase tracking-widest rounded-md border border-blue-100">Groom's Father</p>
                  <input 
                    placeholder="Father's Full Name" 
                    className="w-full py-3 px-4 bg-white border-2 border-transparent rounded-2xl focus:border-blue-500/20 outline-none text-base font-medium shadow-sm transition-all" 
                    value={formData.groomFatherName} 
                    onChange={e => setFormData({...formData, groomFatherName: e.target.value})} 
                  />
                </div>
                <div className="relative">
                  <p className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-black text-blue-500 uppercase tracking-widest rounded-md border border-blue-100">Groom's Mother</p>
                  <input 
                    placeholder="Mother's Full Name" 
                    className="w-full py-3 px-4 bg-white border-2 border-transparent rounded-2xl focus:border-blue-500/20 outline-none text-base font-medium shadow-sm transition-all" 
                    value={formData.groomMotherName} 
                    onChange={e => setFormData({...formData, groomMotherName: e.target.value})} 
                  />
                </div>
                <div className="relative">
                  <p className="absolute -top-2 left-4 bg-white px-2 text-[8px] font-black text-blue-500 uppercase tracking-widest rounded-md border border-blue-100">Groom's Place</p>
                  <input 
                    placeholder="E.g. City, Region" 
                    className="w-full py-3 px-4 bg-white border-2 border-transparent rounded-2xl focus:border-blue-500/20 outline-none text-base font-medium shadow-sm transition-all" 
                    value={formData.groomPlace} 
                    onChange={e => setFormData({...formData, groomPlace: e.target.value})} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3 COLUMN MAIN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 3. COUPLE */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gold/10 text-gold rounded flex items-center justify-center text-[10px] font-black shadow-sm">3</div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Couple</h3>
              </div>
              <div className="space-y-3">
                <input placeholder="Bride (Sarah)" required className="w-full py-3 px-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-gray-100 outline-none text-gray-900 transition-all font-medium placeholder:text-[12px] placeholder:text-gray-450 placeholder:uppercase" value={formData.brideName} onChange={e => setFormData({...formData, brideName: e.target.value})} />
                <input placeholder="Groom (David)" required className="w-full py-3 px-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-gray-100 outline-none text-gray-900 transition-all font-medium placeholder:text-[12px] placeholder:text-gray-450 placeholder:uppercase" value={formData.groomName} onChange={e => setFormData({...formData, groomName: e.target.value})} />
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-mono text-[10px]">/ link</span>
                  <input placeholder="Link (Slug)" className="w-full py-3 pl-14 pr-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-gray-100 outline-none text-gray-900 font-mono text-xs transition-all placeholder:text-[12px] placeholder:text-gray-450" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
                </div>
              </div>
            </section>

            {/* 4. RECEPTION */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gold/10 text-gold rounded flex items-center justify-center text-[10px] font-black shadow-sm">4</div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Reception</h3>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2">
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gold group-focus-within:opacity-100 opacity-40 transition-opacity z-10 pointer-events-none" size={16} />
                    <input 
                      type="date" 
                      required 
                      className="w-full py-3 pl-11 pr-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-gray-100 outline-none text-gray-900 font-medium text-base md:text-sm" 
                      value={formData.date} 
                      onChange={e => setFormData({...formData, date: e.target.value})} 
                    />
                  </div>
                  <div className="relative group">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold group-focus-within:opacity-100 opacity-40 transition-opacity z-10 pointer-events-none" size={16} />
                    <input type="time" required className="w-full py-3 pl-11 pr-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-gray-100 outline-none text-gray-900 font-medium text-base md:text-sm" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-gold/60 uppercase tracking-widest ml-4 mb-1">Reception Location / Hall</p>
                  <input placeholder="Venue (Hall Name)" required className="w-full py-3 px-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-gray-100 outline-none text-gray-900 transition-all font-medium text-base uppercase" value={formData.venue} onChange={e => setFormData({...formData, venue: e.target.value})} />
                </div>
                <input placeholder="Maps (Google Link)" className="w-full py-3 px-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-gray-100 outline-none text-gray-900 transition-all font-medium text-xs" value={formData.mapsLink} onChange={e => setFormData({...formData, mapsLink: e.target.value})} />
              </div>
            </section>

            {/* 5. NIKAH CEREMONY */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gold/10 text-gold rounded flex items-center justify-center text-[10px] font-black shadow-sm">5</div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Nikah Ceremony</h3>
              </div>
              <div className="space-y-3">
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gold opacity-40 group-focus-within:opacity-100 transition-opacity z-10 pointer-events-none" size={14} />
                  <input 
                    type="date" 
                    className="w-full py-3 pl-11 pr-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-gray-100 outline-none text-gray-900 font-medium text-base" 
                    value={formData.nikahDate} 
                    onChange={e => {
                      const val = e.target.value;
                      let hijri = "";
                      if (val) {
                        try {
                          const [y, m, d] = val.split('-').map(Number);
                          const dateObj = new Date(y, m - 1, d);
                          hijri = new Intl.DateTimeFormat('en-u-ca-islamic-nu-latn', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          }).format(dateObj);
                        } catch (err) {}
                      }
                      setFormData({...formData, nikahDate: val, nikahIslamicDate: hijri});
                    }} 
                  />
                </div>
                <div className="relative group">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold opacity-40 group-focus-within:opacity-100 transition-opacity z-10 pointer-events-none" size={14} />
                  <input 
                    type="time" 
                    className="w-full py-3 pl-11 pr-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-gray-100 outline-none text-gray-900 font-medium text-base" 
                    value={formData.nikahTime} 
                    onChange={e => setFormData({...formData, nikahTime: e.target.value})} 
                  />
                </div>
                <input 
                  placeholder="Islamic (Nikah)" 
                  className="w-full py-3 px-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-gray-100 outline-none text-gray-900 font-medium text-base" 
                  value={formData.nikahIslamicDate} 
                  onChange={e => setFormData({...formData, nikahIslamicDate: e.target.value})} 
                />
                <input 
                  placeholder="Nikah Ceremony Location" 
                  className="w-full py-3 px-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-gray-100 outline-none text-gray-900 font-medium text-base uppercase" 
                  value={formData.nikahLocation} 
                  onChange={e => setFormData({...formData, nikahLocation: e.target.value})} 
                />
              </div>
            </section>

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
          </div>

          {/* Bottom row now empty as music moved to top */}

          <div className="pt-5">
            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gold text-white py-3 px-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-gold/20 transition-all active:scale-[0.98] disabled:bg-gray-100 uppercase tracking-widest"
            >
                {loading ? <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white" /> : (
                  <>
                    <span>Generate Invitation</span>
                    <Sparkles size={32} />
                  </>
                )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
