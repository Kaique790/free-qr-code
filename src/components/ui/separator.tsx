import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Separator({ className }: ButtonProps) {
  return (
    <div className={cn("bg-dark mx-auto h-px w-full max-w-full", className)} />
  );
}
