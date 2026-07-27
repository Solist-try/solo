import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const links = [
  { to: "/", label: "Home", end: true, mobile: false },
  { to: "/community", label: "Community", mobile: false },
  { to: "/resources", label: "Resources", mobile: false },
  { to: "/events", label: "Events", mobile: false },
  { to: "/toolkit", label: "Toolkit", mobile: true },
  { to: "/profile", label: "Profile", mobile: false },
  { to: "/settings", label: "Settings", mobile: true },
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
                  link.mobile ? styles.mobileVisible : styles.desktopOnly,
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
