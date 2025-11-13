import { Suspense } from "react";
import { AuthClient } from "./auth-client";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingAuth() {
  return (
    <div className="mx-auto mt-12 min-h-screen max-w-[1000px] overflow-hidden px-8">
      <Skeleton className="mx-auto w-full rounded-lg max-md:max-w-[500px] md:h-131.5" />
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<LoadingAuth />}>
      <AuthClient />
    </Suspense>
  );
}
