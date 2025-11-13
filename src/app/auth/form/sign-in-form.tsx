import { Button } from "@/components/ui/buttons";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowRightIcon, GoogleLogoIcon } from "@phosphor-icons/react/dist/ssr";

import Link from "next/link";

export function SignInForm() {
  return (
    <form className="space-y-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email leading-none">Email</label>
          <Input placeholder="ex: meuemail@gmail.com" id="email" type="email" />
        </div>
        <div className="flex flex-col gap-2 leading-none">
          <label htmlFor="password">Senha</label>
          <Input placeholder="********" id="password" type="password" />
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

      <Button type="button" variant="outline" className="w-full">
        <GoogleLogoIcon size={20} />
        Entrar com google
      </Button>

      <Separator className="w-[100px] opacity-40" />

      <Link href="" className="mx-auto flex w-fit underline">
        Esqueci minha senha
      </Link>
    </form>
  );
}
