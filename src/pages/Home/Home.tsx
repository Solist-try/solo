import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  SoftCurve,
} from "../../components/ui";
import styles from "./Home.module.css";

const quickAccess = [
  {
    to: "/community",
    eyebrow: "Connect",
    title: "Community",
    description: "Circles and members who get the solo stretch.",
    action: "Enter community",
    tone: "soft" as const,
  },
  {
    to: "/resources",
    eyebrow: "Learn",
    title: "Resources",
    description: "Guides, checklists, and calm packing rituals.",
    action: "Browse resources",
    tone: "elevated" as const,
  },
  {
    to: "/events",
    eyebrow: "Gather",
    title: "Events",
    description: "Walks, meetups, and quiet nights planned for one—or a few.",
    action: "See events",
    tone: "outline" as const,
  },
];

export function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.banner} aria-label="Welcome banner">
        <div className={styles.bannerMedia} aria-hidden="true">
          <div className={styles.horizon} />
          <div className={styles.sun} />
          <SoftCurve variant="blob" tone="gold" className={styles.motifBlob} />
          <div className={styles.path} />
          <div className={styles.glow} />
        </div>

        <div className={`container ${styles.bannerContent}`}>
          <p className={styles.brand}>Go Solo</p>
          <p className={styles.welcome}>Welcome home</p>
          <h1 className={styles.tagline}>Go solo, not alone.</h1>
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

      <SoftCurve tone="cream" className={styles.bannerCurve} />

      <section
        id="quick-access"
        className={`container ${styles.quickSection}`}
        aria-labelledby="quick-access-heading"
      >
        <header className={styles.quickHeader}>
          <h2 id="quick-access-heading">Quick access</h2>
          <p>Jump into the places you need most — ready when you are.</p>
        </header>

        <div className={styles.quickGrid}>
          {quickAccess.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className={styles.quickLink}
              style={{ animationDelay: `${0.12 + index * 0.1}s` }}
            >
              <Card variant="interactive" className={styles.quickCard}>
                <CardHeader
                  eyebrow={item.eyebrow}
                  title={item.title}
                  description={item.description}
                />
                <CardBody>
                  <span className={styles.cardAccent} data-tone={item.tone} />
                </CardBody>
                <CardFooter>
                  <span className={styles.cardAction}>{item.action}</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
