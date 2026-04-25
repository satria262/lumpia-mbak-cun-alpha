"use client";

import { useActionState } from "react";

import { loginAdmin, type LoginFormState } from "./actions";

const initialLoginState: LoginFormState = {
  email: "",
  error: "",
};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAdmin,
    initialLoginState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#6a6454]"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={state.email}
          placeholder="Masukan email admin"
          className="w-full rounded-2xl border border-[#d8cfb5] bg-white px-4 py-3 text-sm text-[#2f2b24] outline-none transition focus:border-[#FCDC31] focus:ring-4 focus:ring-[#FCDC31]/20"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#6a6454]"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Masukan password admin"
          className="w-full rounded-2xl border border-[#d8cfb5] bg-white px-4 py-3 text-sm text-[#2f2b24] outline-none transition focus:border-[#FCDC31] focus:ring-4 focus:ring-[#FCDC31]/20"
          required
        />
      </div>

      {state.error ? (
        <p className="rounded-2xl border border-[#e5c8c2] bg-[#fff4f1] px-4 py-3 text-sm text-[#9a4c43]">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-2xl bg-[#55623d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#465133] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Signing in..." : "Masuk"}
      </button>
    </form>
  );
}
