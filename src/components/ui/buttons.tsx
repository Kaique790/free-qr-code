import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "dark" | "white";
}

export function Button({
  variant = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "px-4 py-1 rounded-md transition-all flex items-center justify-center gap-2 duration-200 cursor-pointer active:scale-95";

  const variants = {
    default: "bg-primary text-dark hover:brightness-90",
    outline:
      "border border-black text-black bg-transparent hover:bg-black hover:text-white",
    dark: "bg-dark text-white hover:opacity-80",
    white: "bg-white text-black hover:brightness-90",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
