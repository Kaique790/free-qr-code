"use client";

import { SignInIcon, SignOutIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import signInImg from "@/assets/images/sign-in.png";
import signUpImg from "@/assets/images/sign-up.png";

import { useEffect, useEffectEvent, useState } from "react";
import { AuthFormWrapper } from "./form/auth-form-wrapper";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function AuthClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [signUpMode, setSignUpMode] = useState(false);

  const isSignupMode = searchParams.get("signupmode");

  const onSignUpMode = useEffectEvent(() => {
    setSignUpMode(() => !!isSignupMode);
  });

  useEffect(() => {
    onSignUpMode();
  });

  function toggleAuthMode() {
    if (isSignupMode) {
      router.push("/auth");
      return;
    }

    router.push("/auth?signupmode=true");
  }

  return (
    <div className="mx-auto mt-12 min-h-screen max-w-[1000px] overflow-hidden px-8">
      <div className="border-gray-light relative mx-auto flex flex-col justify-between gap-8 rounded-lg border max-md:max-w-[500px] md:h-146 md:flex-row md:overflow-hidden">
        <div
          className={cn(
            "right-1/2 flex min-h-full flex-col items-center justify-between gap-8 py-8 transition-all duration-300 md:absolute md:w-1/2",
            signUpMode && "right-0",
          )}
        >
          {signUpMode ? (
            <div className="text-center">
              <h1 className="text-[2rem] leading-none font-semibold">
                Crie sua conta
              </h1>
              <p className="opacity-60">
                Crie seus QRcodes com sua marca registrada!
              </p>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-[2rem] leading-none font-semibold">
                Entre em sua conta
              </h1>
              <p className="opacity-60">Veja seus QRcodes ou crie mais!</p>
            </div>
          )}

          <Image
            src={signUpMode ? signUpImg : signInImg}
            alt=""
            width={400}
            height={400}
            className="w-[300px]"
          />

          <button
            onClick={toggleAuthMode}
            className="hover:bg-dark/10 flex w-fit cursor-pointer items-center gap-2 rounded-md px-4 py-2 duration-200"
          >
            {signUpMode ? (
              <>
                Já tenho conta <SignInIcon />
              </>
            ) : (
              <>
                Não tenho conta <SignOutIcon />
              </>
            )}
          </button>
        </div>

        <AuthFormWrapper signUpMode={signUpMode} />
      </div>
    </div>
  );
}
