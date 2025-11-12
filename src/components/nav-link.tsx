"use client";

import Link, { LinkProps } from "next/link";
// import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> &
  Omit<LinkProps, "href"> & {
    href: LinkProps["href"];
    className?: string;
  };

export function NavLink({ children, className, ...props }: NavLinkProps) {
  //   const pathname = usePathname();
  //   const isActive = pathname === href;

  return (
    <Link
      {...props}
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
