import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";

export const { auth, handlers, signIn } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth",
  },

  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const cred = credentials as { email: string; password: string };

        if (!cred.email || !cred.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: cred.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const matchPassword = await bcrypt.compare(
          String(cred.password),
          user.password,
        );

        if (!matchPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
});
