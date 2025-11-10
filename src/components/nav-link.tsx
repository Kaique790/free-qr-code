"use client";

import Link from "next/link";
// import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  //   const pathname = usePathname();
  //   const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "hover:bg-primary/40 rounded-md px-3 py-2 text-white transition-colors",
        // isActive ? "text-greenPrimary font-semibold" : "text-whiteCustom",
        className,
      )}
    >
      {children}
    </Link>
  );
}
