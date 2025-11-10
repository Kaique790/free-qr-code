import Image from "next/image";

import logo from "../assets/images/logo.svg";
import { Button } from "./ui/buttons";
import { Navigation } from "./navigation";

export function MdHeader() {
  return (
    <header className="mx-auto hidden max-w-[1220px] items-center justify-between gap-6 px-8 pt-4 min-[800px]:flex">
      <div>
        <Image className="w-12" src={logo} width={64} height={64} alt="" />
      </div>

      <Navigation />

      <div className="flex gap-4">
        <Button className="w-24 max-w-full" variant="outline">
          Login
        </Button>
        <Button className="w-32 max-w-full">Criar conta</Button>
      </div>
    </header>
  );
}
