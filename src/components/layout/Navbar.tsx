import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const links = [
  { to: "/community", label: "Community" },
  { to: "/resources", label: "Resources" },
  { to: "/events", label: "Events" },
  { to: "/profile", label: "Profile" },
] as const;

export function Navbar() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.brand} end aria-label="GoSolo home">
          <span className={styles.logoMark} aria-hidden="true">
            <span className={styles.logoSun} />
            <span className={styles.logoPath} />
          </span>
          <span className={styles.brandName}>
            Go<span className={styles.brandAccent}>Solo</span>
          </span>
        </NavLink>

        <nav className={styles.nav} aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`.trim()
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
