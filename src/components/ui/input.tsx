import { cn } from "@/lib/utils";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn("rounded-md border px-4 py-2 outline-none", className)}
      type="text"
    />
  );
}
