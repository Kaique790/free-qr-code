import Image from "next/image";

import logo from "../assets/images/logo.svg";
import { Button } from "./ui/buttons";
import { Navigation } from "./navigation";
import Link from "next/link";
import { Profile } from "./profile";

export function Header() {
  return (
    <header className="mx-auto grid w-full max-w-[1200px] grid-rows-2 items-center justify-between gap-6 px-8 pt-4 min-[800px]:flex">
      <Link href="/" className="row-1">
        <Image className="w-12" src={logo} width={64} height={64} alt="" />
      </Link>

      <Navigation />

      <Profile />
    </header>
  );
}
