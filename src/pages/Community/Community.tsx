import { Avatar, Button, Section } from "../../components/ui";
import styles from "./Community.module.css";

const members = [
  {
    name: "Mira Chen",
    focus: "Coastal weekenders",
    note: "Looking for sunrise hiking partners near Lisbon.",
  },
  {
    name: "Jordan Hale",
    focus: "Slow city walks",
    note: "Sharing cafe maps for first-time solo nights out.",
  },
  {
    name: "Ava Ruiz",
    focus: "Train journeys",
    note: "Hosting a quiet thread on overnight rail tips.",
  },
  {
    name: "Sam Okonkwo",
    focus: "Photography trails",
    note: "Trading golden-hour spots that stay uncrowded.",
  },
];

const circles = [
  {
    title: "First solo trip",
    detail: "Encouragement and packing lists for people taking the leap.",
  },
  {
    title: "Women traveling alone",
    detail: "Safety-minded routes, lodging notes, and local check-ins.",
  },
  {
    title: "Digital nomad stretch",
    detail: "Work-friendly cafes, quiet stays, and weekly accountability.",
  },
];

export function Community() {
  return (
    <div className={`container page ${styles.page}`}>
      <header className="page__header">
        <h1>Community</h1>
        <p>
          Soft introductions, shared routes, and circles that respect your
          independence.
        </p>
      </header>

      <Section
        title="Active circles"
        description="Join a conversation that matches your pace — no noise, just useful company."
        action={<Button variant="secondary">Start a circle</Button>}
      >
        <div className={styles.circles}>
          {circles.map((circle) => (
            <article key={circle.title} className={styles.circle}>
              <h3>{circle.title}</h3>
              <p>{circle.detail}</p>
              <Button size="sm" variant="ghost">
                Enter circle
              </Button>
            </article>
          ))}
        </div>
      </Section>

      <Section
        title="People nearby in spirit"
        description="Members exploring similar rhythms this month."
      >
        <ul className={styles.members}>
          {members.map((member) => (
            <li key={member.name} className={styles.member}>
              <Avatar name={member.name} />
              <div>
                <div className={styles.memberTop}>
                  <strong>{member.name}</strong>
                  <span>{member.focus}</span>
                </div>
                <p>{member.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
