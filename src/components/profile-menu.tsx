import { useSession } from "next-auth/react";

export function ProfileMenu() {
  const session = useSession();

  return (
    <div>
      <div>{JSON.stringify(session)}</div>
    </div>
  );
}
