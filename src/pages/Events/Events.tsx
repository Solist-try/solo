import { useMemo, useState } from "react";
import { useAuth } from "../../auth";
import {
  EVENT_TYPES,
  EventCard,
  eventsCatalog,
  eventTypeLabels,
  type EventType,
} from "../../modules/events";
import { Button, Card, CardBody, CardHeader } from "../../components/ui";
import styles from "./Events.module.css";

type Filter = "All" | EventType | "Going";

const EMPTY_RSVPS: string[] = [];

export function Events() {
  const { user, updateProfile } = useAuth();
  const [filter, setFilter] = useState<Filter>("All");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const rsvpIds = user?.rsvpEventIds ?? EMPTY_RSVPS;

  const visible = useMemo(() => {
    const going = user?.rsvpEventIds ?? EMPTY_RSVPS;
    if (filter === "All") return eventsCatalog;
    if (filter === "Going") {
      return eventsCatalog.filter((event) => going.includes(event.id));
    }
    return eventsCatalog.filter((event) => event.type === filter);
  }, [filter, user?.rsvpEventIds]);

  const toggleRsvp = async (eventId: string) => {
    if (!user) return;
    setPendingId(eventId);
    const next = rsvpIds.includes(eventId)
      ? rsvpIds.filter((id) => id !== eventId)
      : [...rsvpIds, eventId];
    try {
      await updateProfile({ rsvpEventIds: next });
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div className={`container page ${styles.page}`}>
      <header className="page__header">
        <h1>Events</h1>
        <p>
          Virtual meetups, workshops, and community discussions — RSVP and add
          them to your calendar when you are ready.
        </p>
      </header>

      <div className={styles.toolbar}>
        <div
          className={styles.filters}
          role="toolbar"
          aria-label="Filter events"
        >
          <FilterChip
            label="All"
            active={filter === "All"}
            onClick={() => setFilter("All")}
          />
          {EVENT_TYPES.map((type) => (
            <FilterChip
              key={type}
              label={eventTypeLabels[type]}
              active={filter === type}
              onClick={() => setFilter(type)}
            />
          ))}
          <FilterChip
            label={`Going (${rsvpIds.length})`}
            active={filter === "Going"}
            onClick={() => setFilter("Going")}
          />
        </div>
      </div>

      <Card variant="soft" padding="md" className={styles.calendarNote}>
        <CardHeader
          eyebrow="Calendar"
          title="Stay in sync"
          description="RSVP to hold your spot, then download an .ics file or open Google Calendar."
        />
        <CardBody>
          <p className={styles.noteText}>
            You are going to <strong>{rsvpIds.length}</strong> upcoming{" "}
            {rsvpIds.length === 1 ? "event" : "events"}.
          </p>
        </CardBody>
      </Card>

      {visible.length === 0 ? (
        <div className={styles.empty}>
          <p>No events in this view yet.</p>
          <Button variant="soft" onClick={() => setFilter("All")}>
            Show all events
          </Button>
        </div>
      ) : (
        <div className={styles.grid}>
          {visible.map((event, index) => (
            <div
              key={event.id}
              style={{ animationDelay: `${0.05 + index * 0.05}s` }}
              className={styles.item}
            >
              <EventCard
                event={event}
                rsvped={rsvpIds.includes(event.id)}
                onToggleRsvp={() => {
                  if (pendingId) return;
                  void toggleRsvp(event.id);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`${styles.chip} ${active ? styles.chipActive : ""}`}
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
