import { UserIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "./ui/buttons";

export function ProfileMenu() {
  return (
    <Button variant="outline">
      <UserIcon weight="fill" /> Sua conta
    </Button>
  );
}
