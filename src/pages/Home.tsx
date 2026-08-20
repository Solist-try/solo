import type { ComponentType, CSSProperties } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth";
import { Button } from "../components/ui";
import { brand } from "../styles/brand-tokens";

type QuickCard = {
  to: string;
  title: string;
  description: string;
  action: string;
  Icon: ComponentType<{ className?: string }>;
};

const quickAccess: QuickCard[] = [
  {
    to: "/community",
    title: "Community",
    description: "Circles and members who understand the solo stretch.",
    action: "Enter community",
    Icon: CommunityIcon,
  },
  {
    to: "/community/buddy",
    title: "Buddy",
    description: "Find short-term or long-term company for travel, walks, or meals.",
    action: "Find a buddy",
    Icon: BuddyIcon,
  },
  {
    to: "/community/skill-swap",
    title: "Skill Swap",
    description: "Offer and request languages, cooking, tech help, and more.",
    action: "Open skill swap",
    Icon: SkillSwapIcon,
  },
  {
    to: "/community/same",
    title: "SAME",
    description: "Gentle accountability partners for routines, habits, and goals.",
    action: "Open SAME",
    Icon: SameIcon,
  },
  {
    to: "/resources",
    title: "Resources",
    description: "Guides, checklists, and calm packing rituals.",
    action: "Browse resources",
    Icon: ResourcesIcon,
  },
  {
    to: "/toolkit",
    title: "Toolkit",
    description: "Daily anchors for independence with support nearby.",
    action: "Open toolkit",
    Icon: ToolkitIcon,
  },
];

const navLinks = [
  { to: "/community", label: "Community" },
  { to: "/resources", label: "Resources" },
  { to: "/events", label: "Events" },
  { to: "/profile", label: "Profile" },
] as const;

function firstName(name: string | undefined): string {
  const part = name?.trim().split(/\s+/)[0];
  return part || "Marge";
}

export function Home() {
  const { user } = useAuth();
  const welcomeName = firstName(user?.name);

  const heroStyle = {
    background: brand.gradients.hero,
    ["--home-space-8" as string]: brand.spacing[8],
    ["--home-space-12" as string]: brand.spacing[12],
    ["--home-space-20" as string]: brand.spacing[20],
    ["--home-space-32" as string]: brand.spacing[32],
  } as CSSProperties;

  const headingStyle: CSSProperties = {
    fontFamily: brand.typography.heading,
    color: brand.colors.charcoal,
  };

  const bodyStyle: CSSProperties = {
    fontFamily: brand.typography.body,
    color: brand.colors.charcoalSoft,
  };

  return (
    <div className="home-page">
      <header className="home-topnav">
        <div className="container home-topnav__inner">
          <Link to="/" className="home-logo" aria-label="Go Solo home">
            <span className="home-logo__mark" aria-hidden="true">
              <span className="home-logo__sun" />
              <span className="home-logo__path" />
            </span>
            <span className="home-logo__text" style={headingStyle}>
              Go Solo
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
                style={bodyStyle}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <section
        className="home-banner home-banner--centered"
        aria-label="Go Solo welcome banner"
        style={heroStyle}
      >
        <div className="home-banner__wash" aria-hidden="true">
          <span className="home-banner__blob home-banner__blob--one" />
          <span className="home-banner__blob home-banner__blob--two" />
          <span className="home-banner__arc" />
          <span className="home-banner__sun" />
        </div>

        <div className="container home-banner__content home-banner__content--centered">
          <p className="home-banner__brand" style={headingStyle}>
            Go Solo
          </p>
          <p
            className="home-banner__welcome"
            style={{
              ...bodyStyle,
              marginTop: brand.spacing[12],
            }}
          >
            Welcome home, {welcomeName}
          </p>
          <h1
            className="home-banner__tagline"
            style={{
              ...headingStyle,
              marginTop: brand.spacing[20],
            }}
          >
            Go solo, not alone.
          </h1>
          <p
            className="home-banner__lede"
            style={{
              ...bodyStyle,
              marginTop: brand.spacing[12],
            }}
          >
            A calm space for independent living — connect, learn, and show up
            when you want company.
          </p>
          <div
            className="home-banner__ctas"
            style={{
              marginTop: brand.spacing[32],
              gap: brand.spacing[12],
            }}
          >
            <Button
              variant="primary"
              size="lg"
              className="home-btn home-btn--primary"
              onClick={() => {
                document
                  .getElementById("quick-access")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore quick access
            </Button>
            <Link
              to="/community"
              className="home-btn home-btn--secondary"
              style={{
                background: brand.buttons.secondary.background,
                color: brand.buttons.secondary.color,
                borderRadius: brand.radius.md,
                fontFamily: brand.typography.body,
              }}
            >
              Meet the community
            </Link>
          </div>
          <div
            style={{
              marginTop: brand.spacing[20],
              display: "grid",
              gap: brand.spacing[8],
              justifyItems: "center",
            }}
          >
            <p
              style={{
                ...bodyStyle,
                margin: 0,
                fontSize: "0.95rem",
              }}
            >
              Looking for calm company?
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: brand.spacing[12],
                justifyContent: "center",
              }}
            >
              <Link
                to="/community/buddy"
                className="home-btn home-btn--secondary"
                style={{
                  background: brand.colors.clay,
                  color: brand.colors.charcoal,
                  borderRadius: brand.radius.md,
                  fontFamily: brand.typography.body,
                  boxShadow: brand.shadows.soft,
                }}
              >
                Find Buddy
              </Link>
              <Link
                to="/community/skill-swap"
                className="home-btn home-btn--secondary"
                style={{
                  background: brand.colors.softSummerBlue,
                  color: brand.colors.charcoal,
                  borderRadius: brand.radius.md,
                  fontFamily: brand.typography.body,
                  boxShadow: brand.shadows.soft,
                }}
              >
                Offer a Skill
              </Link>
              <Link
                to="/community/same"
                className="home-btn home-btn--secondary"
                style={{
                  background: brand.colors.sage,
                  color: brand.colors.charcoal,
                  borderRadius: brand.radius.md,
                  fontFamily: brand.typography.body,
                  boxShadow: brand.shadows.soft,
                }}
              >
                Find Accountability Partner
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="home-banner__curve" aria-hidden="true" />

      <section
        id="quick-access"
        className="home-quick"
        aria-labelledby="quick-access-heading"
        style={{ paddingBlock: brand.spacing[32] }}
      >
        <div
          className="container home-quick__inner"
          style={{ gap: brand.spacing[32] }}
        >
          <header
            className="home-quick__header"
            style={{ gap: brand.spacing[8] }}
          >
            <h2 id="quick-access-heading" style={headingStyle}>
              Quick access
            </h2>
            <p style={bodyStyle}>
              Calm doorways into Go Solo — Buddy, Skill Swap, SAME, and more.
            </p>
          </header>

          <div
            className="home-quick__grid"
            style={{ gap: brand.spacing[20] }}
          >
            {quickAccess.map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                className="home-card-link"
                style={{ animationDelay: `${0.12 + index * 0.1}s` }}
              >
                <article
                  className="home-card"
                  style={{ gap: brand.spacing[20], padding: brand.spacing[20] }}
                >
                  <span className="home-card__icon" aria-hidden="true">
                    <item.Icon />
                  </span>
                  <div
                    className="home-card__copy"
                    style={{ gap: brand.spacing[8] }}
                  >
                    <h3 style={headingStyle}>{item.title}</h3>
                    <p style={bodyStyle}>{item.description}</p>
                  </div>
                  <span className="home-card__action">
                    {item.action}
                    <span aria-hidden="true">→</span>
                  </span>
                </article>
              </Link>
            ))}
          </div>
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

function BuddyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <circle
        cx="8.5"
        cy="9"
        r="2.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="15.5"
        cy="9"
        r="2.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4.8 18.2c.8-2.4 2.4-3.6 3.7-3.6s2.9 1.2 3.7 3.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 18.2c.8-2.4 2.4-3.6 3.5-3.6s2.7 1.2 3.5 3.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10.2 11.2c.7.7 1.7 1.1 2.8 1.1s2.1-.4 2.8-1.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SkillSwapIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <path
        d="M7.5 8.5h9.2M16.7 8.5l-2.2-2.2M16.7 8.5l-2.2 2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 15.5H7.3M7.3 15.5l2.2-2.2M7.3 15.5l2.2 2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="4.2"
        y="4.2"
        width="15.6"
        height="15.6"
        rx="3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function SameIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="7.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 4.8v2.2M12 17v2.2M4.8 12h2.2M17 12h2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
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
