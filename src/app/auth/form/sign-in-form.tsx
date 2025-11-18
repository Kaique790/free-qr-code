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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.email("Digite um e-mail válido"),
  password: z.string().min(8, "A senha contém no mínino 8 digitos."),
});

type SignInFormData = z.infer<typeof formSchema>;

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(formSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword((state) => !state);
  }

  async function onSubmit(data: SignInFormData) {
    try {
      signIn("credentials", {
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      console.error(err);
      alert("Erro inesperado, tente novamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email leading-none">Email</label>
          <Input
            {...register("email")}
            placeholder="ex: meuemail@gmail.com"
            id="email"
            type="email"
          />
          {errors.email && (
            <span className="text-sm text-rose-500">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 leading-none">
          <label htmlFor="password">Senha</label>
          <div className="relative overflow-hidden">
            <Input
              {...register("password")}
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
              {showPassword ? (
                <EyeIcon size={20} />
              ) : (
                <EyeClosedIcon size={20} />
              )}
            </Button>
          </div>
          {errors.password && (
            <span className="text-sm text-rose-500">
              {errors.password.message}
            </span>
          )}
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
