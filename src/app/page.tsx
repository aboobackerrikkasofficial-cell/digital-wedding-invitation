import Link from "next/link";
import { Heart, Sparkles, LayoutDashboard } from "lucide-react";

export default function Home() {
  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-between bg-white px-6 overflow-hidden pt-12 pb-6">
      <div className="max-w-4xl w-full text-center flex flex-col items-center justify-center flex-grow space-y-4 md:space-y-8">
        <div className="space-y-2">
          {/* Top Heart Animation - Extra room added to prevent top clipping */}
          <div className="flex justify-center gap-2 text-gold mb-4 animate-bounce">
            <Heart size={24} className="md:w-[32px] md:h-[32px]" />
            <Heart size={36} className="fill-gold md:w-[48px] md:h-[48px]" />
            <Heart size={24} className="md:w-[32px] md:h-[32px]" />
          </div>
          
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-gray-900 tracking-tighter leading-tight">
            Smart <span className="text-gold">Wedding</span>
          </h1>
          
          <p className="text-sm md:text-lg text-gray-500 max-w-xl mx-auto font-light leading-relaxed px-4">
            Create beautiful, interactive digital invitations for your special day. 
            Manage RSVPs, gallery, and location all in one place.
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center w-full px-4">
          <Link 
            href="/admin" 
            className="group relative inline-flex items-center justify-center px-6 md:px-10 py-3 md:py-5 font-bold text-white transition-all duration-200 bg-black rounded-xl md:rounded-2xl shadow-xl shadow-black/10 text-sm md:text-base hover:scale-[1.02]"
          >
            Go to Admin Dashboard
            <LayoutDashboard className="ml-3" size={18} />
          </Link>
          
          <Link 
            href="/invite/demo" 
            className="group relative inline-flex items-center justify-center px-6 md:px-10 py-3 md:py-5 font-bold text-gray-900 transition-all duration-200 border-2 border-gray-100 rounded-xl md:rounded-2xl hover:bg-gray-50 text-sm md:text-base"
          >
            Preview Demo
            <Sparkles className="ml-3 text-gold" size={18} />
          </Link>
        </div>

        {/* Features Grid - Compressed for single page fit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 text-center pt-4 md:pt-8 w-full">
          <div className="p-2">
            <div className="text-lg md:text-2xl font-bold mb-0 md:mb-1 font-serif text-gray-900">Easy Setup</div>
            <p className="text-gray-600 text-[10px] md:text-sm uppercase tracking-wide font-medium">Minutes to Create</p>
          </div>
          <div className="p-2 border-y md:border-x md:border-y-0 border-gray-50">
            <div className="text-lg md:text-2xl font-bold mb-0 md:mb-1 font-serif text-gray-900">RSVP Tracking</div>
            <p className="text-gray-600 text-[10px] md:text-sm uppercase tracking-wide font-medium">Live Guest List</p>
          </div>
          <div className="p-2">
            <div className="text-lg md:text-2xl font-bold mb-0 md:mb-1 font-serif text-gray-900">Royal Themes</div>
            <p className="text-gray-600 text-[10px] md:text-sm uppercase tracking-wide font-medium">Elite Designs</p>
          </div>
        </div>
      </div>
      
      <footer className="mt-4 text-[9px] md:text-xs text-gray-500 uppercase tracking-[0.4em] font-bold">
        Designed for memorable moments
      </footer>
    </div>
  );
}
