import type { ComponentType } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth";

type QuickCard = {
  to: string;
  title: string;
  description: string;
  action: string;
  tone: "peach" | "gold" | "taupe";
  Icon: ComponentType<{ className?: string }>;
};

const quickAccess: QuickCard[] = [
  {
    to: "/community",
    title: "Community",
    description: "Circles and members who understand the solo stretch.",
    action: "Enter community",
    tone: "peach",
    Icon: CommunityIcon,
  },
  {
    to: "/resources",
    title: "Resources",
    description: "Guides, checklists, and calm packing rituals.",
    action: "Browse resources",
    tone: "gold",
    Icon: ResourcesIcon,
  },
  {
    to: "/toolkit",
    title: "Toolkit",
    description: "Daily anchors for independence with support nearby.",
    action: "Open toolkit",
    tone: "taupe",
    Icon: ToolkitIcon,
  },
];

const navLinks = [
  { to: "/community", label: "Community" },
  { to: "/resources", label: "Resources" },
  { to: "/events", label: "Events" },
  { to: "/profile", label: "Profile" },
] as const;

export function Home() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "friend";

  return (
    <div className="home-page">
      <header className="home-topnav">
        <div className="container home-topnav__inner">
          <Link to="/" className="home-logo" aria-label="GoSolo home">
            <span className="home-logo__mark" aria-hidden="true">
              <span className="home-logo__sun" />
              <span className="home-logo__path" />
            </span>
            <span className="home-logo__text">
              Go<span>Solo</span>
            </span>
          </Link>

          <nav className="home-nav" aria-label="Home primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `home-nav__link${isActive ? " is-active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <section className="home-hero" aria-label="GoSolo home hero">
        <div className="home-hero__media" aria-hidden="true">
          <div className="home-hero__horizon" />
          <div className="home-hero__sun" />
          <div className="home-hero__glow" />
          <div className="home-hero__path" />
        </div>

        <div className="container home-hero__content">
          <p className="home-hero__brand">GoSolo</p>
          <p className="home-hero__welcome">Welcome home, {firstName}</p>
          <h1 className="home-hero__tagline">Go solo, not alone</h1>
          <p className="home-hero__lede">
            Your calm base for independent travel — connect, learn, and show up
            when you want company.
          </p>
          <div className="home-hero__ctas">
            <a className="home-btn home-btn--primary" href="#quick-access">
              Explore quick access
            </a>
            <Link className="home-btn home-btn--secondary" to="/community">
              Meet the community
            </Link>
          </div>
        </div>
      </section>

      <div className="home-hero__curve" aria-hidden="true" />

      <section
        id="quick-access"
        className="container home-quick"
        aria-labelledby="quick-access-heading"
      >
        <header className="home-quick__header">
          <h2 id="quick-access-heading">Quick access</h2>
          <p>Three warm doorways into the GoSolo experience.</p>
        </header>

        <div className="home-quick__grid">
          {quickAccess.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className="home-card-link"
              style={{ animationDelay: `${0.1 + index * 0.08}s` }}
            >
              <article className="home-card" data-tone={item.tone}>
                <span className="home-card__icon" aria-hidden="true">
                  <item.Icon />
                </span>
                <div className="home-card__copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <span className="home-card__action">
                  {item.action}
                  <span aria-hidden="true">→</span>
                </span>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function CommunityIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <circle
        cx="9"
        cy="9"
        r="3.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="16.4"
        cy="10"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4.4 18.6c.9-2.7 2.9-4.1 4.6-4.1s3.7 1.4 4.6 4.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13.7 18.6c.5-1.8 1.8-2.8 2.7-2.8 1.2 0 2.4.9 3 2.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ResourcesIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <path
        d="M6.5 5.5h8.2A2.8 2.8 0 0 1 17.5 8.3v10.4L12.4 16 7.2 18.7V8.3A2.8 2.8 0 0 1 10 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M10 5.5V4.7A1.7 1.7 0 0 1 11.7 3h.6A1.7 1.7 0 0 1 14 4.7v.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ToolkitIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <rect
        x="4.5"
        y="7"
        width="15"
        height="11.5"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 7V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8V7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4.5 12h15M12 12v6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Home;
