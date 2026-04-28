"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import { AdminIcon } from "../../_components/AdminIcons";
import { deleteTestimonial } from "../actions";

type DeleteTestimonialButtonProps = {
  testimonialId: number;
  userName: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#9a3f1d] px-5 text-sm font-bold text-white transition hover:bg-[#823417] disabled:cursor-not-allowed disabled:opacity-65"
    >
      <AdminIcon name="trash" className="h-4 w-4" />
      {pending ? "Menghapus..." : "Ya, Hapus"}
    </button>
  );
}

export function DeleteTestimonialButton({
  testimonialId,
  userName,
}: DeleteTestimonialButtonProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(deleteTestimonial, {});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  useEffect(() => {
    if (!state.status || !state.message) {
      return;
    }

    if (state.status === "success") {
      toast.success(state.message);
      router.refresh();
      return;
    }

    toast.error(state.message);
  }, [router, state.message, state.status, state.timestamp]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#f0d5c8] bg-[#fff6f1] px-4 text-sm font-bold text-[#9a3f1d] transition hover:bg-[#ffe9dd]"
      >
        <AdminIcon name="trash" className="h-4 w-4" />
        Hapus
      </button>

      <div
        aria-hidden={!isModalOpen}
        className={`fixed inset-0 z-50 grid place-items-center px-4 transition duration-300 ${
          isModalOpen
            ? "pointer-events-auto bg-[#211d16]/45 opacity-100 backdrop-blur-sm"
            : "pointer-events-none bg-[#211d16]/0 opacity-0 backdrop-blur-0"
        }`}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            setIsModalOpen(false);
          }
        }}
      >
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby={`delete-testimonial-${testimonialId}-title`}
          className={`w-full max-w-md rounded-2xl border border-[#f0d5c8] bg-white p-6 shadow-[0_24px_80px_-38px_rgba(70,52,26,0.55)] transition duration-300 ${
            isModalOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-3 scale-95 opacity-0"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#fff6f1] text-[#9a3f1d]">
              <AdminIcon name="trash" className="h-5 w-5" />
            </div>
            <div>
              <h2
                id={`delete-testimonial-${testimonialId}-title`}
                className="font-[var(--font-noto-serif)] text-xl font-semibold text-[#211d16]"
              >
                Hapus testimoni?
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#6f6a5c]">
                Testimoni dari{" "}
                <span className="font-semibold text-[#211d16]">
                  {userName}
                </span>{" "}
                akan dihapus permanen dari daftar testimoni.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-lg border border-[#e5dfd2] bg-white px-5 text-sm font-bold text-[#575248] transition hover:border-[#92a25f] hover:text-[#526b2d]"
            >
              Batal
            </button>
            <form
              action={formAction}
              className="flex flex-1"
              onSubmit={() => setIsModalOpen(false)}
            >
              <input
                type="hidden"
                name="testimonialId"
                value={testimonialId}
              />
              <SubmitButton />
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
