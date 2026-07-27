import { Button, Section } from "../../components/ui";
import styles from "./Resources.module.css";

const guides = [
  {
    title: "The gentle packing ritual",
    type: "Guide",
    time: "8 min",
    blurb: "A calm checklist that keeps your bag light and your mind clearer.",
  },
  {
    title: "Solo dining without the awkward",
    type: "Essay",
    time: "6 min",
    blurb: "Small habits that turn a table-for-one into a restorative pause.",
  },
  {
    title: "Safety map for first nights",
    type: "Checklist",
    time: "4 min",
    blurb: "Arrival routines that help you settle quickly in a new place.",
  },
  {
    title: "Budgeting the stretch week",
    type: "Worksheet",
    time: "10 min",
    blurb: "Plan lodging, meals, and one memorable experience without squeeze.",
  },
];

export function Resources() {
  return (
    <div className={`container page ${styles.page}`}>
      <header className="page__header">
        <h1>Resources</h1>
        <p>
          Practical writing and tools for traveling alone with confidence and
          softness.
        </p>
      </header>

      <Section
        title="Featured reading"
        description="Start here if you are preparing your next independent stretch."
        action={<Button variant="secondary">Save for later</Button>}
      >
        <div className={styles.list}>
          {guides.map((guide) => (
            <article key={guide.title} className={styles.item}>
              <div className={styles.meta}>
                <span>{guide.type}</span>
                <span aria-hidden="true">·</span>
                <span>{guide.time}</span>
              </div>
              <h3>{guide.title}</h3>
              <p>{guide.blurb}</p>
              <Button size="sm" variant="ghost">
                Open resource
              </Button>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
