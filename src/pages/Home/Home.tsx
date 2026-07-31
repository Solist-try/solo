import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth";
import { Button } from "../../components/ui";
import { CommunityIcon, ResourcesIcon, ToolkitIcon } from "./HomeIcons";
import styles from "./Home.module.css";

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

export function Home() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "friend";

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-label="GoSolo home hero">
        <div className={styles.heroMedia} aria-hidden="true">
          <div className={styles.horizon} />
          <div className={styles.sun} />
          <div className={styles.glow} />
          <div className={styles.path} />
          <div className={styles.dune} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <p className={styles.brand}>GoSolo</p>
          <p className={styles.welcome}>Welcome home, {firstName}</p>
          <h1 className={styles.tagline}>Go solo, not alone</h1>
          <p className={styles.lede}>
            Your calm base for independent travel — connect, learn, and show up
            when you want company.
          </p>
          <div className={styles.ctas}>
            <a href="#quick-access">
              <Button size="lg">Explore quick access</Button>
            </a>
            <Link to="/community">
              <Button size="lg" variant="secondary">
                Meet the community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className={styles.heroCurve} aria-hidden="true" />

      <section
        id="quick-access"
        className={`container ${styles.quickSection}`}
        aria-labelledby="quick-access-heading"
      >
        <header className={styles.quickHeader}>
          <h2 id="quick-access-heading">Quick access</h2>
          <p>Three warm doorways into the GoSolo experience.</p>
        </header>

        <div className={styles.quickGrid}>
          {quickAccess.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className={styles.quickLink}
              style={{ animationDelay: `${0.1 + index * 0.08}s` }}
            >
              <article className={styles.quickCard} data-tone={item.tone}>
                <span className={styles.iconWell} aria-hidden="true">
                  <item.Icon className={styles.icon} />
                </span>
                <div className={styles.cardCopy}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <span className={styles.cardAction}>
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
