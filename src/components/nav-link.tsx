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
    <li
      className={cn(
        "hover:bg-gray-2/30 md:hover:bg-gray-1 w-full transition-all duration-200 md:hover:scale-110",
        // isActive ? "text-greenPrimary font-semibold" : "text-whiteCustom",
        className,
      )}
    >
      <Link {...props} className="flex justify-center px-3 py-4 md:py-2.5">
        {children}
      </Link>
    </li>
  );
}
