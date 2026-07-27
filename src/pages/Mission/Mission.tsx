import { Link } from "react-router-dom";
import { Button, SoftCurve } from "../../components/ui";
import {
  AutonomyIllustration,
  ConnectionIllustration,
  ResilienceIllustration,
  SustainabilityIllustration,
} from "./illustrations";
import styles from "./Mission.module.css";

const values = [
  {
    id: "autonomy",
    title: "Autonomy",
    lede: "Your pace, your path.",
    body: "Go Solo exists so independence feels intentional — not isolating. We design for people who want to choose their days, travel lightly, and make a home that fits them alone.",
    Illustration: AutonomyIllustration,
  },
  {
    id: "connection",
    title: "Connection",
    lede: "Go solo, not alone.",
    body: "Supportive community is part of the product. Circles, messages, and shared resources keep you linked to people who understand the stretch — without asking you to perform closeness.",
    Illustration: ConnectionIllustration,
  },
  {
    id: "sustainability",
    title: "Sustainability",
    lede: "Steady systems over sprinting.",
    body: "From money-saving habits to calmer packing and housing checklists, we favor practices you can keep. Longevity beats intensity when you are building a life on your own terms.",
    Illustration: SustainabilityIllustration,
  },
  {
    id: "resilience",
    title: "Emotional resilience",
    lede: "Soft strength for quiet nights.",
    body: "Feelings are welcome here. Check-ins, gentle rituals, and safety tools help you name what’s hard and return to steadiness — with kindness, never pressure.",
    Illustration: ResilienceIllustration,
  },
] as const;

export function Mission() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-label="Mission hero">
        <div className={styles.heroWash} aria-hidden="true">
          <SoftCurve variant="blob" tone="peach" className={styles.heroBlob} />
          <SoftCurve variant="blob" tone="gold" className={styles.heroBlobTwo} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <p className={styles.brand}>Go Solo</p>
          <h1 className={styles.headline}>Mission &amp; values</h1>
          <p className={styles.lede}>
            We build a warm home for independent living — where autonomy,
            connection, sustainability, and emotional resilience can grow side
            by side.
          </p>
        </div>
        <SoftCurve tone="cream" />
      </section>

      <div className={`container ${styles.body}`}>
        <section className={styles.purpose}>
          <p className={styles.eyebrow}>Our purpose</p>
          <h2>Independence with a soft landing.</h2>
          <p>
            Solo living and solo travel can be liberating — and lonely,
            expensive, or overwhelming. Go Solo gathers practical tools and
            human company so you can keep choosing yourself without closing the
            door on care.
          </p>
        </section>

        <div className={styles.values}>
          {values.map((value, index) => (
            <article
              key={value.id}
              id={value.id}
              className={`${styles.value} ${index % 2 === 1 ? styles.flip : ""}`}
              style={{ animationDelay: `${0.08 + index * 0.08}s` }}
            >
              <div className={styles.illustrationWrap}>
                <value.Illustration className={styles.illustration} />
              </div>
              <div className={styles.copy}>
                <p className={styles.eyebrow}>{`0${index + 1}`}</p>
                <h2>{value.title}</h2>
                <p className={styles.valueLede}>{value.lede}</p>
                <p>{value.body}</p>
              </div>
            </article>
          ))}
        </div>

        <section className={styles.closing}>
          <h2>Living the values together</h2>
          <p>
            Every feed post, toolkit ritual, and safety tool is shaped by these
            four commitments. Come for the independence — stay for the soft
            network that helps it last.
          </p>
          <div className={styles.actions}>
            <Link to="/community">
              <Button size="lg">Meet the community</Button>
            </Link>
            <Link to="/toolkit">
              <Button size="lg" variant="secondary">
                Open the toolkit
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
