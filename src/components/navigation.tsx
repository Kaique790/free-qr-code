import { NavLink } from "./nav-link";

export function Navigation() {
  return (
    <nav className="col-span-2 row-2 w-full min-[800px]:w-fit">
      <ul className="bg-dark flex w-full items-center justify-center gap-3 rounded-md p-4 md:py-2.5">
        <li>
          <NavLink href="/generate">Gerar</NavLink>
        </li>
        <li>
          <NavLink href="">Meus</NavLink>
        </li>
        <li>
          <NavLink href="">Contato</NavLink>
        </li>
        <li>
          <NavLink href="https://github.com/kaique790" target="_blank">
            GitHub
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
