import { NavLink } from "./nav-link";

export function Navigation() {
  return (
    <nav className="text-dark col-span-2 row-2">
      <ul className="border-gray-2 flex h-fit w-full items-center justify-between rounded-md border-t px-8 md:gap-4 md:border-t-0">
        <NavLink href="/generate">Gerar</NavLink>
        <NavLink href="">Meus</NavLink>
        <NavLink href="">Contato</NavLink>
        <NavLink href="https://github.com/kaique790" target="_blank">
          GitHub
        </NavLink>
      </ul>
    </nav>
  );
}
