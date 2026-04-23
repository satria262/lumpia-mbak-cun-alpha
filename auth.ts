import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (!email || !password) {
          return null;
        }

        const admin = await prisma.admin.findUnique({
          where: { email },
        });

        if (!admin) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(password, admin.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: admin.id,
          email: admin.email,
          role: admin.role,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isAdminRoute = pathname.startsWith("/admin");
      const isLoginRoute = pathname === "/admin/login";
      const isAuthenticated = !!auth?.user;

      if (!isAdminRoute) {
        return true;
      }

      if (isLoginRoute && isAuthenticated) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }

      if (!isLoginRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.id === "string" ? token.id : "";
        session.user.email =
          typeof token.email === "string" ? token.email : session.user.email ?? "";
        session.user.role = typeof token.role === "string" ? token.role : "admin";
      }

      return session;
    },
  },
});
