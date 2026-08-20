import { NavLink } from "react-router-dom";
import type { CSSProperties } from "react";
import { brand } from "../styles/brand-tokens";
import styles from "./Navbar.module.css";

const links = [
  { to: "/community", label: "Community" },
  { to: "/community/buddy", label: "Buddies" },
  { to: "/community/skill-swap", label: "Skill Swap" },
  { to: "/community/same", label: "SAME" },
  { to: "/resources", label: "Resources" },
  { to: "/events", label: "Events" },
  { to: "/profile", label: "Profile" },
] as const;

export function Navbar() {
  const headerStyle = {
    ["--nav-charcoal" as string]: brand.colors.charcoal,
    ["--nav-sage" as string]: brand.colors.sage,
    ["--nav-mist" as string]: brand.colors.mist,
    ["--nav-clay" as string]: brand.colors.clay,
    ["--nav-radius" as string]: brand.radius.md,
    ["--nav-shadow" as string]: brand.shadows.soft,
    ["--nav-space-8" as string]: brand.spacing[8],
    ["--nav-space-12" as string]: brand.spacing[12],
    ["--nav-space-20" as string]: brand.spacing[20],
    boxShadow: brand.shadows.soft,
    background: `rgba(233, 230, 227, 0.9)`,
  } as CSSProperties;

  return (
    <header className={styles.header} style={headerStyle}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.brand} end aria-label="GoSolo home">
          <span className={styles.logoMark} aria-hidden="true">
            <span className={styles.logoSun} />
            <span className={styles.logoPath} />
          </span>
          <span
            className={styles.brandName}
            style={{
              fontFamily: brand.typography.heading,
              color: brand.colors.charcoal,
            }}
          >
            Go
            <span className={styles.brandAccent} style={{ color: brand.colors.sage }}>
              Solo
            </span>
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
              style={{
                color: brand.colors.charcoal,
                fontFamily: brand.typography.body,
                borderRadius: brand.radius.md,
                padding: `${brand.spacing[8]} ${brand.spacing[12]}`,
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
