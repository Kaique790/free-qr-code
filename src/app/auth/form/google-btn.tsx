import { GoogleLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/buttons";
import { signIn } from "next-auth/react";

export function GoogleBtn() {
  return (
    <Button
      onClick={() => signIn("google")}
      type="button"
      variant="outline"
      className="w-full"
    >
      <GoogleLogoIcon size={20} />
      Entrar com google
    </Button>
  );
}
