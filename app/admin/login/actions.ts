"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";

export type LoginFormState = {
  email: string;
  error: string;
};

export async function loginAdmin(
  _previousState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      email,
      error: "Email and password are required.",
    };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return {
      email,
      error: "Please enter a valid email address.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return {
          email,
          error: "Incorrect email or password.",
        };
      }

      return {
        email,
        error: "Unable to sign in right now. Please try again.",
      };
    }

    throw error;
  }

  return {
    email: "",
    error: "",
  };
}
