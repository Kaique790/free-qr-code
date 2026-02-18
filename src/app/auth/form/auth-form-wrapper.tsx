import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AuthFormProps {
  signUpMode: boolean;
  children: ReactNode;
}

export function AuthFormWrapper({ signUpMode, children }: AuthFormProps) {
  return (
    <div
      className={cn(
        "bg-gray-light/30 border-gray-light left-1/2 h-full min-h-full space-y-6 rounded-lg border-t px-8 py-8 transition-all duration-300 md:absolute md:w-1/2 md:flex-1 md:border-t-0 md:border-l",
        signUpMode && "left-0 md:border-r md:border-l-0",
      )}
    >
      {children}
    </div>
  );
}
