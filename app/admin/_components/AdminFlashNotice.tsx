"use client";

import type { AdminFlash } from "@/lib/admin-flash-shared";

type AdminFlashNoticeProps = {
  flash: AdminFlash | null;
};

export function AdminFlashNotice({ flash }: AdminFlashNoticeProps) {
  if (!flash) {
    return null;
  }

  const isSuccess = flash.type === "success";

  return (
    <div
      role="status"
      className={`fixed right-5 top-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm rounded-xl border px-4 py-3 text-sm font-medium shadow-[0_22px_60px_-32px_rgba(70,52,26,0.62)] md:right-8 md:top-8 ${
        isSuccess
          ? "border-[#d8e6c0] bg-[#f6faee] text-[#526b2d]"
          : "border-[#f0d5c8] bg-[#fff6f1] text-[#9a3f1d]"
      }`}
    >
      {flash.message}
    </div>
  );
}
