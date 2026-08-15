import { Button, Card, CardBody, CardFooter, CardHeader } from "../../components/ui";
import {
  eventTypeLabels,
  formatEventWhen,
  type SoloEvent,
} from "./data";
import { buildGoogleCalendarUrl, downloadIcs } from "./calendar";
import styles from "./EventCard.module.css";

export type EventCardProps = {
  event: SoloEvent;
  rsvped: boolean;
  onToggleRsvp: () => void;
};

export function EventCard({ event, rsvped, onToggleRsvp }: EventCardProps) {
  const going = event.baseRsvps + (rsvped ? 1 : 0);
  const spotsLeft = Math.max(event.capacity - going, 0);
  const full = !rsvped && spotsLeft === 0;

  return (
    <Card variant="elevated" className={styles.card} padding="lg">
      <CardHeader
        eyebrow={eventTypeLabels[event.type]}
        title={event.title}
        description={formatEventWhen(event.start, event.end)}
      />
      <CardBody className={styles.body}>
        <p>{event.description}</p>
        <ul className={styles.meta}>
          <li>
            <span>Host</span>
            <strong>{event.host}</strong>
          </li>
          <li>
            <span>Where</span>
            <strong>{event.location}</strong>
          </li>
          <li>
            <span>RSVPs</span>
            <strong>
              {going}/{event.capacity}
              {spotsLeft <= 5 ? ` · ${spotsLeft} left` : ""}
            </strong>
          </li>
        </ul>
      </CardBody>
      <CardFooter className={styles.footer}>
        <Button
          size="sm"
          variant={rsvped ? "soft" : "primary"}
          onClick={onToggleRsvp}
          disabled={full}
        >
          {rsvped ? "Cancel RSVP" : full ? "Full" : "RSVP"}
        </Button>
        <div className={styles.calendarActions}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => downloadIcs(event)}
          >
            Add to calendar
          </Button>
          <a
            className={styles.googleLink}
            href={buildGoogleCalendarUrl(event)}
            target="_blank"
            rel="noreferrer"
          >
            Google Calendar
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
