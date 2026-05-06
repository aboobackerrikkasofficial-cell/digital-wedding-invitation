"use client";

import React from 'react';

const NativeHeader = () => {
  return (
    <div className="bg-[#FFD700] text-black px-4 py-3 flex items-center justify-between shadow-md">
      <div>
        <h1 className="text-lg font-black uppercase tracking-tighter">Wedding Card Manager</h1>
        <p className="text-[10px] font-bold opacity-70 -mt-1 uppercase tracking-widest">Admin Control Panel</p>
      </div>
      <div className="bg-black/10 px-3 py-1 rounded-full">
        <span className="text-[10px] font-black uppercase">App Mode</span>
      </div>
    </div>
  );
};

export default NativeHeader;
