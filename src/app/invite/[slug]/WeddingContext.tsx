"use client";

import { createContext, useContext, ReactNode } from "react";
import { Wedding } from "@/types/wedding";

interface WeddingContextType {
  wedding: Wedding;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export function WeddingProvider({ children, wedding }: { children: ReactNode; wedding: Wedding }) {
  return (
    <WeddingContext.Provider value={{ wedding }}>
      {children}
    </WeddingContext.Provider>
  );
}

export function useWedding() {
  const context = useContext(WeddingContext);
  if (context === undefined) {
    throw new Error("useWedding must be used within a WeddingProvider");
  }
  return context.wedding;
}
