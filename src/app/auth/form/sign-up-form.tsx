import { Button } from "@/components/ui/buttons";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRightIcon,
  EyeClosedIcon,
  EyeIcon,
  GoogleLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

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
    watch,
    trigger,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword((state) => !state);
  }

  const passwordValue = watch("password");

  useEffect(() => {
    if (passwordValue) {
      trigger("confirmPassword");
    }
  }, [passwordValue, trigger]);

  function onSubmit(data: SignUpFormData) {
    console.log(data);
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
        <div className="flex flex-col gap-2 leading-none">
          <label htmlFor="confirm-password">Confirme sua senha</label>
          <Input
            {...register("confirmPassword")}
            placeholder="********"
            id="confirm-password"
            type="password"
          />
          {errors.confirmPassword && (
            <span className="text-sm text-rose-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <Button className="w-full" variant="dark">
          Cadastrar <ArrowRightIcon size={20} />
        </Button>
      </div>

      <div className="flex items-center gap-4 py-2 opacity-40">
        <Separator />
        <span>ou</span>
        <Separator />
      </div>

      <Button type="button" variant="outline" className="w-full">
        <GoogleLogoIcon size={20} />
        Cadastrar com google
      </Button>
    </form>
  );
}
