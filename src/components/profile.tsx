"use client";

import Link from "next/link";
import { Button } from "./ui/buttons";
import { useSession } from "next-auth/react";
import { ProfileMenu } from "./profile-menu";

export function Profile() {
  const session = useSession();

  return session.data ? (
    <div className="flex justify-end pr-8">
      <ProfileMenu />
    </div>
  ) : (
    <div className="row-1 flex gap-4 pr-8">
      <Button className="w-24 max-w-full" size="sm" variant="outline" asChild>
        <Link href="/auth">Login</Link>
      </Button>
      <Button className="w-32 max-w-full" size="sm" asChild>
        <Link href="/auth?signupmode=true">Criar conta</Link>
      </Button>
    </div>
  );
}
