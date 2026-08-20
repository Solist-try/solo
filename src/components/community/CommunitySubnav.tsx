import { NavLink } from "react-router-dom";
import { brand } from "../../styles/brand-tokens";
import styles from "./CommunitySubnav.module.css";

const links = [
  { to: "/community", label: "Feed", end: true },
  { to: "/community/buddy", label: "Buddy System", end: false },
  { to: "/community/skill-swap", label: "Skill Swap", end: false },
  { to: "/community/same", label: "SAME", end: false },
] as const;

export function CommunitySubnav() {
  return (
    <nav
      className={styles.subnav}
      aria-label="Community modules"
      style={{
        gap: brand.spacing[8],
        padding: brand.spacing[12],
        borderRadius: brand.radius.lg,
        background: brand.colors.mist,
        boxShadow: brand.shadows.soft,
      }}
    >
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`.trim()
          }
          style={{
            borderRadius: brand.radius.md,
            padding: `${brand.spacing[8]} ${brand.spacing[20]}`,
            fontFamily: brand.typography.body,
            color: brand.colors.charcoal,
          }}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
