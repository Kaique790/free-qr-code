import { NavLink } from "./nav-link";

export function Navigation() {
  return (
    <nav className="w-full">
      <ul className="bg-dark flex w-full items-center justify-between rounded-md p-4">
        <li>
          <NavLink href="">Gerar</NavLink>
        </li>
        <li>
          <NavLink href="">Meus</NavLink>
        </li>
        <li>
          <NavLink href="">Contato</NavLink>
        </li>
        <li>
          <NavLink href="">GitHub</NavLink>
        </li>
      </ul>
    </nav>
  );
}
