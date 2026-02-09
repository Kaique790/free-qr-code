import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "dark" | "white";
  size?: "sm" | "default";
  asChild?: boolean;
}

export function Button({
  variant = "default",
  size = "default",
  asChild = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const base =
    "px-4 rounded-md disabled:opacity-50 transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2 duration-200 cursor-pointer not-disabled:active:scale-95";

  const variants = {
    default: "bg-primary text-dark not-disabled:hover:brightness-90",
    outline:
      "border border-black text-black bg-transparent not-disabled:hover:bg-black not-disabled:hover:text-white",
    dark: "bg-dark text-white not-disabled:hover:opacity-80",
    white: "bg-white text-black not-disabled:hover:brightness-90",
  };

  const sizes = {
    sm: "py-1",
    default: "py-2",
  };

  return (
    <Comp
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
