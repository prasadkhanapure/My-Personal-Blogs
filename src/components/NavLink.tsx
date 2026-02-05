import { Link, useLocation } from "react-router-dom";

type NavLinkProps = { to: string; children: React.ReactNode };

const NavLink = ({ to, children }: NavLinkProps) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`px-2 py-1 rounded ${active ? "font-semibold underline" : ""}`}
    >
      {children}
    </Link>
  );
};
