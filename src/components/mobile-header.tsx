import Image from "next/image";
import Link from "next/link";

import logo from "../assets/images/logo.svg";
import { Button } from "./ui/buttons";
import { Navigation } from "./navigation";

export function MobileHeader() {
  return (
    <header className="flex flex-col gap-6 px-8 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <Image className="w-12" src={logo} width={64} height={64} alt="" />
        </div>

        <div className="flex gap-4">
          <Button className="w-24 max-w-full" variant="outline">
            Login
          </Button>
          <Button className="w-32 max-w-full">Criar conta</Button>
        </div>
      </div>

      <Navigation />
    </header>
  );
}
