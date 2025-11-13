import { cn } from "@/lib/utils";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      {...props}
      type={type}
      className={cn("rounded-md border px-4 py-2 outline-none", className)}
    />
  );
}
