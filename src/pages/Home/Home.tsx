import { Link } from "react-router-dom";
import { Button, Section } from "../../components/ui";
import styles from "./Home.module.css";

const pathways = [
  {
    title: "Plan your stretch",
    body: "Turn a quiet weekend into a deliberate solo adventure with maps, pacing, and local anchors.",
  },
  {
    title: "Find your people",
    body: "Meet travelers who value independence — without giving up connection when you want it.",
  },
  {
    title: "Travel with clarity",
    body: "Guides, checklists, and soft rituals that make going alone feel grounded, not lonely.",
  },
];

export function Home() {
  return (
    <div>
      <section className={styles.hero} aria-label="Go Solo hero">
        <div className={styles.heroMedia} aria-hidden="true">
          <div className={styles.horizon} />
          <div className={styles.sun} />
          <div className={styles.path} />
          <div className={styles.glow} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <p className={styles.brand}>Go Solo</p>
          <h1 className={styles.headline}>Your own path, warmly lit.</h1>
          <p className={styles.lede}>
            A calm home for independent travelers — plan boldly, move at your
            pace, and stay connected when it matters.
          </p>
          <div className={styles.ctas}>
            <Link to="/community">
              <Button size="lg">Join the community</Button>
            </Link>
            <Link to="/resources">
              <Button size="lg" variant="secondary">
                Browse resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className={`container ${styles.below}`}>
        <Section
          title="Built for the independent stretch"
          description="Three quiet pillars that keep solo travel intentional from first spark to last mile."
        >
          <div className={styles.pathways}>
            {pathways.map((item, index) => (
              <article
                key={item.title}
                className={styles.pathway}
                style={{ animationDelay: `${0.1 + index * 0.08}s` }}
              >
                <span className={styles.index}>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
