import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as React from "react";

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-800",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
