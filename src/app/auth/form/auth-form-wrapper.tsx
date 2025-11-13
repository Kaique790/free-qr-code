import { cn } from "@/lib/utils";
import { SignUpForm } from "./sign-up-form";
import { SignInForm } from "./sign-in-form";

interface AuthFormProps {
  signUpMode: boolean;
}

export function AuthFormWrapper({ signUpMode }: AuthFormProps) {
  return (
    <div
      className={cn(
        "bg-gray-light/30 border-gray-light left-1/2 h-full min-h-full space-y-6 rounded-lg border-t px-4 py-8 transition-all duration-300 md:absolute md:w-1/2 md:flex-1 md:border-t-0 md:border-l",
        signUpMode && "left-0 md:border-r md:border-l-0",
      )}
    >
      {signUpMode ? <SignUpForm /> : <SignInForm />}
    </div>
  );
}
