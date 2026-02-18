"use client";

import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" richColors />
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
}
