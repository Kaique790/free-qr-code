"use client";

import { ProfileMenu } from "@/components/profile-menu";
import { SessionProvider } from "next-auth/react";

export default function Generate() {
  return (
    <div className="mx-auto mt-12 max-w-[1220px] px-8">
      <h1>Hello</h1>
      <SessionProvider>
        <ProfileMenu />
      </SessionProvider>
    </div>
  );
}
