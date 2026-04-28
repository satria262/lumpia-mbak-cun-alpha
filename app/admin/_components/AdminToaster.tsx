"use client";

import { Toaster } from "sonner";

export function AdminToaster() {
  return (
    <Toaster
      position="top-right"
      richColors
      toastOptions={{
        classNames: {
          toast:
            "border-[#eee8dc] bg-white text-[#211d16] shadow-[0_22px_60px_-32px_rgba(70,52,26,0.62)]",
        },
      }}
    />
  );
}
