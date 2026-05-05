"use client";

import { useState } from "react";

/**
 * PinkPantherBackground
 * 
 * Renders a full-screen looping video of the Pink Panther.
 * Includes robust error handling and fallback support.
 */
export function PinkPantherBackground({ bgColor = "#FF8DA1" }: { bgColor?: string }) {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ backgroundColor: bgColor }}>
      {/* Base Background Color Layer */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: bgColor }} />

      {/* 
        Native Video Background for Real Frame-by-Frame Animation
        Requires pink_panther_run.webm in /public folder
      */}
      {!videoError && (
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => console.log("Video background initialized successfully.")}
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover z-10"
        >
          <source src="/pink_panther_run.webm" type="video/webm" />
        </video>
      )}

      {/* 
        High-Quality 3D Fallback
        Automatically visible if the video file is missing or fails to load.
      */}
      <img 
        src="/pink_panther_realistic_run.png?v=3" 
        alt="Pink Panther Background" 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoError ? 'opacity-30 z-20' : 'opacity-0 z-0'}`}
      />
      
      {/* Cinematic Vignette & Noise for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.15)_100%)] z-30 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none z-30" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
}
