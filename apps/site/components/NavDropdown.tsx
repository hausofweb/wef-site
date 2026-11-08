import type { Page } from "../types";
import NavLink from "./NavLink";

interface Props {
  active: string;
  links: Page;
}

const NavDropdown: React.FC<Props> = ({ links, active }) => (
  <div className="nav-item dropdown">
    <a
      className="nav-link dropdown-toggle"
      href="#"
      id="navbarDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {links.name}
    </a>
    <ul
      className="dropdown-menu bg-light text-decoration-none border-0"
      aria-labelledby="navbarDropdown"
    >
      {links.sublinks.map((sublink, index) => (
        <li key={index}>
          <NavLink
            title={sublink.name || ""}
            route={sublink.link || ""}
            active={active}
            classes="ps-2"
          />
        </li>
      ))}
    </ul>
  </div>
);

export default NavDropdown;
