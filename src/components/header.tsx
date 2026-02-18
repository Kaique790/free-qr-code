import Image from "next/image";

import logo from "../assets/images/logo.svg";
import { Navigation } from "./navigation";
import Link from "next/link";
import { Profile } from "./profile";

export function Header() {
  return (
    <div className="bg-gray-1 border-gray-2 border-b">
      <header className="mx-auto grid h-full w-full max-w-[1200px] grid-rows-[auto_auto] items-center justify-between min-[800px]:flex">
        <Link
          href="/"
          className="border-gray-2 row-1 w-fit border-r pl-8 xl:pl-0"
        >
          <div className="max-w-[66px] py-6 pr-8">
            <Image
              className="max-h-[50px] duration-300 hover:rotate-90"
              src={logo}
              width={64}
              height={64}
              alt=""
            />
          </div>
        </Link>

        <Navigation />

        <Profile />
      </header>
    </div>
  );
}
