import { NavLink, useLocation } from "react-router-dom";

export default function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const { pathname } = useLocation();

  return (
    <li className={pathname === href ? "active" : ""}>
      <NavLink className="subtitle2" to={href}>
        {children}
      </NavLink>
    </li>
  );
}
