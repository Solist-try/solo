import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/community", label: "Community" },
  { to: "/resources", label: "Resources" },
  { to: "/events", label: "Events" },
  { to: "/profile", label: "Profile" },
  { to: "/settings", label: "Settings" },
] as const;

export function Navbar() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.brand} end>
          <span className={styles.mark} aria-hidden="true" />
          <span className={styles.brandName}>Go Solo</span>
        </NavLink>

        <nav className={styles.nav} aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={"end" in link ? link.end : false}
              className={({ isActive }) =>
                [
                  styles.link,
                  isActive ? styles.active : "",
                  link.to === "/settings" ? styles.settingsLink : styles.desktopOnly,
                ]
                  .filter(Boolean)
                  .join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
