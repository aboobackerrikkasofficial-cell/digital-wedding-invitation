"use client";

import { MobileScrollFix } from "./MobileScrollFix";
import { SystemTitleBar } from "./SystemTitleBar";
import { ToastProvider } from "./Toast";

export function MobileInitializationWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MobileScrollFix />
      <SystemTitleBar />
      <ToastProvider>
        {children}
      </ToastProvider>
    </>
  );
}
