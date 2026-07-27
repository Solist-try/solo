import { Button, Card, CardBody, CardFooter, CardHeader, Section } from "../../components/ui";
import styles from "./Events.module.css";

const events = [
  {
    title: "Sunrise coastal walk",
    when: "Sat · 7:00 AM",
    place: "Ocean Avenue trailhead",
    detail: "A quiet mile for solo walkers — optional coffee after.",
  },
  {
    title: "Packing circle (virtual)",
    when: "Tue · 6:30 PM",
    place: "Online",
    detail: "Bring your bag list and trim what you do not need.",
  },
  {
    title: "Solo dinner night",
    when: "Thu · 7:15 PM",
    place: "Harbor District",
    detail: "Reserved seats for one — arrive as you are, leave when ready.",
  },
];

export function Events() {
  return (
    <div className={`container page ${styles.page}`}>
      <header className="page__header">
        <h1>Events</h1>
        <p>
          Soft gatherings designed for independent travelers — join in, or just
          know they are there.
        </p>
      </header>

      <Section
        title="Coming up"
        description="Small, paced events that respect your rhythm."
        action={<Button variant="secondary">Suggest an event</Button>}
      >
        <div className={styles.list}>
          {events.map((event) => (
            <Card key={event.title} variant="interactive">
              <CardHeader
                eyebrow={`${event.when} · ${event.place}`}
                title={event.title}
              />
              <CardBody>{event.detail}</CardBody>
              <CardFooter>
                <Button size="sm" variant="soft">
                  Save spot
                </Button>
                <Button size="sm" variant="ghost">
                  Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
