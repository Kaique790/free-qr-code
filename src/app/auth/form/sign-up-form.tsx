import { Button } from "@/components/ui/buttons";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRightIcon,
  EyeClosedIcon,
  EyeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { GoogleBtn } from "./google-btn";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const signUpFormSchema = z
  .object({
    email: z.email("Digite um e-mail válido!"),
    password: z.string().min(8, "A senha precisa de pelo 8 menos dígitos!"),
    confirmPassword: z.string(),
  })
  .refine((fields) => fields.confirmPassword === fields.password, {
    message: "As senhas não são iguais!",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpFormSchema>;

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function toggleShowPassword() {
    setShowPassword((state) => !state);
  }

  const passwordValue = useWatch({
    control,
    name: "password",
  });

  useEffect(() => {
    if (passwordValue) {
      trigger("confirmPassword");
    }
  }, [passwordValue, trigger]);

  async function onSubmit(data: SignUpFormData) {
    setIsLoading(true);
    try {
      await api.post("/auth/sign-up", {
        email: data.email,
        password: data.password,
      });

      alert("Usuário cadastrado com sucesso!");
    } catch (err) {
      if (isAxiosError(err)) {
        switch (err.response?.status) {
          case 400:
            toast.error("Você já tem uma conta", {
              action: {
                label: "Fazer login",
                onClick: () => router.push("auth"),
              },
            });
            break;
          default:
            toast.error("Erro inesperado (tente novamente mais tarde).");
        }

        return;
      }

      toast.error("Erro inesperado (tente novamente mais tarde).");
    } finally {
      setIsLoading(false);
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
            className={cn("w-full", errors.email && "border-rose-500")}
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
              className={cn("w-full", errors.password && "border-rose-500")}
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
        <div className="flex flex-col gap-2 leading-none">
          <label htmlFor="confirm-password">Confirme sua senha</label>
          <Input
            {...register("confirmPassword")}
            placeholder="********"
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            className={cn(
              "w-full",
              errors.confirmPassword && "border-rose-500",
            )}
          />
          {errors.confirmPassword && (
            <span className="text-sm text-rose-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <Button disabled={isLoading} className="w-full" variant="dark">
          {isLoading ? (
            <>Aguarde</>
          ) : (
            <>
              Cadastrar <ArrowRightIcon size={20} />
            </>
          )}
        </Button>
      </div>

      <div className="flex items-center gap-4 py-2 opacity-40">
        <Separator />
        <span>ou</span>
        <Separator />
      </div>

      <GoogleBtn />
    </form>
  );
}
