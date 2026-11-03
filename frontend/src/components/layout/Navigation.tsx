import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Ana Sayfa", to: "/", end: true },
  { label: "Etkinlikler", to: "/events", end: false },
  { label: "Yönetim", to: "/admin", end: false },
  { label: "Giriş", to: "/login", end: false },
];

export default function Navigation() {
  return (
    <nav className="site-nav" aria-label="Ana menü">
      {menuItems.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.end}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
