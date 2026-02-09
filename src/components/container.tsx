import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <div className={cn("mx-auto mt-12 max-w-[1220px] px-8", className)}>
      {children}
    </div>
  );
}
