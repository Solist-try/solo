import { Avatar, Button, Card, CardFooter, CardHeader, Section } from "../../components/ui";
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
            <Card key={circle.title} variant="interactive">
              <CardHeader title={circle.title} description={circle.detail} />
              <CardFooter>
                <Button size="sm" variant="soft">
                  Enter circle
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="People nearby in spirit"
        description="Members exploring similar rhythms this month."
      >
        <ul className={styles.members}>
          {members.map((member) => (
            <Card key={member.name} as="li" variant="soft" padding="sm">
              <div className={styles.member}>
                <Avatar name={member.name} />
                <div>
                  <div className={styles.memberTop}>
                    <strong>{member.name}</strong>
                    <span>{member.focus}</span>
                  </div>
                  <p>{member.note}</p>
                </div>
              </div>
            </Card>
          ))}
        </ul>
      </Section>
    </div>
  );
}
