import { Button } from "@/components/ui/buttons";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, GoogleLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

interface AuthFormProps {
  signUpMode: boolean;
}

export function AuthForm({ signUpMode }: AuthFormProps) {
  return (
    <form
      className={cn(
        "bg-gray-light/30 border-gray-light left-1/2 h-full min-h-full w-1/2 space-y-6 rounded-lg border-t px-4 py-8 transition-all duration-300 md:absolute md:flex-1 md:border-t-0 md:border-l",
        signUpMode && "left-0 border-r md:border-l-0",
      )}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email leading-none">Email</label>
          <Input placeholder="ex: meuemail@gmail.com" id="email" type="email" />
        </div>
        <div className="flex flex-col gap-2 leading-none">
          <label htmlFor="password">Senha</label>
          <Input placeholder="********" id="password" type="password" />
        </div>
        {signUpMode ? (
          <Button className="w-full" variant="dark">
            Cadastrar <ArrowRightIcon size={20} />
          </Button>
        ) : (
          <Button className="w-full" variant="dark">
            Entrar <ArrowRightIcon size={20} />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4 py-2 opacity-40">
        <Separator />
        <span>ou</span>
        <Separator />
      </div>

      {signUpMode ? (
        <Button type="button" variant="outline" className="w-full">
          <GoogleLogoIcon size={20} />
          Cadastrar com google
        </Button>
      ) : (
        <Button type="button" variant="outline" className="w-full">
          <GoogleLogoIcon size={20} />
          Entrar com google
        </Button>
      )}

      <Separator className="w-[100px] opacity-40" />

      <Link href="" className="mx-auto flex w-fit underline">
        Esqueci minha senha
      </Link>
    </form>
  );
}
