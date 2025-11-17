import { Button } from "@/components/ui/buttons";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRightIcon,
  EyeClosedIcon,
  EyeIcon,
} from "@phosphor-icons/react/dist/ssr";

import Link from "next/link";
import { useState } from "react";
import { GoogleBtn } from "./google-btn";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  function toggleShowPassword() {
    setShowPassword((state) => !state);
  }

  return (
    <form className="space-y-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email leading-none">Email</label>
          <Input placeholder="ex: meuemail@gmail.com" id="email" type="email" />
        </div>
        <div className="relative overflow-hidden">
          <Input
            placeholder="********"
            id="password"
            type={showPassword ? "text" : "password"}
            className="w-full"
          />
          <Button
            onClick={toggleShowPassword}
            variant={showPassword ? "outline" : "dark"}
            type="button"
            className="absolute top-0 right-0 flex h-full w-fit items-center gap-2 text-sm"
          >
            {showPassword ? <EyeIcon size={20} /> : <EyeClosedIcon size={20} />}
          </Button>
        </div>
        <Button className="w-full" variant="dark">
          Entrar <ArrowRightIcon size={20} />
        </Button>
      </div>

      <div className="flex items-center gap-4 py-2 opacity-40">
        <Separator />
        <span>ou</span>
        <Separator />
      </div>

      <GoogleBtn />

      <Separator className="w-[100px] opacity-40" />

      <Link href="" className="mx-auto flex w-fit underline">
        Esqueci minha senha
      </Link>
    </form>
  );
}
