import { NavLink } from "react-router-dom";
import styles from "./BottomNav.module.css";

const items = [
  { to: "/", label: "Home", end: true, icon: "home" },
  { to: "/community", label: "Community", icon: "community" },
  { to: "/resources", label: "Resources", icon: "resources" },
  { to: "/events", label: "Events", icon: "events" },
  { to: "/profile", label: "Profile", icon: "profile" },
] as const;

type IconName = (typeof items)[number]["icon"];

export function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="Bottom">
      <div className={styles.inner}>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={"end" in item ? item.end : false}
            className={({ isActive }) =>
              `${styles.item} ${isActive ? styles.active : ""}`.trim()
            }
          >
            {({ isActive }) => (
              <>
                <span className={styles.iconWell} aria-hidden="true">
                  <NavIcon name={item.icon} active={isActive} />
                </span>
                <span className={styles.label}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

function NavIcon({ name, active }: { name: IconName; active: boolean }) {
  const stroke = active ? 2 : 1.7;

  switch (name) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path
            d="M4.5 10.5 12 4.5l7.5 6V19a1.5 1.5 0 0 1-1.5 1.5h-4.2v-5.2h-3.6v5.2H6A1.5 1.5 0 0 1 4.5 19v-8.5Z"
            fill={active ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
    case "community":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20">
          <circle
            cx="9"
            cy="9"
            r="3"
            fill={active ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={stroke}
          />
          <circle
            cx="16.5"
            cy="10"
            r="2.4"
            fill={active ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={stroke}
          />
          <path
            d="M4.5 18.5c.8-2.6 2.8-4 4.5-4s3.7 1.4 4.5 4"
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <path
            d="M13.8 18.5c.5-1.7 1.7-2.7 2.7-2.7 1.2 0 2.3.9 2.9 2.7"
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
        </svg>
      );
    case "resources":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path
            d="M7 5.5h8.5A2.5 2.5 0 0 1 18 8v11.2L12.8 16.5 7.5 19.2V8A2.5 2.5 0 0 1 10 5.5"
            fill={active ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M10 5.5V4.8A1.8 1.8 0 0 1 11.8 3h.4A1.8 1.8 0 0 1 14 4.8v.7"
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
        </svg>
      );
    case "events":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20">
          <rect
            x="4.5"
            y="6"
            width="15"
            height="13.5"
            rx="3"
            fill={active ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={stroke}
          />
          <path
            d="M8 4.5v3M16 4.5v3M4.5 10.5h15"
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
        </svg>
      );
    case "profile":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20">
          <circle
            cx="12"
            cy="9"
            r="3.2"
            fill={active ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={stroke}
          />
          <path
            d="M6 19c1.2-3.2 3.4-4.8 6-4.8s4.8 1.6 6 4.8"
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
        </svg>
      );
  }
}
